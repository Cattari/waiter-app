import React from 'react'
import { Button, Card } from 'antd'

export const OrderListItem = ({ id, content, tableName, onDelete }) => {
  return (
    <div className="site-card-border-less-wrapper">
      <Card title={`${tableName} Order#${id}`} bordered={false}>
        <p>{content}</p>
        <Button type="button" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </Card>
    </div>
  )
}
