import { useEffect, useState } from 'react'
import { API_URL } from '../constants'

export const useTables = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    const response = await fetch(`${API_URL}/tables`)
    const { result } = await response.json()
  
    setData(result)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return [data, isLoading, fetchData]
}
