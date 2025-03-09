import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import AddPatient from './components/AddPatient';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App = () => {
    return (
      <Router>
        <Header />
        <Container 
          component="main" 
          maxWidth="xs" 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            flexGrow: 1,
            mt: 4,
            mb: 4
          }}
        >
          <Routes>
            <Route path="/" element={<PatientList />} />
            <Route path="/patient/:id" element={<PatientDetails />} />
            <Route path="/add" element={<AddPatient />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    );
};

export default App;