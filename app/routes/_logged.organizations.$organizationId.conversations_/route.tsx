import { Typography, Table, Select, Button, Space, Tag, message } from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ConversationsPage() {
  const { organizationId } = useParams()
  const [selectedAgent, setSelectedAgent] = useState<string>('all')

  // Fetch conversations with included agent data
  const { data: conversations, refetch } = Api.conversation.findMany.useQuery({
    where: { organizationId },
    include: { agent: true, messages: true },
    orderBy: { updatedAt: 'desc' },
  })

  // Fetch agents for filter
  const { data: agents } = Api.agent.findMany.useQuery({
    where: { organizationId },
  })

  // Update conversation status mutation
  const { mutateAsync: updateConversation } =
    Api.conversation.update.useMutation()

  const handleResolve = async (conversationId: string) => {
    try {
      await updateConversation({
        where: { id: conversationId },
        data: { isResolved: true },
      })
      message.success('Conversation marked as resolved')
      refetch()
    } catch (error) {
      message.error('Failed to update conversation')
    }
  }

  const filteredConversations = conversations?.filter(
    conv => selectedAgent === 'all' || conv.agentId === selectedAgent,
  )

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
      render: (phone: string) => (
        <Space>
          <i className="las la-user"></i>
          <Text>{phone}</Text>
        </Space>
      ),
    },
    {
      title: 'Agent',
      dataIndex: 'agent',
      key: 'agent',
      render: (agent: any) => (
        <Space>
          <i className="las la-headset"></i>
          <Text>{agent?.name}</Text>
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: any) => (
        <Tag color={record.isResolved ? 'success' : 'processing'}>
          {record.isResolved ? 'Resolved' : 'Active'}
        </Tag>
      ),
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => dayjs(date).format('MMM D, YYYY HH:mm'),
    },
    {
      title: 'Messages',
      dataIndex: 'messages',
      key: 'messages',
      render: (messages: any[]) => messages?.length || 0,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          {!record.isResolved && (
            <Button
              type="primary"
              onClick={() => handleResolve(record.id)}
              icon={<i className="las la-check"></i>}
            >
              Resolve
            </Button>
          )}
          <Button type="default" icon={<i className="las la-comments"></i>}>
            View Chat
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2}>
            <i className="las la-comments"></i> Conversations
          </Title>
          <Text type="secondary">
            Manage and monitor all customer conversations
          </Text>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <Space>
            <Text>Filter by Agent:</Text>
            <Select
              style={{ width: 200 }}
              value={selectedAgent}
              onChange={setSelectedAgent}
              options={[
                { value: 'all', label: 'All Agents' },
                ...(agents?.map(agent => ({
                  value: agent.id,
                  label: agent.name,
                })) || []),
              ]}
            />
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredConversations}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: total => `Total ${total} conversations`,
          }}
        />
      </div>
    </PageLayout>
  )
}
