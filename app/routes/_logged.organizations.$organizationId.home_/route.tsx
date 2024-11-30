import { Card, Row, Col, Progress, Typography, Statistic } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const { organizationId } = useParams()
  const { organization } = useUserContext()

  // Fetch active conversations
  const { data: conversations } = Api.conversation.findMany.useQuery({
    where: { organizationId },
    include: { messages: true },
  })

  // Fetch agents
  const { data: agents } = Api.agent.findMany.useQuery({
    where: { organizationId },
  })

  // Fetch subscription details
  const { data: subscription } = Api.subscription.findFirst.useQuery({
    where: { organizationId },
  })

  // Calculate metrics
  const activeConversations =
    conversations?.filter(c => !c.isResolved)?.length || 0
  const resolvedConversations =
    conversations?.filter(c => c.isResolved)?.length || 0
  const totalAgents = agents?.length || 0
  const activeAgents = agents?.filter(a => a.status === 'ONLINE')?.length || 0

  // Calculate average response time (in minutes)
  const calculateAverageResponseTime = () => {
    let totalTime = 0
    let messageCount = 0

    conversations?.forEach(conv => {
      const messages = conv.messages
      for (let i = 1; i < (messages?.length || 0); i++) {
        if (messages[i].isFromAgent !== messages[i - 1].isFromAgent) {
          const timeDiff = dayjs(messages[i].createdAt).diff(
            messages[i - 1].createdAt,
            'minute',
          )
          totalTime += timeDiff
          messageCount++
        }
      }
    })

    return messageCount > 0 ? Math.round(totalTime / messageCount) : 0
  }

  const avgResponseTime = calculateAverageResponseTime()

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Title level={2}>
          <i className="las la-chart-line" style={{ marginRight: '8px' }}></i>
          Dashboard Overview
        </Title>
        <Text type="secondary">
          Monitor your AI agents performance and conversation metrics
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          {/* Agent Stats */}
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-robot"></i> Active Agents
                  </>
                }
                value={activeAgents}
                suffix={`/ ${totalAgents}`}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>

          {/* Conversation Stats */}
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-comments"></i> Active Conversations
                  </>
                }
                value={activeConversations}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>

          {/* Response Time */}
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-clock"></i> Avg Response Time
                  </>
                }
                value={avgResponseTime}
                suffix="min"
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>

          {/* Resolution Rate */}
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-check-circle"></i> Resolved Cases
                  </>
                }
                value={resolvedConversations}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Subscription Usage */}
        <Card style={{ marginTop: '24px' }}>
          <Title level={4}>
            <i className="las la-chart-pie"></i> Plan Usage
          </Title>
          <Row align="middle">
            <Col span={18}>
              <Progress
                percent={
                  subscription
                    ? Math.round(
                        (subscription.currentUsage / subscription.usageLimit) *
                          100,
                      )
                    : 0
                }
                status={
                  subscription?.currentUsage >= subscription?.usageLimit
                    ? 'exception'
                    : 'active'
                }
                strokeWidth={20}
              />
            </Col>
            <Col span={6} style={{ textAlign: 'right' }}>
              <Text type="secondary">
                {subscription?.currentUsage.toString()}/
                {subscription?.usageLimit.toString()} credits used
              </Text>
            </Col>
          </Row>
          <Text type="secondary">
            Current Plan: {subscription?.plan || 'No active plan'}
          </Text>
        </Card>
      </div>
    </PageLayout>
  )
}
