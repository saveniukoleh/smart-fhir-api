import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import usePatients from '../hooks/usePatients';

const AddPatient = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { addPatient } = usePatients();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameParts = name.split(' ');
    const familyName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : nameParts[0];
    const givenName = nameParts[0];
    const patientData = {
      resourceType: "Patient",
      name: [{ family: familyName, given: [givenName] }],
      gender: gender.toLowerCase(),
      birthDate: birthDate,
    };
    try {
      await addPatient(patientData);
      setSnackbarMessage('Patient added successfully!');
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error("Error adding patient:", error);
      setSnackbarMessage('Error adding patient.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>Add New Patient</Typography>
      <TextField 
        label="Full Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        fullWidth 
        sx={{ mb: 2 }} 
      />
      <TextField 
        label="Gender" 
        value={gender} 
        onChange={(e) => setGender(e.target.value)} 
        fullWidth 
        sx={{ mb: 2 }} 
      />
      <Typography variant="body1" sx={{ mb: 1, ml: 1, textAlign: 'left', width: '100%' }}>
        Birth Date
      </Typography>
      <TextField 
        value={birthDate} 
        type="date" 
        onChange={(e) => setBirthDate(e.target.value)} 
        fullWidth 
        sx={{ mb: 2 }} 
      />
      <Button type="submit" variant="contained">Add Patient</Button>
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
export default AddPatient;