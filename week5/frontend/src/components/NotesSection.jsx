import React from 'react'

const NotesSection = ({ notes, newNote, setNewNote, handleAddNote, editingNote, setEditingNote, handleSaveNote, handleCancelEditNote }) => {
  return (
    <section className="bg-white dark:bg-card rounded-xl shadow-card p-6 mb-8 transition-all duration-300 hover:shadow-elevated animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-secondary-800 dark:text-white">Notes</h2>
        <span className="text-sm text-secondary-500 dark:text-secondary-400 bg-secondary-50 dark:bg-secondary-800 px-3 py-1 rounded-full">{notes.length} notes</span>
      </div>
      
      {/* Add Note Form */}
      <form onSubmit={handleAddNote} className="flex flex-col gap-3 mb-8 p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
        <div className="flex flex-col gap-1">
          <label htmlFor="note-title" className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Note title</label>
          <input
            id="note-title"
            type="text"
            placeholder="Note title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            required
            aria-required="true"
            className="w-full px-4 py-3 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white dark:bg-card dark:text-white"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="note-content" className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Note content</label>
          <input
            id="note-content"
            type="text"
            placeholder="Note content"
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            required
            aria-required="true"
            className="w-full px-4 py-3 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white dark:bg-card dark:text-white"
          />
        </div>
        <button 
          type="submit"
          className="w-full sm:w-auto px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-300 font-medium shadow-sm hover:shadow-md flex items-center justify-center whitespace-nowrap ripple-effect active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Note
        </button>
      </form>
      
      {/* Notes List */}
      <div className="space-y-3">
        {notes.length === 0 ? (
          <div className="text-center py-12 px-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary-300 dark:text-secondary-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="48" height="48">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-secondary-700 dark:text-secondary-300 font-medium mb-2">No notes yet</h3>
            <p className="text-secondary-500 dark:text-secondary-400">Add your first note to get started</p>
          </div>
        ) : (
          notes.map((note, index) => (
            editingNote && editingNote.id === note.id ? (
              <div 
                key={note.id} 
                className="p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 animate-slide-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <form onSubmit={handleSaveNote} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="edit-note-title" className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Note title</label>
                    <input
                      id="edit-note-title"
                      type="text"
                      value={editingNote.title}
                      onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                      required
                      aria-required="true"
                      className="px-4 py-2 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white dark:bg-card dark:text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="edit-note-content" className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Note content</label>
                    <input
                      id="edit-note-content"
                      type="text"
                      value={editingNote.content}
                      onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                      required
                      aria-required="true"
                      className="px-4 py-2 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white dark:bg-card dark:text-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow ripple-effect"
                    >
                      Save
                    </button>
                    <button 
                      type="button"
                      onClick={handleCancelEditNote}
                      className="px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div 
                key={note.id} 
                className="p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 transition-all duration-300 hover:shadow-md hover:border-secondary-300 dark:hover:border-secondary-600 animate-slide-in hover-lift"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-secondary-900 dark:text-white mb-1 transition-colors duration-200">{note.title}</h3>
                    <p className="text-secondary-600 dark:text-secondary-400 transition-colors duration-200">{note.content}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingNote(note)}
                      className="text-xs text-secondary-500 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <div className="text-xs text-secondary-400 dark:text-secondary-500">
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            )
          ))
        )}
      </div>
    </section>
  )
}

export default NotesSection
