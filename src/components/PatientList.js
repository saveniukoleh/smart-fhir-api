import React, { useState } from "react";
import { usePatients } from "../hooks/usePatients";
import { Button, TextField, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const PatientList = () => {
  const { patients, loading, error, searchPatients } = usePatients();
  const [name, setName] = useState("");
  const handleSearch = () => {
    searchPatients(name);
  };

  return (
    <div>
      <TextField
        label="Search by Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={handleSearch} variant="contained">
        Search
      </Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <List>
        {patients.map((patient) => (
          <ListItem
            button
            component={Link}
            to={`/patient/${patient.resource.id}`}
            key={patient.resource.id}
          >
            <ListItemText
              primary={
                patient.resource.name[0].given.join(" ") +
                " " +
                patient.resource.name[0].family
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PatientList;
