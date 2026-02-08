import { useState, useEffect } from 'react'
import { actionItemsApi } from '../services/api'

export function useActionItems() {
  const [actionItems, setActionItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchActionItems = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await actionItemsApi.getAll()
      setActionItems(data)
    } catch (err) {
      setError('Failed to fetch action items')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const addAction = async (action) => {
    try {
      const newAction = await actionItemsApi.create(action)
      setActionItems(prev => [...prev, newAction])
      return newAction
    } catch (err) {
      setError('Failed to add action item')
      throw err
    }
  }

  const completeAction = async (id) => {
    try {
      await actionItemsApi.complete(id)
      setActionItems(prev => prev.map(item => 
        item.id === id ? { ...item, completed: true } : item
      ))
    } catch (err) {
      setError('Failed to complete action item')
      throw err
    }
  }

  const updateAction = async (id, action) => {
    try {
      const updatedAction = await actionItemsApi.update(id, action)
      setActionItems(prev => prev.map(item => 
        item.id === id ? updatedAction : item
      ))
      return updatedAction
    } catch (err) {
      setError('Failed to update action item')
      throw err
    }
  }

  useEffect(() => {
    fetchActionItems()
  }, [])

  return {
    actionItems,
    isLoading,
    error,
    addAction,
    completeAction,
    updateAction,
    refetchActionItems: fetchActionItems,
  }
}
