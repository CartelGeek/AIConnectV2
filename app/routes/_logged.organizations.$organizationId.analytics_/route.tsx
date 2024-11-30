import {
  Typography,
  Card,
  Row,
  Col,
  Button,
  Table,
  Alert,
  DatePicker,
  Space,
  Statistic,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { RangePicker } = DatePicker
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AnalyticsPage() {
  const { organizationId } = useParams()
  const { organization } = useUserContext()
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null,
  )

  // Fetch conversations with messages included
  const { data: conversations, isLoading } = Api.conversation.findMany.useQuery(
    {
      where: { organizationId },
      include: { messages: true, agent: true },
    },
  )

  // Calculate metrics
  const totalConversations = conversations?.length || 0
  const resolvedConversations =
    conversations?.filter(c => c.isResolved)?.length || 0
  const resolutionRate = totalConversations
    ? ((resolvedConversations / totalConversations) * 100).toFixed(1)
    : '0'

  const averageResponseTime =
    conversations?.reduce((acc, conv) => {
      const messages = conv.messages || []
      let totalResponseTime = 0
      let responseCount = 0

      for (let i = 1; i < messages.length; i++) {
        if (messages[i].isFromAgent) {
          totalResponseTime += dayjs(messages[i].createdAt).diff(
            messages[i - 1].createdAt,
            'minute',
          )
          responseCount++
        }
      }
      return acc + (responseCount ? totalResponseTime / responseCount : 0)
    }, 0) / (conversations?.length || 1)

  const conversationColumns = [
    { title: 'Customer', dataIndex: 'customerPhoneNumber', key: 'customer' },
    { title: 'Agent', dataIndex: ['agent', 'name'], key: 'agent' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Messages', dataIndex: 'messageCount', key: 'messages' },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'created',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
  ]

  const conversationData = conversations?.map(conv => ({
    ...conv,
    key: conv.id,
    messageCount: conv.messages?.length || 0,
  }))

  const handleExport = () => {
    const csvContent = [
      ['Date', 'Customer', 'Agent', 'Status', 'Messages'].join(','),
      ...conversationData!.map(conv =>
        [
          dayjs(conv.createdAt).format('YYYY-MM-DD'),
          conv.customerPhoneNumber,
          conv.agent?.name,
          conv.status,
          conv.messageCount,
        ].join(','),
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${dayjs().format('YYYY-MM-DD')}.csv`
    a.click()
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Title level={2}>
          <i className="las la-chart-line" style={{ marginRight: '8px' }}></i>
          Analytics Dashboard
        </Title>
        <Text type="secondary">
          Monitor your customer service performance metrics and generate
          insights
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Conversations"
                value={totalConversations}
                prefix={<i className="las la-comments"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Resolution Rate"
                value={resolutionRate}
                suffix="%"
                prefix={<i className="las la-check-circle"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Avg. Response Time"
                value={averageResponseTime?.toFixed(1) || 0}
                suffix="min"
                prefix={<i className="las la-clock"></i>}
              />
            </Card>
          </Col>
        </Row>

        <Card style={{ marginTop: '24px' }}>
          <Space style={{ marginBottom: '16px' }}>
            <RangePicker
              onChange={dates =>
                setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
              }
            />
            <Button
              type="primary"
              icon={<i className="las la-download"></i>}
              onClick={handleExport}
            >
              Export Data
            </Button>
          </Space>

          <Alert
            message="Performance Alert"
            description="Set up alerts to monitor key metrics and receive notifications when thresholds are exceeded."
            type="info"
            showIcon
            style={{ marginBottom: '16px' }}
          />

          <Table
            columns={conversationColumns}
            dataSource={conversationData}
            loading={isLoading}
            scroll={{ x: true }}
          />
        </Card>
      </div>
    </PageLayout>
  )
}
