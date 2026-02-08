import React from 'react'
import Button from './ui/Button'
import Input from './ui/Input'
import { Card, CardHeader, CardContent, CardItem, CardEmpty, CardForm } from './ui/Card'

const NotesSection = ({ notes, newNote, setNewNote, handleAddNote, editingNote, setEditingNote, handleSaveNote, handleCancelEditNote }) => {
  return (
    <section className="animate-fade-in">
      <Card className="mb-8">
        <CardHeader 
          title="Notes" 
          badge={`${notes.length} notes`}
        />
        
        {/* Add Note Form */}
        <CardForm onSubmit={handleAddNote}>
        <Input
          id="note-title"
          label="Note title"
          placeholder="Note title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          required
        />
        <Input
          id="note-content"
          label="Note content"
          placeholder="Note content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          required
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full sm:w-auto transition-all duration-300 font-medium shadow-sm hover:shadow-md flex items-center justify-center whitespace-nowrap ripple-effect active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Note
        </Button>
        </CardForm>
        
        {/* Notes List */}
        <CardContent>
          {notes.length === 0 ? (
            <CardEmpty 
              title="No notes yet"
              message="Add your first note to get started"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary-300 dark:text-secondary-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="48" height="48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />
          ) : (
            notes.map((note, index) => (
              editingNote && editingNote.id === note.id ? (
                <CardItem 
                  key={note.id}
                  isHovered={false}
                  className="bg-secondary-50 dark:bg-secondary-800 border-secondary-200 dark:border-secondary-700"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <form onSubmit={handleSaveNote} className="flex flex-col gap-3">
                    <Input
                      id="edit-note-title"
                      label="Note title"
                      value={editingNote.title}
                      onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                      required
                    />
                    <Input
                      id="edit-note-content"
                      label="Note content"
                      value={editingNote.content}
                      onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                      required
                    />
                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        variant="primary"
                        className="px-4 py-2 text-sm font-medium shadow-sm hover:shadow ripple-effect"
                      >
                        Save
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleCancelEditNote}
                        className="px-4 py-2 text-sm font-medium shadow-sm hover:shadow"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardItem>
              ) : (
                <CardItem 
                  key={note.id}
                  className="bg-secondary-50 dark:bg-secondary-800 border-secondary-200 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-600"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-secondary-900 dark:text-white mb-1 transition-colors duration-200">{note.title}</h3>
                      <p className="text-secondary-600 dark:text-secondary-400 transition-colors duration-200">{note.content}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => setEditingNote(note)}
                        variant="ghost"
                        size="sm"
                        className="text-xs text-secondary-500 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 p-0"
                      >
                        Edit
                      </Button>
                      <div className="text-xs text-secondary-400 dark:text-secondary-500">
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardItem>
              )
            ))
          )}
        </CardContent>
      </Card>
    </section>
  )
}

export default NotesSection
