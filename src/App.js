import React, { useState, useRef, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/chat', {
        message: userMessage
      });

      setMessages(prev => [...prev, { 
        text: response.data.response, 
        sender: 'assistant' 
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: 'Sorry, there was an error processing your message.', 
        sender: 'assistant' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
        {/* Chat Header */}
        <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
          <Typography variant="h6">AI Assistant Chat</Typography>
        </Box>

        {/* Messages Area */}
        <Box sx={{ 
          flex: 1, 
          overflow: 'auto', 
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: message.sender === 'user' ? 'primary.light' : 'grey.100',
                color: message.sender === 'user' ? 'white' : 'black',
                p: 2,
                borderRadius: 2,
                maxWidth: '70%'
              }}
            >
              <Typography>{message.text}</Typography>
            </Box>
          ))}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress />
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <Box sx={{ p: 2, backgroundColor: 'grey.100' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button 
              variant="contained" 
              onClick={handleSend}
              disabled={isLoading}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default App; 