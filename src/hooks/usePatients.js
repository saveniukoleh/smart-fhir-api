import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://r4.smarthealthit.org/Patient";

export const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchPatients = async (name) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}?name=${name}`);
      setPatients(response.data.entry || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const addPatient = async (patientData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(BASE_URL, patientData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Optionally refresh the patient list after adding
      await searchPatients(""); // or any name to refresh
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { patients, loading, error, searchPatients, addPatient };
};
