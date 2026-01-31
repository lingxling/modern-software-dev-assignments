# Action Item Extractor

A minimal FastAPI + SQLite application that converts free-form notes into enumerated action items, with both heuristic and LLM-powered extraction capabilities.

## Features

- **Heuristic Extraction**: Extracts action items using predefined patterns (bullet points, keywords, checkboxes)
- **LLM-Powered Extraction**: Uses Ollama to extract action items with more sophisticated natural language understanding
- **Database Storage**: Persists notes and extracted action items in SQLite
- **Web Interface**: Simple HTML frontend for interacting with the API
- **RESTful API**: Well-documented endpoints for all functionality

## Getting Started

### Prerequisites

- Python 3.10+
- Poetry (for dependency management)
- Conda (for environment management)
- Ollama (for LLM-powered extraction)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd modern-software-dev-assignments/week2
   ```

2. **Activate your conda environment**
   ```bash
   conda activate cs146s
   ```

3. **Install dependencies**
   ```bash
   poetry install
   ```

4. **Pull an Ollama model** (for LLM extraction)
   ```bash
   ollama run llama3
   ```

### Running the Application

```bash
poetry run uvicorn week2.app.main:app --reload
```

The application will be available at http://127.0.0.1:8000/

## API Endpoints

### Action Items

- **POST /action-items/extract**
  - Extract action items using heuristic method
  - Request body: `{"text": "Notes text", "save_note": true}`
  - Response: `{"note_id": 1, "items": [{"id": 1, "text": "Action item 1"}]}`

- **POST /action-items/extract-llm**
  - Extract action items using LLM method
  - Request body: `{"text": "Notes text", "save_note": true}`
  - Response: `{"note_id": 1, "items": [{"id": 1, "text": "Action item 1"}]}`

- **GET /action-items**
  - List all action items
  - Query parameter: `note_id` (optional)
  - Response: `[{"id": 1, "note_id": 1, "text": "Action item 1", "done": false, "created_at": "2023-01-01 12:00:00"}]`

- **POST /action-items/{action_item_id}/done**
  - Mark action item as done/not done
  - Request body: `{"done": true}`
  - Response: `{"id": 1, "done": true}`

### Notes

- **POST /notes**
  - Create a new note
  - Request body: `{"content": "Note content"}`
  - Response: `{"id": 1, "content": "Note content", "created_at": "2023-01-01 12:00:00"}`

- **GET /notes/{note_id}**
  - Get a single note by ID
  - Response: `{"id": 1, "content": "Note content", "created_at": "2023-01-01 12:00:00"}`

- **GET /notes**
  - List all notes
  - Response: `[{"id": 1, "content": "Note content", "created_at": "2023-01-01 12:00:00"}]`

## Project Structure

```
week2/
├── app/
│   ├── routers/
│   │   ├── action_items.py  # Action item endpoints
│   │   └── notes.py         # Note endpoints
│   ├── services/
│   │   └── extract.py       # Extraction logic (heuristic and LLM)
│   ├── __init__.py
│   ├── db.py                # Database operations
│   ├── main.py              # FastAPI application
│   └── schemas.py           # Pydantic models for API
├── frontend/
│   └── index.html           # Web interface
├── tests/
│   └── test_extract.py      # Extraction tests
├── README.md                # This file
└── writeup.md               # Assignment writeup
```

## Running Tests

```bash
poetry run pytest week2/tests/
```

## How It Works

1. **Heuristic Extraction**: The application identifies action items by looking for:
   - Bullet points (`-`, `*`, `•`, `1.`)
   - Keyword prefixes (`todo:`, `action:`, `next:`)
   - Checkbox markers (`[ ]`, `[todo]`)
   - Imperative sentences

2. **LLM Extraction**: Uses Ollama's llama3 model to:
   - Understand natural language context
   - Identify action items more accurately
   - Handle complex sentence structures

3. **Database Storage**: All notes and extracted action items are stored in SQLite for persistence.

4. **Web Interface**: The simple HTML frontend allows users to:
   - Enter notes
   - Extract action items (both methods)
   - View and manage action items
   - List all saved notes

## License

MIT
