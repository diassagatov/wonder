🛠️ Profile Builder & Live Preview Editor
Overview:
A sleek, React-based web application that allows users to build, edit, and preview personal profile pages in real time. The app features a dynamic section-based editor and a live preview renderer to visualize changes immediately. It's designed with a clean UI, modular structure, and built-in API integration for persistence.

Key Features:

🧩 Modular Section Editing
Supports custom sections like Name, About, Cards, Skills, Projects, and Social Links. Users can add, reorder, and remove sections easily via the sidebar editor.

✨ Real-Time Preview
Changes made in the sidebar are instantly reflected in the live preview pane using a shared data state.

🖱️ Intuitive Drag-and-Click UX
Move sections up/down, delete with one click, and add new content types dynamically — all without refreshing the page.

🔄 Smart Save System
Updates are sent to a backend API via a PUT request, falling back to a POST if the user doesn't exist — ensuring both update and create flows are handled gracefully.

🧪 Stylish Renderer
The preview area is mobile-friendly and styled with Tailwind CSS for a modern, professional aesthetic.

🖥️ Frontend Stack:

React

Tailwind CSS

Framer Motion (optional animation)

Local state management using useState and useEffect

🔗 API-Ready
Designed to integrate with REST APIs running on http://localhost:3000/users for seamless CRUD operations.








HOW TO RUN?

at /wonder:
    npm run dev

at /server:
    npx json-server db.json5
    
