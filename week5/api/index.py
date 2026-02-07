# Vercel serverless function entry point
from backend.app.main import app

# Vercel requires the app to be exported as 'application'
application = app
