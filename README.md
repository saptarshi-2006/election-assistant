# Nirvachan Sahayika (Election Guide Assistant)

A fullstack web application to assist voters and Booth Level Officers (BLOs) during elections, featuring AI assistance powered by Gemini 1.5 Pro.

## Project Structure
- `/frontend` - React 18, Vite, Tailwind CSS
- `/backend` - Node.js, Express, Firebase Admin

## Setup Instructions

### Prerequisites
- Node.js 20+
- Docker & docker-compose (optional, for containerized run)
- Firebase Project setup
- Gemini API Key

### 1. Environment Variables
Copy the templates and fill in your keys:

**Frontend (`frontend/.env.local`):**
\`\`\`env
VITE_GEMINI_KEY=your_gemini_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_ID=your_messaging_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GOOGLE_MAPS_KEY=your_maps_api_key
VITE_BACKEND_URL=http://localhost:4000/v1
\`\`\`

**Backend (`backend/.env`):**
\`\`\`env
PORT=4000
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_TRANSLATE_KEY=your_translate_api_key
FIREBASE_PROJECT_ID=your_project_id
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
\`\`\`
*Note: Download your Firebase service account JSON and save it as `backend/serviceAccountKey.json`.*

### 2. Run Locally (Without Docker)

**Backend:**
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

**Frontend:**
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

### 3. Run Locally (With Docker Compose)
Make sure you have created `frontend/Dockerfile` and installed dependencies locally first or rely on docker volumes.
\`\`\`bash
docker-compose up --build
\`\`\`

## Deployment
- **Backend:** Google Cloud Run
- **Frontend:** Firebase Hosting (`firebase deploy --only hosting`)
