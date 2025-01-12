import { Box, TextField, Button } from '@mui/material';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

export const ChatInput = ({ input, isLoading, onInputChange, onSend }: ChatInputProps) => (
  <Box sx={{ p: 2, backgroundColor: 'grey.100' }}>
    <Box sx={{ display: 'flex', gap: 1 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
      />
      <Button 
        variant="contained" 
        onClick={onSend}
        disabled={isLoading}
      >
        Send
      </Button>
    </Box>
  </Box>
); 