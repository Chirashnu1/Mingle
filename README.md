
# Mingle Chat App

A real-time chat application built with React, Socket.IO, and Express.

## Features

- Real-time messaging
- User authentication
- Typing indicators
- Read receipts
- Online/offline status
- Responsive UI
- Dark mode
- Multiple chat rooms

## Project Structure

```
├── src/                     # Frontend React application
│   ├── components/          # React components
│   ├── contexts/            # Context providers
│   └── ...
├── server/                  # Backend Node.js server
│   ├── server.js            # Socket.IO and Express server
│   └── package.json         # Server dependencies
└── README.md                # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Running the Backend

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the server:
```bash
npm run dev
# or
yarn dev
```

The server will start on port 3001 by default.

### Running the Frontend

1. In a new terminal, navigate to the project root directory.

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to http://localhost:5173

## Deployment

### Frontend (Vercel)

1. Push your code to a GitHub repository.

2. Sign up for a Vercel account and connect your GitHub account.

3. Create a new project in Vercel and select your repository.

4. Configure the build settings if needed and deploy.

### Backend (Render/Railway)

1. Push your code to a GitHub repository.

2. Sign up for a Render or Railway account and connect your GitHub account.

3. Create a new web service, select your repository, and set the build command to:
```
cd server && npm install
```

4. Set the start command to:
```
cd server && node server.js
```

5. Set the environment variable:
```
PORT=3001
```

6. Deploy the service.

7. Update the `SOCKET_URL` in the frontend code to point to your deployed backend URL.

## License

[MIT](LICENSE)
# Mingle
