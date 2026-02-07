# Week 5

Minimal full‑stack starter for experimenting with autonomous coding agents.

- FastAPI backend with SQLite (SQLAlchemy)
- Vite + React frontend with Tailwind CSS
- Minimal tests (pytest + React Testing Library)
- Pre-commit (black + ruff)
- Tasks to practice agent-driven workflows
- Vercel deployment ready

## Quickstart

### Backend Setup

1) Create and activate a virtualenv, then install dependencies

```bash
cd modern-software-dev-assignments
python -m venv .venv && .venv\Scripts\activate
pip install -e .[dev]
```

2) (Optional) Install pre-commit hooks

```bash
pre-commit install
```

### Frontend Setup

1) Install frontend dependencies

```bash
cd week5 && make -f MakefileWin web-install
```

## Running the App

### Run both backend and frontend (production mode)

```bash
cd week5 && make -f MakefileWin run
```

### Run frontend development server (hot reload)

```bash
cd week5 && make -f MakefileWin web-dev
```

Open `http://localhost:8000` for the frontend and `http://localhost:8000/docs` for the API docs.

## Structure

```
backend/                # FastAPI app
frontend/
  ├── ui/               # Vite + React frontend
  └── dist/             # Built frontend files (served by FastAPI)
data/                   # SQLite DB + seed
docs/                   # TASKS for agent-driven workflows
api/                    # Vercel serverless function entry point
```

## Tests

### Backend tests

```bash
cd week5 && make -f MakefileWin test
```

### Frontend tests

```bash
cd week5/frontend/ui && npm test
```

## Formatting/Linting

### Backend

```bash
cd week5 && make -f MakefileWin format
cd week5 && make -f MakefileWin lint
```

### Frontend

```bash
cd week5/frontend/ui && npm run lint
```

## Configuration

Copy `.env.example` to `.env` (in `week5/`) to override defaults like the database path.

## Vercel Deployment

### Prerequisites

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install the Vercel CLI: `npm install -g vercel`

### Deployment Steps

1. Build the frontend

```bash
cd week5 && make -f MakefileWin web-build
```

2. Deploy to Vercel

```bash
cd week5 && vercel
```

3. Follow the prompts to configure your deployment

### Environment Variables

The following environment variables are used:

- `VITE_API_BASE_URL`: Base URL for API calls (automatically set by Vercel)

### Deployment Configuration

The `vercel.json` file configures the deployment with the following settings:

- Frontend: Built using `@vercel/static-build`
- API: Built using `@vercel/python`
- Routes: `/api/*` for API endpoints, `/*` for frontend

## Development Workflow

1. Start backend: `make -f MakefileWin run`
2. Start frontend dev server: `make -f MakefileWin web-dev`
3. Make changes to code
4. Run tests: `make -f MakefileWin test` and `npm test`
5. Build for production: `make -f MakefileWin web-build`
6. Deploy to Vercel: `vercel`
