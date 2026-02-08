import { useState, useMemo } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import NotesSection from './components/NotesSection'
import ActionItemsSection from './components/ActionItemsSection'
import { useNotes } from './hooks/useNotes'
import { useActionItems } from './hooks/useActionItems'
import { useDarkMode } from './hooks/useDarkMode'

function App() {
  const [newNote, setNewNote] = useState({ title: '', content: '' })
  const [newAction, setNewAction] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingNote, setEditingNote] = useState(null)
  const [editingAction, setEditingAction] = useState(null)

  const { notes, addNote, updateNote } = useNotes()
  const { actionItems, addAction, completeAction, updateAction } = useActionItems()
  const { darkMode, toggleDarkMode } = useDarkMode()

  const handleAddNote = async (e) => {
    e.preventDefault()
    try {
      await addNote(newNote)
      setNewNote({ title: '', content: '' })
    } catch (err) {
      console.error('Error adding note:', err)
    }
  }

  const handleAddAction = async (e) => {
    e.preventDefault()
    try {
      await addAction(newAction)
      setNewAction('')
    } catch (err) {
      console.error('Error adding action item:', err)
    }
  }

  const handleSaveNote = async (e) => {
    e.preventDefault()
    if (!editingNote) return
    try {
      await updateNote(editingNote.id, editingNote)
      setEditingNote(null)
    } catch (err) {
      console.error('Error updating note:', err)
    }
  }

  const handleCancelEditNote = () => {
    setEditingNote(null)
  }

  const handleSaveAction = async (e) => {
    e.preventDefault()
    if (!editingAction) return
    try {
      await updateAction(editingAction.id, editingAction)
      setEditingAction(null)
    } catch (err) {
      console.error('Error updating action item:', err)
    }
  }

  const handleCancelEditAction = () => {
    setEditingAction(null)
  }

  const filteredNotes = useMemo(() => 
    notes.filter(note => 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [notes, searchQuery]
  )

  const filteredActionItems = useMemo(() => 
    actionItems.filter(item => 
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [actionItems, searchQuery]
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
      <ActionItemsSection 
        actionItems={filteredActionItems} 
        newAction={newAction} 
        setNewAction={setNewAction} 
        handleAddAction={handleAddAction} 
        handleCompleteAction={completeAction} 
        editingAction={editingAction} 
        setEditingAction={setEditingAction} 
        handleSaveAction={handleSaveAction} 
        handleCancelEditAction={handleCancelEditAction} 
      />
      <footer className="mt-12 text-center text-sm text-secondary-500 dark:text-secondary-400">
        <p>Modern Software Dev Starter © {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App
