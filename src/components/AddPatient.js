import React, { useState } from "react";
import { usePatients } from "../hooks/usePatients";
import { Button, TextField } from "@mui/material";

const AddPatient = () => {
  const { addPatient } = usePatients();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const patientData = {
      resourceType: "Patient",
      name: [{ family: name.split(" ")[1], given: [name.split(" ")[0]] }],
      gender,
      birthDate,
    };
    addPatient(patientData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
      />
      <TextField
        label="Birth Date"
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        required
      />
      <Button type="submit" variant="contained">
        Add Patient
      </Button>
    </form>
  );
};

export default AddPatient;
