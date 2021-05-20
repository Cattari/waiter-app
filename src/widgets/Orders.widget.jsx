import React, { useState } from 'react'

import { NewOrderModal, OrderListItem } from '../components';
import { Button, Divider, List } from 'antd';
import { useOrders } from '../hooks/useOrders';
import { useTables } from '../hooks/useTables';

export const OrdersWidget = () => {
  const [isNewOrderModalVisible, setNewOrderModalVisible] = useState()
  const closeModal = () => setNewOrderModalVisible(false)
  const openModal = () => setNewOrderModalVisible(true)
  const [tables] = useTables()
  const [data, ,fetchOrders, deleteOrder, addOrder] = useOrders()
  const onAddOrder = async (data) => {
    await addOrder(data)
    fetchOrders()
  }

  return (
    <div>
      <Divider orientation="left">
        Orders
        {' '}
        <Button type="button" onClick={fetchOrders}>Reload orders</Button>
        {' '}
        <Button type="button" onClick={openModal}>+ Add new order</Button>
      </Divider>
      <List
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <OrderListItem key={item.id} {...item} onDelete={deleteOrder} />
          </List.Item>
        )}
      />
      <NewOrderModal
        tables={tables} 
        onSubmit={onAddOrder}
        visible={isNewOrderModalVisible}
        onClose={closeModal}
      />
    </div>
  )
}