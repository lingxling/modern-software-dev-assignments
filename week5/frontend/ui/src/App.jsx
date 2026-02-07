import { useState, useEffect } from 'react'

// Get API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

function App() {
  const [notes, setNotes] = useState([])
  const [actionItems, setActionItems] = useState([])
  const [newNote, setNewNote] = useState({ title: '', content: '' })
  const [newAction, setNewAction] = useState('')

  // Fetch notes
  useEffect(() => {
    fetch(`${API_BASE_URL}/notes/`)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error('Error fetching notes:', err))
  }, [])

  // Fetch action items
  useEffect(() => {
    fetch(`${API_BASE_URL}/action-items/`)
      .then(res => res.json())
      .then(data => setActionItems(data))
      .catch(err => console.error('Error fetching action items:', err))
  }, [])

  // Add new note
  const handleAddNote = (e) => {
    e.preventDefault()
    fetch(`${API_BASE_URL}/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })
      .then(res => res.json())
      .then(data => {
        setNotes([...notes, data])
        setNewNote({ title: '', content: '' })
      })
      .catch(err => console.error('Error adding note:', err))
  }

  // Add new action item
  const handleAddAction = (e) => {
    e.preventDefault()
    fetch(`${API_BASE_URL}/action-items/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: newAction })
    })
      .then(res => res.json())
      .then(data => {
        setActionItems([...actionItems, data])
        setNewAction('')
      })
      .catch(err => console.error('Error adding action item:', err))
  }

  // Mark action item as complete
  const handleCompleteAction = (id) => {
    fetch(`${API_BASE_URL}/action-items/${id}/complete`, {
      method: 'PUT'
    })
      .then(res => res.json())
      .then(data => {
        setActionItems(actionItems.map(item => 
          item.id === id ? { ...item, completed: true } : item
        ))
      })
      .catch(err => console.error('Error completing action item:', err))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Modern Software Dev Starter</h1>

      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Notes</h2>
        <form onSubmit={handleAddNote} className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            required
            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Content"
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            required
            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button 
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Add
          </button>
        </form>
        <ul className="space-y-3">
          {notes.map(note => (
            <li key={note.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <strong className="text-gray-800">{note.title}:</strong> <span className="text-gray-600">{note.content}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Action Items</h2>
        <form onSubmit={handleAddAction} className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Description"
            value={newAction}
            onChange={(e) => setNewAction(e.target.value)}
            required
            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button 
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Add
          </button>
        </form>
        <ul className="space-y-3">
          {actionItems.map(item => (
            <li 
              key={item.id} 
              className={`p-3 rounded-lg border flex justify-between items-center ${item.completed ? 'bg-gray-100 border-gray-200' : 'bg-white border-gray-200'}`}
            >
              <span className={`${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {item.description} [{item.completed ? 'done' : 'open'}]
              </span>
              {!item.completed && (
                <button 
                  onClick={() => handleCompleteAction(item.id)}
                  className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  Complete
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default App
