import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router';

// Validation schema
const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  startDate: yup
    .string()
    .required('Start Date is required'),
  endDate: yup
    .string()
    .required('End Date is required'),
  location: yup
    .string()
    .required('Location is required'),
  capacity: yup
    .number()
    .required('Capacity is required'),
});

const EventCreatePage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      startDate: '2025-01-17 09:00:00',
      endDate: '2025-01-17 17:00:00',
      location: '',
      capacity: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Make a POST request to the API
        await axios.post(`http://127.0.0.1:8000/api/events`, values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        navigate(`/`);
      } catch (error) {
        // TODO handle errors from API
        console.error('Error creating new event:', error);
        alert('Failed to create new event');
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Event
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
              id="startDate"
              name="startDate"
              label="Start Date"
              variant="outlined"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.startDate && Boolean(formik.errors.startDate)}
              helperText={formik.touched.startDate && formik.errors.startDate}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              id="endDate"
              name="endDate"
              label="End Date"
              variant="outlined"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.endDate && Boolean(formik.errors.endDate)}
              helperText={formik.touched.endDate && formik.errors.endDate}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              id="location"
              name="location"
              label="Location"
              variant="outlined"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              id="capacity"
              name="capacity"
              label="Capacity"
              type="number"
              variant="outlined"
              value={formik.values.capacity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.capacity && Boolean(formik.errors.capacity)}
              helperText={formik.touched.capacity && formik.errors.capacity}
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

export default EventCreatePage;
