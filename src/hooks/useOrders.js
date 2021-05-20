import { useEffect, useState } from 'react'
import { API_URL } from '../constants'

export const useOrders = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    const response = await fetch(`${API_URL}/orders`)
    const { result } = await response.json()
  
    setData(result)
    setIsLoading(false)
  }

  const addOrder = async (order) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order)    
    })
    const { result } = await response.json()
  
    setData(data.concat(result))
  }

  const deleteOrder = async (id) => {
    setIsLoading(true)
    await fetch(`${API_URL}/orders/${id}`, {
      method: 'DELETE',
    })
    setData(data.filter(item => item.id !== id))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return [data, isLoading, fetchData, deleteOrder, addOrder]
}