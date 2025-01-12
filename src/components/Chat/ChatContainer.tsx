import { Paper, Box, Typography, CircularProgress } from '@mui/material';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChat } from '../../hooks/useChat';

export const ChatContainer = () => {
  const {
    messages,
    input,
    isLoading,
    messagesEndRef,
    handleInputChange,
    handleSend
  } = useChat();

  return (
    <Paper elevation={3} sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
        <Typography variant="h6">AI Assistant Chat</Typography>
      </Box>

      <Box sx={{ 
        flex: 1, 
        overflow: 'auto', 
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        onSend={handleSend}
      />
    </Paper>
  );
}; 