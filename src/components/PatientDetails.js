import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography } from '@mui/material';

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`https://r4.smarthealthit.org/Patient/${id}`);
        const data = await response.json();
        setPatient(data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
    fetchPatientDetails();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: '100%', maxWidth: 400, p: 2 }}>
        <CardContent sx={{ position: 'relative' }}>
          <Typography variant="h4" gutterBottom>
            {patient.name?.[0]?.given?.join(' ') || 'Unknown'} {patient.name?.[0]?.family || 'Unknown'}
          </Typography>
          <Typography variant="body1">
            <strong>Gender:</strong> {patient.gender || 'Unknown'}
          </Typography>
          <Typography variant="body1">
            <strong>Birth Date:</strong> {patient.birthDate || 'Unknown'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientDetails;