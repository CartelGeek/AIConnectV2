import { Typography, Card, Space } from 'antd'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <PageLayout layout="full-width">
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '24px',
        }}
      >
        <Title level={1} style={{ textAlign: 'center' }}>
          <i className="las la-robot" style={{ marginRight: '8px' }}></i>
          Welcome to WhatsApp Agent Manager
        </Title>

        <Paragraph
          style={{
            textAlign: 'center',
            fontSize: '18px',
            marginBottom: '32px',
          }}
        >
          Your all-in-one solution for managing WhatsApp business communications
        </Paragraph>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card>
            <Title level={3}>
              <i className="las la-tasks" style={{ marginRight: '8px' }}></i>
              How It Works
            </Title>
            <Paragraph>
              Our platform helps you manage your WhatsApp business
              communications efficiently through AI-powered agents. Here's what
              you can do:
            </Paragraph>
            <ul style={{ fontSize: '16px', lineHeight: '1.6' }}>
              <li>
                <i
                  className="las la-user-robot"
                  style={{ marginRight: '8px' }}
                ></i>
                Create and configure AI agents to handle customer conversations
              </li>
              <li>
                <i
                  className="las la-comment-dots"
                  style={{ marginRight: '8px' }}
                ></i>
                Manage multiple WhatsApp conversations in one place
              </li>
              <li>
                <i
                  className="las la-file-alt"
                  style={{ marginRight: '8px' }}
                ></i>
                Create response templates for common scenarios
              </li>
              <li>
                <i
                  className="las la-chart-line"
                  style={{ marginRight: '8px' }}
                ></i>
                Track performance with detailed analytics
              </li>
            </ul>
          </Card>

          <Card>
            <Title level={3}>
              <i className="las la-star" style={{ marginRight: '8px' }}></i>
              Key Features
            </Title>
            <ul style={{ fontSize: '16px', lineHeight: '1.6' }}>
              <li>
                <i className="las la-brain" style={{ marginRight: '8px' }}></i>
                AI-powered conversation handling
              </li>
              <li>
                <i className="las la-clock" style={{ marginRight: '8px' }}></i>
                24/7 automated customer support
              </li>
              <li>
                <i
                  className="las la-language"
                  style={{ marginRight: '8px' }}
                ></i>
                Multi-language support
              </li>
              <li>
                <i
                  className="las la-shield-alt"
                  style={{ marginRight: '8px' }}
                ></i>
                Secure and compliant messaging
              </li>
            </ul>
          </Card>

          <Card>
            <Title level={3}>
              <i className="las la-rocket" style={{ marginRight: '8px' }}></i>
              Getting Started
            </Title>
            <Paragraph>To begin using the platform:</Paragraph>
            <ol style={{ fontSize: '16px', lineHeight: '1.6' }}>
              <li>Create or join an organization</li>
              <li>Set up your WhatsApp business account</li>
              <li>Configure your first AI agent</li>
              <li>Create response templates</li>
              <li>Start managing conversations</li>
            </ol>
          </Card>
        </Space>
      </div>
    </PageLayout>
  )
}
