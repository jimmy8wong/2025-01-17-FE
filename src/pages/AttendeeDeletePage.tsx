import { useFormik } from 'formik';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ButtonWithLink from '../components/ButtonWithLink';
import { useParams, useNavigate } from 'react-router';

const AttendeeDeletePage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { attendeeId } = useParams<{ attendeeId: string }>();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      try {
        // Make a DELETE request to the API
        await axios.delete(`http://127.0.0.1:8000/api/events/${eventId}/attendees/${attendeeId}`);

        navigate(`/events/${eventId}/attendees`);
      } catch (error) {
        // TODO handle errors
        console.error('Error creating user:', error);
        alert('Failed to create user');
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Are you sure you want to delete this attendee?
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Button color="error" variant="contained" fullWidth type="submit">
              Yes, delete this attendee
            </Button>
          </Grid>
          <Grid size={12}>
            <ButtonWithLink to={`/events/${eventId}/attendees`} label="Nope, I changed my mind" fullWidth />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AttendeeDeletePage;
