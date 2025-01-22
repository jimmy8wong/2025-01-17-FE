import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useParams, useNavigate } from 'react-router';

// Validation schema
const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

const AttendeeRegisterPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Make a POST request to the API
        await axios.post(`http://127.0.0.1:8000/api/events/${eventId}/attendees`, values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        navigate(`/events/${eventId}/attendees`);
      } catch (error) {
        // TODO handle errors from API
        console.error('Error registering attendee:', error);
        alert('Failed to register attendee');
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Register New Attendee
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid size={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AttendeeRegisterPage;
