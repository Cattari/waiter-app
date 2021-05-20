import React, { useState } from 'react'
import { Button, Select, Row, Col, Modal } from 'antd'

export const NewOrderModal = ({ visible, onClose, tables, onSubmit }) => {
  const [newOrderContent, setNewOrderContent] = useState('')
  const [selectedTableId, setSelectedTableId] = useState(null)
  const isSubmitDisabled = !newOrderContent || !selectedTableId
  const onAddOrder = () => {
    if (isSubmitDisabled) return
    onSubmit({ content: newOrderContent, table_id: selectedTableId })
    onClose()
    setNewOrderContent('')
  }

  return (
    <Modal
      title="Add new order" 
      visible={visible} 
      onCancel={onClose}
      footer={[
        <Button 
          type="button" 
          disabled={isSubmitDisabled} 
          onClick={onAddOrder}
        >
          Add order
        </Button>,
        <Button type="button" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <Row>
        <Col span={24}> 
          <textarea 
            value={newOrderContent} 
            style={{ width: '100%' }}
            onChange={(event) => setNewOrderContent(event.target.value)} 
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Select a table"
            optionFilterProp="children"
            onChange={setSelectedTableId}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {tables.map(({ name, id }) => (
              <Select.Option value={id}>{name}</Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
    </Modal>
  )
}
