import { Box, Typography } from '@mui/material';

interface ChatMessageProps {
  text: string;
  sender: 'user' | 'assistant';
}

export const ChatMessage = ({ text, sender }: ChatMessageProps) => (
  <Box
    sx={{
      alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
      backgroundColor: sender === 'user' ? 'primary.light' : 'grey.100',
      color: sender === 'user' ? 'white' : 'black',
      p: 2,
      borderRadius: 2,
      maxWidth: '70%'
    }}
  >
    <Typography>{text}</Typography>
  </Box>
); 