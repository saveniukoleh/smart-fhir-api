import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `https://r4.smarthealthit.org/Patient/${id}`
        );
        setPatient(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPatientDetails();
  }, [id]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div>
      <h2>
        {patient.name[0].given.join(" ")} {patient.name[0].family}
      </h2>
      <p>Gender: {patient.gender}</p>
      <p>Birthdate: {patient.birthDate}</p>
    </div>
  );
};

export default PatientDetails;
