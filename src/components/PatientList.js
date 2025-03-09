import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography, Box, Card, CardContent, IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import usePatients from '../hooks/usePatients';

const PatientList = () => {
  const [name, setName] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { patients, loading, error, fetchPatients, deletePatient } = usePatients();

  const handleSearch = () => {
    fetchPatients(name);
};
  
  const handleDelete = async (patientId) => {
    try {
      await deletePatient(patientId);
      setSnackbarMessage('Patient deleted successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting patient:", error);
      setSnackbarMessage('Error deleting patient.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Search for Patients
      </Typography>
      <TextField
        label="Search Patients by Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Button variant="contained" onClick={handleSearch} sx={{ mr: 2 }}>
          Search
        </Button>
        <Button variant="contained" component={Link} to="/add">
          Add Patient
        </Button>
      </Box>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {patients.map((patient) => (
          <Card 
            key={patient.resource.id} 
            sx={{ 
              width: '100%', 
              maxWidth: 400, 
              margin: '10px', 
              transition: '0.3s', 
              position: 'relative',
              '&:hover': {
                boxShadow: 3,
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <CardContent>
              <IconButton 
                aria-label="delete" 
                onClick={() => handleDelete(patient.resource.id)} 
                sx={{ position: 'absolute', top: 8, right: 8 }}
              >
                <DeleteIcon />
              </IconButton>
              <Link to={`/patient/${patient.resource.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h6">
                  {patient.resource.name?.[0]?.given?.join(' ') || 'Unknown'} {patient.resource.name?.[0]?.family || 'Unknown'}
                </Typography>
                <Typography variant="body2">
                  Gender: {patient.resource.gender || 'Unknown'}
                </Typography>
                <Typography variant="body2">
                  Birth Date: {patient.resource.birthDate || 'Unknown'}
                </Typography>
              </Link>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
};

export default PatientList;