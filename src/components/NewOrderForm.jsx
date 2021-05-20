import React, { useState } from 'react'
import { Button, Select, Row, Col, Input } from 'antd'

export const NewOrderForm = ({ tables, onSubmit }) => {
  const [newOrderContent, setNewOrderContent] = useState('')
  const [selectedTableId, setSelectedTableId] = useState(null)
  const isSubmitDisabled = !newOrderContent || !selectedTableId
  const onAddOrder = () => {
    if (isSubmitDisabled) return
    onSubmit({ content: newOrderContent, table_id: selectedTableId })
    setNewOrderContent('')
  }

  return (
    <>
      <Row>
        <Col span={8}> 
          <Input.TextArea
            value={newOrderContent} 
            style={{ width: '100%' }}
            onChange={(event) => setNewOrderContent(event.target.value)} 
          />
        </Col>
        <Col span={8}>
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
              <Select.Option key={id} value={id}>{name}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={8}>
          <Button 
            type="button" 
            disabled={isSubmitDisabled} 
            onClick={onAddOrder}
          >
            Add order
          </Button>
        </Col>
      </Row>
    </>
  )
}
