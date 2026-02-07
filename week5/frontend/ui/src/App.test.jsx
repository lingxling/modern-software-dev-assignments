import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock fetch API
global.fetch = jest.fn();

const mockNotes = [
  { id: 1, title: 'Test Note 1', content: 'This is a test note 1' },
  { id: 2, title: 'Test Note 2', content: 'This is a test note 2' }
];

const mockActionItems = [
  { id: 1, description: 'Test Action 1', completed: false },
  { id: 2, description: 'Test Action 2', completed: true }
];

describe('App Component', () => {
  beforeEach(() => {
    // Reset mock before each test
    global.fetch.mockReset();
    
    // Mock fetch for notes
    global.fetch.mockImplementation((url) => {
      if (url === '/notes/') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockNotes)
        });
      } else if (url === '/action-items/') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockActionItems)
        });
      } else if (url.startsWith('/notes/') && url !== '/notes/') {
        // Mock POST to /notes/
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ id: 3, title: 'New Note', content: 'New Note Content' })
        });
      } else if (url.startsWith('/action-items/') && url !== '/action-items/') {
        if (url.includes('/complete')) {
          // Mock PUT to /action-items/{id}/complete
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ id: 1, description: 'Test Action 1', completed: true })
          });
        } else {
          // Mock POST to /action-items/
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ id: 3, description: 'New Action', completed: false })
          });
        }
      }
      return Promise.reject(new Error('Mock not implemented for URL: ' + url));
    });
  });

  test('renders App component with title', () => {
    render(<App />);
    expect(screen.getByText('Modern Software Dev Starter')).toBeInTheDocument();
  });

  test('renders Notes section', () => {
    render(<App />);
    expect(screen.getByText('Notes')).toBeInTheDocument();
  });

  test('renders Action Items section', () => {
    render(<App />);
    expect(screen.getByText('Action Items')).toBeInTheDocument();
  });

  test('displays notes list', async () => {
    render(<App />);
    
    // Wait for notes to be fetched
    await waitFor(() => {
      expect(screen.getByText('Test Note 1: This is a test note 1')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Test Note 2: This is a test note 2')).toBeInTheDocument();
  });

  test('displays action items list', async () => {
    render(<App />);
    
    // Wait for action items to be fetched
    await waitFor(() => {
      expect(screen.getByText('Test Action 1 [open]')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Test Action 2 [done]')).toBeInTheDocument();
  });

  test('adds a new note', async () => {
    render(<App />);
    
    // Wait for initial data to load
    await waitFor(() => {
      expect(screen.getByText('Test Note 1: This is a test note 1')).toBeInTheDocument();
    });
    
    // Fill in note form
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Note' } });
    fireEvent.change(screen.getByPlaceholderText('Content'), { target: { value: 'New Note Content' } });
    
    // Submit form
    fireEvent.submit(screen.getByText('Add').closest('form'));
    
    // Wait for new note to be added
    await waitFor(() => {
      expect(screen.getByText('New Note: New Note Content')).toBeInTheDocument();
    });
  });

  test('adds a new action item', async () => {
    render(<App />);
    
    // Wait for initial data to load
    await waitFor(() => {
      expect(screen.getByText('Test Action 1 [open]')).toBeInTheDocument();
    });
    
    // Find the action items form by looking for the second "Add" button
    const addButtons = screen.getAllByText('Add');
    const actionForm = addButtons[1].closest('form');
    
    // Fill in action item form
    const actionInput = actionForm.querySelector('input[placeholder="Description"]');
    fireEvent.change(actionInput, { target: { value: 'New Action' } });
    
    // Submit form
    fireEvent.submit(actionForm);
    
    // Wait for new action item to be added
    await waitFor(() => {
      expect(screen.getByText('New Action [open]')).toBeInTheDocument();
    });
  });

  test('marks action item as complete', async () => {
    render(<App />);
    
    // Wait for initial data to load
    await waitFor(() => {
      expect(screen.getByText('Test Action 1 [open]')).toBeInTheDocument();
    });
    
    // Find and click Complete button
    const completeButton = screen.getByText('Complete');
    fireEvent.click(completeButton);
    
    // Wait for action item to be marked as complete
    await waitFor(() => {
      expect(screen.getByText('Test Action 1 [done]')).toBeInTheDocument();
    });
    
    // Complete button should no longer be present
    expect(screen.queryByText('Complete')).not.toBeInTheDocument();
  });
});
