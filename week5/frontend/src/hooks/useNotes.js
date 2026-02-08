import { useState, useEffect } from 'react'
import { notesApi } from '../services/api'

export function useNotes() {
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNotes = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await notesApi.getAll()
      setNotes(data)
    } catch (err) {
      setError('Failed to fetch notes')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const addNote = async (note) => {
    try {
      const newNote = await notesApi.create(note)
      setNotes((prev) => [...prev, newNote])
      return newNote
    } catch (err) {
      setError('Failed to add note')
      throw err
    }
  }

  const updateNote = async (id, note) => {
    try {
      const updatedNote = await notesApi.update(id, note)
      setNotes((prev) => prev.map((n) => (n.id === id ? updatedNote : n)))
      return updatedNote
    } catch (err) {
      setError('Failed to update note')
      throw err
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return {
    notes,
    isLoading,
    error,
    addNote,
    updateNote,
    refetchNotes: fetchNotes,
  }
}
