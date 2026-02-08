import React from 'react'
import Button from './ui/Button'
import Input from './ui/Input'
import { Card, CardHeader, CardContent, CardItem, CardEmpty, CardForm } from './ui/Card'

const ActionItemsSection = ({ actionItems, newAction, setNewAction, handleAddAction, handleCompleteAction, editingAction, setEditingAction, handleSaveAction, handleCancelEditAction }) => {
  return (
    <section className="animate-fade-in">
      <Card>
        <CardHeader 
          title="Action Items" 
          badge={`${actionItems.filter(item => !item.completed).length} pending`}
        />
        
        {/* Add Action Form */}
        <CardForm onSubmit={handleAddAction}>
        <Input
          id="action-description"
          label="Task description"
          placeholder="What needs to be done?"
          value={newAction}
          onChange={(e) => setNewAction(e.target.value)}
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
          Add Task
        </Button>
        </CardForm>
        
        {/* Action Items List */}
        <CardContent>
          {actionItems.length === 0 ? (
            <CardEmpty 
              title="No tasks yet"
              message="Add your first task to get started"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary-300 dark:text-secondary-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="48" height="48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
            />
          ) : (
            actionItems.map((item, index) => (
              editingAction && editingAction.id === item.id ? (
                <CardItem 
                  key={item.id}
                  isHovered={false}
                  className="border-primary-200 dark:border-primary-600"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <form onSubmit={handleSaveAction} className="flex flex-col gap-3">
                    <Input
                      id="edit-action-description"
                      label="Task description"
                      value={editingAction.description}
                      onChange={(e) => setEditingAction({ ...editingAction, description: e.target.value })}
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
                        onClick={handleCancelEditAction}
                        className="px-4 py-2 text-sm font-medium shadow-sm hover:shadow"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardItem>
              ) : (
                <CardItem 
                  key={item.id}
                  className={`flex justify-between items-center ${
                    item.completed 
                      ? 'bg-secondary-100 dark:bg-secondary-700 border-secondary-200 dark:border-secondary-600' 
                      : 'bg-white dark:bg-card border-secondary-200 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-600'
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
                      <Button
                        onClick={() => {
                          handleCompleteAction(item.id);
                        }}
                        variant="primary"
                        size="sm"
                        className="text-sm shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ripple-effect active:scale-95 px-4 py-2"
                      >
                        Complete
                      </Button>
                    )}
                    <Button
                      onClick={() => setEditingAction(item)}
                      variant="secondary"
                      size="sm"
                      className="text-sm px-4 py-2 shadow-sm hover:shadow"
                    >
                      Edit
                    </Button>
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

export default ActionItemsSection
