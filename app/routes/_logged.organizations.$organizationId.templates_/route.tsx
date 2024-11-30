import {
  Typography,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Space,
  Card,
  Row,
  Col,
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

export default function TemplatesPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const { organization } = useUserContext()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<any>(null)
  const [form] = Form.useForm()

  // Fetch templates
  const { data: templates, refetch } = Api.template.findMany.useQuery({
    where: { organizationId },
    include: { organization: true },
  })

  // Fetch agents for assignment
  const { data: agents } = Api.agent.findMany.useQuery({
    where: { organizationId },
  })

  // Mutations
  const { mutateAsync: createTemplate } = Api.template.create.useMutation()
  const { mutateAsync: updateTemplate } = Api.template.update.useMutation()
  const { mutateAsync: deleteTemplate } = Api.template.delete.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      if (editingTemplate) {
        await updateTemplate({
          where: { id: editingTemplate.id },
          data: { ...values },
        })
        message.success('Template updated successfully')
      } else {
        await createTemplate({
          data: {
            ...values,
            organizationId,
          },
        })
        message.success('Template created successfully')
      }
      setIsModalVisible(false)
      form.resetFields()
      setEditingTemplate(null)
      refetch()
    } catch (error) {
      message.error('An error occurred')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTemplate({ where: { id } })
      message.success('Template deleted successfully')
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
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: (text: string) => <Text ellipsis>{text}</Text>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingTemplate(record)
              form.setFieldsValue(record)
              setIsModalVisible(true)
            }}
          >
            <i className="las la-edit"></i> Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            <i className="las la-trash"></i> Delete
          </Button>
          <Button
            type="link"
            onClick={() => {
              Modal.info({
                title: 'Template Preview',
                content: record.content,
                width: 600,
              })
            }}
          >
            <i className="las la-eye"></i> Preview
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 24 }}
        >
          <Col>
            <Title level={2}>Response Templates</Title>
            <Text>
              Manage your response templates for quick and consistent
              communication
            </Text>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                setEditingTemplate(null)
                form.resetFields()
                setIsModalVisible(true)
              }}
            >
              <i className="las la-plus"></i> Create Template
            </Button>
          </Col>
        </Row>

        <Card>
          <Table
            dataSource={templates}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>

        <Modal
          title={editingTemplate ? 'Edit Template' : 'Create Template'}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false)
            form.resetFields()
            setEditingTemplate(null)
          }}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="name"
              label="Template Name"
              rules={[
                { required: true, message: 'Please input template name!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="content"
              label="Template Content"
              rules={[
                { required: true, message: 'Please input template content!' },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {editingTemplate ? 'Update' : 'Create'}
                </Button>
                <Button
                  onClick={() => {
                    setIsModalVisible(false)
                    form.resetFields()
                    setEditingTemplate(null)
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
