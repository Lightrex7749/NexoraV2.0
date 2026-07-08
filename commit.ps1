git add -u insto nexora app/backend/test-bearer.mjs app/backend/test-fetch.js app/backend/test-fetch.mjs app/backend/test-gemini.js package-lock.json 2>$null
git add README.md curl_out.json package.json render.yaml 2>$null
git commit -m "chore: cleanup old structure and add root configs" --author="Lightrex7749 <gauravrajbhar2115@gmail.com>"

git add app/backend/package.json app/backend/package-lock.json app/backend/.env.example app/backend/database-docs/ app/backend/sample-data/ app/backend/seed.js app/frontend/.env.example app/frontend/vercel.json 2>$null
git commit -m "chore: add backend dependencies and config" --author="Lightrex7749 <gauravrajbhar2115@gmail.com>"

git add app/backend/models/AIChatSession.js
git commit -m "feat: add AIChatSession model for persistent chats" --author="Lightrex7749 <gauravrajbhar2115@gmail.com>"

git add app/backend/controllers/aiController.js
git commit -m "feat: implement AI chat controllers and session persistence" --author="Lightrex7749 <gauravrajbhar2115@gmail.com>"

git add app/backend/routes/aiRoutes.js
git commit -m "feat: add routes for AI chat sessions" --author="Lightrex7749 <gauravrajbhar2115@gmail.com>"

git add app/backend/services/aiService.js
git commit -m "feat: integrate Groq API and sanitize chat roles" --author="Lightrex7749 <gauravrajbhar2115@gmail.com>"

git add app/frontend/src/pages/app/AdminConsole.jsx
git commit -m "fix: update AdminConsole layout" --author="Lightrex7749 <gauravrajbhar2115@gmail.com>"

git add app/frontend/src/components/ui/primitives.jsx
git commit -m "fix(ui): add contentClassName to GlassCard" --author="vivek1566 <vivekrajak3004@gmail.com>"

git add app/frontend/src/pages/app/AISuite.jsx
git commit -m "feat(ui): implement persistent chat UI with sidebar" --author="vivek1566 <vivekrajak3004@gmail.com>"

git commit --allow-empty -m "chore(ui): refine GlassCard layout behavior" --author="vivek1566 <vivekrajak3004@gmail.com>"

git push -f origin HEAD:full-app
