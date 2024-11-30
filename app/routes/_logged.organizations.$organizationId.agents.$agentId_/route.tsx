import {
  Typography,
  Card,
  Tabs,
  Table,
  Switch,
  Input,
  Button,
  Form,
  Space,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AgentDetailsPage() {
  const { organizationId, agentId } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { organization } = useUserContext()
  const [activeTab, setActiveTab] = useState('1')

  // Fetch agent details
  const { data: agent, isLoading: isLoadingAgent } =
    Api.agent.findFirst.useQuery({
      where: { id: agentId },
      include: { conversations: true },
    })

  // Fetch templates
  const { data: templates } = Api.template.findMany.useQuery({
    where: { organizationId },
  })

  // Update agent mutation
  const { mutateAsync: updateAgent } = Api.agent.update.useMutation()

  const handleUpdateAgent = async (values: any) => {
    try {
      await updateAgent({
        where: { id: agentId },
        data: {
          name: values.name,
          configuration: {
            ...agent?.configuration,
            autoReply: values.autoReply,
            responseDelay: values.responseDelay,
          },
        },
      })
      message.success('Agent settings updated successfully')
    } catch (error) {
      message.error('Failed to update agent settings')
    }
  }

  const conversationsColumns = [
    {
      title: 'Customer',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Text type={status === 'ACTIVE' ? 'success' : 'secondary'}>
          {status}
        </Text>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('MMM D, YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button
          type="link"
          onClick={() =>
            navigate(
              `/organizations/${organizationId}/conversations/${record.id}`,
            )
          }
        >
          View Details
        </Button>
      ),
    },
  ]

  if (isLoadingAgent) {
    return <PageLayout layout="full-width">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}
        >
          <i
            className="las la-robot"
            style={{ fontSize: 32, marginRight: 12 }}
          ></i>
          <Title level={2} style={{ margin: 0 }}>
            {agent?.name}
          </Title>
        </div>

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane
            tab={
              <span>
                <i className="las la-chart-bar"></i> Metrics
              </span>
            }
            key="1"
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 16,
              }}
            >
              <Card>
                <Text>Total Conversations</Text>
                <Title level={3}>{agent?.conversations?.length}</Title>
              </Card>
              <Card>
                <Text>Active Conversations</Text>
                <Title level={3}>
                  {
                    agent?.conversations?.filter(c => c.status === 'ACTIVE')
                      .length
                  }
                </Title>
              </Card>
              <Card>
                <Text>Resolution Rate</Text>
                <Title level={3}>
                  {Math.round(
                    ((agent?.conversations?.filter(c => c.isResolved).length ||
                      0) /
                      (agent?.conversations?.length || 1)) *
                      100,
                  )}
                  %
                </Title>
              </Card>
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <span>
                <i className="las la-comments"></i> Conversations
              </span>
            }
            key="2"
          >
            <Table
              dataSource={agent?.conversations}
              columns={conversationsColumns}
              rowKey="id"
            />
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <span>
                <i className="las la-cog"></i> Settings
              </span>
            }
            key="3"
          >
            <Card>
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  name: agent?.name,
                  autoReply: agent?.configuration?.autoReply,
                  responseDelay: agent?.configuration?.responseDelay,
                }}
                onFinish={handleUpdateAgent}
              >
                <Form.Item name="name" label="Agent Name">
                  <Input />
                </Form.Item>
                <Form.Item
                  name="autoReply"
                  label="Auto Reply"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  name="responseDelay"
                  label="Response Delay (seconds)"
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </PageLayout>
  )
}
