import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EventPage from './pages/EventPage';
import AttendeesPage from './pages/AttendeesPage';
import './App.css'
import AttendeeRegisterPage from './pages/AttendeeRegisterPage';
import AttendeeDeletePage from './pages/AttendeeDeletePage';
import EventCreatePage from './pages/EventCreatePage';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<EventPage />} />
          <Route path="/events" element={<EventCreatePage />} />
          <Route path="/events/:eventId/attendees" element={<AttendeesPage />} />
          <Route path="/events/:eventId/attendees/register" element={<AttendeeRegisterPage />} />
          <Route path="/events/:eventId/attendees/:attendeeId/delete" element={<AttendeeDeletePage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;