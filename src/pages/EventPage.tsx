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
  Box,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';
import ButtonWithLink from '../components/ButtonWithLink';

// Define the type for the API response data
interface Event {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  capacity: number;
  totalAttendees: number;
}

const fetchEvents = async (): Promise<Event[]> => {
  const { data } = await axios.get('http://127.0.0.1:8000/api/events');
  return data;
};

const EventPage = () => {
  // Use React Query to fetch data
  const { data, isLoading, error } = useQuery<Event[]>(['events'], fetchEvents);

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
      <Grid container justifyContent="flex-end">
        <ButtonWithLink to={`/events`} label="Create Event" />
      </Grid>

      <Box sx={{ m: 2 }} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Dates</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Total Attendees</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.id}</TableCell>
                <TableCell>{event.name}</TableCell>
                <TableCell>
                  <p><b>Start:</b> {event.startDate}</p>
                  <p><b>End:</b> {event.endDate}</p>
                </TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.capacity}</TableCell>
                <TableCell>{event.totalAttendees}</TableCell>
                <TableCell>
                  <p>
                    <ButtonWithLink to={`/events/${event.id}/attendees`} label="View Attendees" fullWidth />
                  </p>
                  <p>
                    <ButtonWithLink to={`/events/${event.id}/attendees/register`} label="Register Attendee" color="secondary" fullWidth />
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EventPage;

