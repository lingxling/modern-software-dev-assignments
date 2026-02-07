import React from 'react'

const ActionItemsSection = ({ actionItems, newAction, setNewAction, handleAddAction, handleCompleteAction, editingAction, setEditingAction, handleSaveAction, handleCancelEditAction }) => {
  return (
    <section className="bg-white dark:bg-card rounded-xl shadow-card p-6 transition-all duration-300 hover:shadow-elevated animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-secondary-800 dark:text-white">Action Items</h2>
        <span className="text-sm text-secondary-500 dark:text-secondary-400 bg-secondary-50 dark:bg-secondary-800 px-3 py-1 rounded-full">
          {actionItems.filter(item => !item.completed).length} pending
        </span>
      </div>
      
      {/* Add Action Form */}
      <form onSubmit={handleAddAction} className="flex flex-col gap-3 mb-8 p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
        <div className="flex flex-col gap-1">
          <label htmlFor="action-description" className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Task description</label>
          <input
            id="action-description"
            type="text"
            placeholder="What needs to be done?"
            value={newAction}
            onChange={(e) => setNewAction(e.target.value)}
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
          Add Task
        </button>
      </form>
      
      {/* Action Items List */}
      <div className="space-y-3">
        {actionItems.length === 0 ? (
          <div className="text-center py-12 px-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary-300 dark:text-secondary-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="48" height="48">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-secondary-700 dark:text-secondary-300 font-medium mb-2">No tasks yet</h3>
            <p className="text-secondary-500 dark:text-secondary-400">Add your first task to get started</p>
          </div>
        ) : (
          actionItems.map((item, index) => (
            editingAction && editingAction.id === item.id ? (
              <div 
                key={item.id} 
                className="p-4 rounded-lg border flex flex-col gap-3 animate-slide-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <form onSubmit={handleSaveAction} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="edit-action-description" className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Task description</label>
                    <input
                      id="edit-action-description"
                      type="text"
                      value={editingAction.description}
                      onChange={(e) => setEditingAction({ ...editingAction, description: e.target.value })}
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
                      onClick={handleCancelEditAction}
                      className="px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div 
                key={item.id} 
                className={`p-4 rounded-lg border flex justify-between items-center transition-all duration-300 animate-slide-in hover-lift ${
                  item.completed 
                    ? 'bg-secondary-100 dark:bg-secondary-700 border-secondary-200 dark:border-secondary-600' 
                    : 'bg-white dark:bg-card border-secondary-200 dark:border-secondary-700 hover:shadow-md hover:border-secondary-300 dark:hover:border-secondary-600'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-3">
                  {item.completed ? (
                    <div className="w-6 h-6 rounded-full bg-success-500 flex items-center justify-center text-white shadow-sm transition-all duration-200 transform scale-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-secondary-300 dark:border-secondary-500 flex items-center justify-center transition-all duration-200 hover:border-primary-500 dark:hover:border-primary-400 cursor-pointer">
                      <div className="w-3.5 h-3.5 rounded-full bg-transparent transition-all duration-200"></div>
                    </div>
                  )}
                  <span className={`flex-1 transition-all duration-300 ${
                    item.completed 
                      ? 'line-through text-secondary-400 dark:text-secondary-500' 
                      : 'text-secondary-800 dark:text-white'
                  }`}>
                    {item.description}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  {!item.completed && (
                    <button 
                      onClick={(e) => {
                        handleCompleteAction(item.id);
                      }}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ripple-effect active:scale-95"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => setEditingAction(item)}
                    className="px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-sm hover:shadow"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )
          ))
        )}
      </div>
    </section>
  )
}

export default ActionItemsSection
