import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from '@mui/material';
import axios from 'axios';
import ButtonWithLink from '../components/ButtonWithLink';
import { useParams } from 'react-router';

// Define the type for the API response data
interface Attendees {
  id: number;
  name: string;
  email: string;
}

interface Event {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  capacity: number;
  attendees: Attendees[]
}

const fetchEventById = async (eventId: string): Promise<Event> => {
  const { data } = await axios.get(`http://127.0.0.1:8000/api/events/${eventId}`);
  return data;
};

const AttendeesPage: React.FC = () => {
  // Use React Query to fetch data
  const { eventId } = useParams<{ eventId: string }>();
  const { data, isLoading, error } = useQuery(['event', eventId], () => fetchEventById(eventId!), {
    enabled: !!eventId, // Only fetch if eventId is available
  });

  // Display loading spinner if the data is loading
  if (isLoading) {
    return <CircularProgress />;
  }

  // Display error message if there's an error
  if (error) {
    return (
      <Typography color="error">
        An error occurred while fetching data.
      </Typography>
    );
  }

  return (
    <div>
      <div>
        <h1>{data?.name}</h1>
        <p>{data?.description}</p>
        <p>Start Date: {data?.startDate}</p>
        <p>End Date: {data?.endDate}</p>
        <p>Location: {data?.location}</p>
        <p>Capacity: {data?.capacity}</p>
        <p>
          <ButtonWithLink to={`/events/${data?.id}/attendees/register`} label="Register Attendee" color="secondary" />
        </p>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.attendees.map((attendee) => (
              <TableRow key={attendee.id}>
                <TableCell>{attendee.id}</TableCell>
                <TableCell>{attendee.name}</TableCell>
                <TableCell>{attendee.email}</TableCell>
                <TableCell>
                  <ButtonWithLink to={`/events/${data?.id}/attendees/${attendee.id}/delete`} label="Delete" color="error" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AttendeesPage;

