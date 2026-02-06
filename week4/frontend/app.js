async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function loadNotes(searchQuery = null) {
  const list = document.getElementById('notes');
  list.innerHTML = '';
  
  let notes;
  if (searchQuery) {
    notes = await fetchJSON(`/notes/search/?q=${encodeURIComponent(searchQuery)}`);
  } else {
    notes = await fetchJSON('/notes/');
  }
  
  if (notes.length === 0) {
    const emptyLi = document.createElement('li');
    emptyLi.textContent = searchQuery ? 'No notes found matching your search.' : 'No notes yet. Create one!';
    emptyLi.style.textAlign = 'center';
    emptyLi.style.color = '#7f8c8d';
    list.appendChild(emptyLi);
    return;
  }
  
  for (const n of notes) {
    const li = document.createElement('li');
    
    // Note content
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = `<strong>${n.title}:</strong> ${n.content}`;
    li.appendChild(contentDiv);
    
    // Buttons container
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'note-buttons';
    
    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => showEditForm(n);
    buttonsDiv.appendChild(editBtn);
    
    // Extract button
    const extractBtn = document.createElement('button');
    extractBtn.textContent = 'Extract';
    extractBtn.onclick = async () => {
      if (confirm('Extract action items from this note?')) {
        try {
          const response = await fetchJSON(`/notes/${n.id}/extract`, { method: 'POST' });
          if (response.length > 0) {
            alert(`Extracted ${response.length} action items!`);
            loadActions();
          } else {
            alert('No action items found in this note.');
          }
        } catch (error) {
          alert('Error extracting action items: ' + error.message);
        }
      }
    };
    buttonsDiv.appendChild(extractBtn);
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = async () => {
      if (confirm('Are you sure you want to delete this note?')) {
        await fetch(`/notes/${n.id}`, { method: 'DELETE' });
        loadNotes(document.getElementById('note-search').value);
      }
    };
    buttonsDiv.appendChild(deleteBtn);
    
    li.appendChild(buttonsDiv);
    
    list.appendChild(li);
  }
}

function showEditForm(note) {
  const form = document.createElement('form');
  form.innerHTML = `
    <h3>Edit Note</h3>
    <input type="hidden" id="edit-note-id" value="${note.id}">
    <div>
      <label>Title:</label>
      <input type="text" id="edit-note-title" value="${note.title}" required>
    </div>
    <div>
      <label>Content:</label>
      <textarea id="edit-note-content" required>${note.content}</textarea>
    </div>
    <button type="submit">Save</button>
    <button type="button" onclick="this.form.remove()">Cancel</button>
  `;
  
  form.onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-note-id').value;
    const title = document.getElementById('edit-note-title').value;
    const content = document.getElementById('edit-note-content').value;
    
    await fetchJSON(`/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    
    form.remove();
    loadNotes(document.getElementById('note-search').value);
  };
  
  document.getElementById('notes').appendChild(form);
}

async function loadActions() {
  const list = document.getElementById('actions');
  list.innerHTML = '';
  const items = await fetchJSON('/action-items/');
  for (const a of items) {
    const li = document.createElement('li');
    li.textContent = `${a.description} [${a.completed ? 'done' : 'open'}]`;
    if (!a.completed) {
      const btn = document.createElement('button');
      btn.textContent = 'Complete';
      btn.onclick = async () => {
        await fetchJSON(`/action-items/${a.id}/complete`, { method: 'PUT' });
        loadActions();
      };
      li.appendChild(btn);
    }
    list.appendChild(li);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('note-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;
    await fetchJSON('/notes/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    e.target.reset();
    loadNotes(document.getElementById('note-search').value);
  });
  
  // Search functionality
  document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('note-search').value;
    loadNotes(query);
  });
  
  // Clear search
  document.getElementById('clear-search').addEventListener('click', () => {
    document.getElementById('note-search').value = '';
    loadNotes();
  });
  
  // Press Enter to search
  document.getElementById('note-search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = document.getElementById('note-search').value;
      loadNotes(query);
    }
  });

  document.getElementById('action-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = document.getElementById('action-desc').value;
    await fetchJSON('/action-items/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });
    e.target.reset();
    loadActions();
  });

  loadNotes();
  loadActions();
});
