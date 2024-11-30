import {
  Typography,
  Button,
  Table,
  Switch,
  Modal,
  Form,
  Input,
  message,
} from 'antd'
import { useState } from 'react'
import type { Agent } from '@prisma/client'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AgentsPage() {
  const { organizationId } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null)
  const [form] = Form.useForm()

  // Fetch agents
  const { data: agents, refetch } = Api.agent.findMany.useQuery({
    where: { organizationId },
    orderBy: { createdAt: 'desc' },
  })

  // Mutations
  const createAgent = Api.agent.create.useMutation()
  const updateAgent = Api.agent.update.useMutation()
  const deleteAgent = Api.agent.delete.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      if (editingAgent) {
        await updateAgent.mutateAsync({
          where: { id: editingAgent.id },
          data: {
            name: values.name,
            whatsappIntegrationDetails: values.whatsappNumber
              ? { phoneNumber: values.whatsappNumber }
              : null,
            configuration: values.configuration
              ? JSON.parse(values.configuration)
              : null,
          },
        })
        message.success('Agent updated successfully')
      } else {
        await createAgent.mutateAsync({
          data: {
            name: values.name,
            status: 'INACTIVE',
            organizationId: organizationId!,
            whatsappIntegrationDetails: values.whatsappNumber
              ? { phoneNumber: values.whatsappNumber }
              : null,
            configuration: values.configuration
              ? JSON.parse(values.configuration)
              : null,
          },
        })
        message.success('Agent created successfully')
      }
      setIsModalOpen(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('An error occurred')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteAgent.mutateAsync({ where: { id } })
      message.success('Agent deleted successfully')
      refetch()
    } catch (error) {
      message.error('An error occurred')
    }
  }

  const handleStatusChange = async (checked: boolean, agent: Agent) => {
    try {
      await updateAgent.mutateAsync({
        where: { id: agent.id },
        data: { status: checked ? 'ACTIVE' : 'INACTIVE' },
      })
      message.success('Status updated successfully')
      refetch()
    } catch (error) {
      message.error('An error occurred')
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      key: 'status',
      render: (agent: Agent) => (
        <Switch
          checked={agent.status === 'ACTIVE'}
          onChange={checked => handleStatusChange(checked, agent)}
        />
      ),
    },
    {
      title: 'WhatsApp',
      key: 'whatsapp',
      render: (agent: Agent) => (
        <Text>
          {agent.whatsappIntegrationDetails
            ? JSON.stringify(agent.whatsappIntegrationDetails)
            : 'Not configured'}
        </Text>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (agent: Agent) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              setEditingAgent(agent)
              form.setFieldsValue({
                name: agent.name,
                whatsappNumber: agent.whatsappIntegrationDetails?.phoneNumber,
                configuration: agent.configuration
                  ? JSON.stringify(agent.configuration)
                  : '',
              })
              setIsModalOpen(true)
            }}
          >
            <i className="las la-edit" /> Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(agent.id)}>
            <i className="las la-trash" /> Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <div>
            <Title level={2}>AI Agents</Title>
            <Text>Manage your AI agents and their WhatsApp integrations</Text>
          </div>
          <Button
            type="primary"
            onClick={() => {
              setEditingAgent(null)
              form.resetFields()
              setIsModalOpen(true)
            }}
          >
            <i className="las la-plus" /> Create Agent
          </Button>
        </div>

        <Table
          dataSource={agents}
          columns={columns}
          rowKey="id"
          loading={!agents}
        />

        <Modal
          title={editingAgent ? 'Edit Agent' : 'Create Agent'}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: 'Please input the agent name!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="whatsappNumber" label="WhatsApp Number">
              <Input placeholder="+1234567890" />
            </Form.Item>
            <Form.Item name="configuration" label="Configuration (JSON)">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingAgent ? 'Update' : 'Create'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
