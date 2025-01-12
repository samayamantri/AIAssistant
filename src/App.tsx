import { Container } from '@mui/material';
import { ChatContainer } from './components/Chat/ChatContainer';

function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <ChatContainer />
    </Container>
  );
}

export default App; 