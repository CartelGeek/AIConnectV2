import { Typography, Card, Table, Button, Space, Tag, Descriptions } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BillingPage() {
  const { organizationId } = useParams()
  const { organization } = useUserContext()

  // Fetch subscription data
  const { data: subscriptions, isLoading: isLoadingSubscriptions } =
    Api.subscription.findMany.useQuery({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    })

  // Fetch available products
  const { data: products, isLoading: isLoadingProducts } =
    Api.billing.findManyProducts.useQuery({})

  // Fetch payment history
  const { data: payments, isLoading: isLoadingPayments } =
    Api.billing.findManyPayments.useQuery({})

  // Mutation for creating payment link
  const { mutateAsync: createPaymentLink } =
    Api.billing.createPaymentLink.useMutation()

  const currentSubscription = subscriptions?.[0]

  const handleUpgrade = async (productId: string) => {
    const paymentLink = await createPaymentLink({ productId })
    window.location.href = paymentLink
  }

  const paymentColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('MMMM D, YYYY'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${(amount / 100).toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'succeeded' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Invoice',
      key: 'invoice',
      render: (record: any) => (
        <Button
          type="link"
          href={record.invoiceUrl}
          icon={<i className="las la-file-invoice" />}
        >
          Download
        </Button>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-credit-card" style={{ marginRight: 8 }} />
          Billing & Subscription
        </Title>
        <Text type="secondary">
          Manage your subscription, payment methods, and billing history
        </Text>

        <Card
          title={
            <span>
              <i className="las la-box" style={{ marginRight: 8 }} />
              Current Subscription
            </span>
          }
          style={{ marginTop: 24 }}
          loading={isLoadingSubscriptions}
        >
          {currentSubscription && (
            <Descriptions column={2}>
              <Descriptions.Item label="Plan">
                {currentSubscription.plan}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag
                  color={
                    currentSubscription.status === 'active' ? 'green' : 'red'
                  }
                >
                  {currentSubscription.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Usage">
                {currentSubscription.currentUsage.toString()} /{' '}
                {currentSubscription.usageLimit.toString()}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Card>

        <Card
          title={
            <span>
              <i className="las la-cubes" style={{ marginRight: 8 }} />
              Available Plans
            </span>
          }
          style={{ marginTop: 24 }}
          loading={isLoadingProducts}
        >
          <Space wrap>
            {products?.map(product => (
              <Card
                key={product.id}
                style={{ width: 300 }}
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handleUpgrade(product.id)}
                  >
                    {currentSubscription?.plan === product.name
                      ? 'Current Plan'
                      : 'Upgrade'}
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <>
                      <Text strong>
                        ${(product.price / 100).toFixed(2)}/month
                      </Text>
                      <br />
                      <Text type="secondary">{product.description}</Text>
                    </>
                  }
                />
              </Card>
            ))}
          </Space>
        </Card>

        <Card
          title={
            <span>
              <i className="las la-history" style={{ marginRight: 8 }} />
              Payment History
            </span>
          }
          style={{ marginTop: 24 }}
        >
          <Table
            columns={paymentColumns}
            dataSource={payments}
            loading={isLoadingPayments}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </div>
    </PageLayout>
  )
}
