import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientList from "./components/PatientList";
import PatientDetails from "./components/PatientDetails";
import AddPatient from "./components/AddPatient";

const App = () => {
  return (
    <Router>
      <div>
        <h1>SMART FHIR API</h1>
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/patient/:id" element={<PatientDetails />} />
          <Route path="/add" element={<AddPatient />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
