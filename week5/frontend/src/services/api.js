const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

async function request(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

export const notesApi = {
  getAll: () => request('/notes/'),
  create: (note) => request('/notes/', {
    method: 'POST',
    body: JSON.stringify(note),
  }),
  update: (id, note) => request(`/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(note),
  }),
}

export const actionItemsApi = {
  getAll: () => request('/action-items/'),
  create: (action) => request('/action-items/', {
    method: 'POST',
    body: JSON.stringify({ description: action }),
  }),
  complete: (id) => request(`/action-items/${id}/complete`, {
    method: 'PUT',
  }),
  update: (id, action) => request(`/action-items/${id}`, {
    method: 'PUT',
    body: JSON.stringify(action),
  }),
}
