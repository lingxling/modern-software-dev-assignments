import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import NotesSection from './components/NotesSection'
import ActionItemsSection from './components/ActionItemsSection'

// Get API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

function App() {
  const [notes, setNotes] = useState([])
  const [actionItems, setActionItems] = useState([])
  const [newNote, setNewNote] = useState({ title: '', content: '' })
  const [newAction, setNewAction] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [editingNote, setEditingNote] = useState(null)
  const [editingAction, setEditingAction] = useState(null)

  // Check for dark mode preference on load
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
      window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', newMode)
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/notes/`)
        const data = await res.json()
        setNotes(data)
      } catch (err) {
        console.error('Error fetching notes:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotes()
  }, [])

  // Fetch action items
  useEffect(() => {
    const fetchActionItems = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/action-items/`)
        const data = await res.json()
        setActionItems(data)
      } catch (err) {
        console.error('Error fetching action items:', err)
      }
    }

    fetchActionItems()
  }, [])

  // Add new note
  const handleAddNote = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_BASE_URL}/notes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
      })
      const data = await res.json()
      setNotes([...notes, data])
      setNewNote({ title: '', content: '' })
    } catch (err) {
      console.error('Error adding note:', err)
    }
  }

  // Add new action item
  const handleAddAction = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_BASE_URL}/action-items/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: newAction })
      })
      const data = await res.json()
      setActionItems([...actionItems, data])
      setNewAction('')
    } catch (err) {
      console.error('Error adding action item:', err)
    }
  }

  // Mark action item as complete
  const handleCompleteAction = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/action-items/${id}/complete`, {
        method: 'PUT'
      })
      const data = await res.json()
      setActionItems(actionItems.map(item => 
        item.id === id ? { ...item, completed: true } : item
      ))
    } catch (err) {
      console.error('Error completing action item:', err)
    }
  }

  // Edit note
  const handleEditNote = (note) => {
    setEditingNote(note)
  }

  // Save edited note
  const handleSaveNote = async (e) => {
    e.preventDefault()
    if (!editingNote) return
    try {
      const res = await fetch(`${API_BASE_URL}/notes/${editingNote.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingNote)
      })
      const data = await res.json()
      setNotes(notes.map(note => 
        note.id === editingNote.id ? data : note
      ))
      setEditingNote(null)
    } catch (err) {
      console.error('Error updating note:', err)
    }
  }

  // Cancel editing note
  const handleCancelEditNote = () => {
    setEditingNote(null)
  }

  // Edit action item
  const handleEditAction = (item) => {
    setEditingAction(item)
  }

  // Save edited action item
  const handleSaveAction = async (e) => {
    e.preventDefault()
    if (!editingAction) return
    try {
      const res = await fetch(`${API_BASE_URL}/action-items/${editingAction.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingAction)
      })
      const data = await res.json()
      setActionItems(actionItems.map(item => 
        item.id === editingAction.id ? data : item
      ))
      setEditingAction(null)
    } catch (err) {
      console.error('Error updating action item:', err)
    }
  }

  // Cancel editing action item
  const handleCancelEditAction = () => {
    setEditingAction(null)
  }

  // Filtered notes
  const filteredNotes = useMemo(() => 
    notes.filter(note => 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [notes, searchQuery]
  )

  // Filtered action items
  const filteredActionItems = useMemo(() => 
    actionItems.filter(item => 
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [actionItems, searchQuery]
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Notes Section */}
      <NotesSection 
        notes={filteredNotes} 
        newNote={newNote} 
        setNewNote={setNewNote} 
        handleAddNote={handleAddNote} 
        editingNote={editingNote} 
        setEditingNote={setEditingNote} 
        handleSaveNote={handleSaveNote} 
        handleCancelEditNote={handleCancelEditNote} 
      />

      {/* Action Items Section */}
      <ActionItemsSection 
        actionItems={filteredActionItems} 
        newAction={newAction} 
        setNewAction={setNewAction} 
        handleAddAction={handleAddAction} 
        handleCompleteAction={handleCompleteAction} 
        editingAction={editingAction} 
        setEditingAction={setEditingAction} 
        handleSaveAction={handleSaveAction} 
        handleCancelEditAction={handleCancelEditAction} 
      />

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-secondary-500 dark:text-secondary-400">
        <p>Modern Software Dev Starter © {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App
