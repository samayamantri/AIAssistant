# AI Assistant Chat Application

A modern chat application built with React and Python, featuring a responsive UI and AI-powered responses using the Anthropic Claude model.

## Features

- 🤖 AI-powered chat interface using Claude 2.1
- 💬 Real-time chat with streaming responses
- 🎨 Modern UI built with Material-UI
- 🔄 TypeScript support for better development experience
- 🌐 Modular architecture with React components
- 🔌 Module Federation for micro-frontend support
- 🚀 Hot reload development environment

## Tech Stack

### Frontend
- React 18
- TypeScript
- Material-UI
- Webpack 5 with Module Federation
- Axios for API calls

### Backend
- Python Flask server
- Phi framework for AI integration
- Anthropic Claude 2.1 model
- CORS support for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- Python 3.8 or higher
- Anthropic API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/samayamantri/AIAssistant.git
cd AIAssistant
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
pip install flask flask-cors phi-python python-dotenv anthropic
```

4. Create a `.env` file in the root directory and add your Anthropic API key:
```
ANTHROPIC_API_KEY=your_api_key_here
```

## Running the Application

1. Start the frontend development server:
```bash
npm start
```
The frontend will be available at `http://localhost:3000`

2. Start the backend server:
```bash
python app.py
```
The backend will run on `http://localhost:5000`

## Development

- Frontend code is in the `src` directory
- Backend code is in the root directory (`app.py` and `assistant.py`)
- Use `npm run type-check` to check TypeScript types
- Use `npm run build` for production builds

## Project Structure

```
├── src/
│   ├── components/
│   │   └── Chat/
│   │       ├── ChatContainer.tsx
│   │       ├── ChatInput.tsx
│   │       └── ChatMessage.tsx
│   ├── hooks/
│   │   └── useChat.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── index.tsx
├── public/
│   └── index.html
├── app.py
├── assistant.py
└── package.json
```

## Features in Detail

### Chat Interface
- Real-time message updates
- Smooth message scrolling
- Loading indicators
- Error handling
- Enter key support for sending messages

### AI Integration
- Powered by Claude 2.1 model
- Streaming responses
- Configurable AI assistant personality
- Error handling for API failures

### UI/UX
- Responsive design
- Material Design components
- User/Assistant message differentiation
- Clean and modern interface

## License

MIT 