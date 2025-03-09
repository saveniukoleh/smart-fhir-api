import { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://r4.smarthealthit.org';

const usePatients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPatients = async (name) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${BASE_URL}/Patient?name=${name}`);
            setPatients(response.data.entry || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addPatient = async (patientData) => {
        const data = JSON.stringify(patientData);
        try {
            await axios.post(`${BASE_URL}/Patient`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            fetchPatients('');
        } catch (err) {
            setError(err.message);
        }
    };

    const deletePatient = async (patientId) => {
        try {
            await axios.delete(`${BASE_URL}/Patient/${patientId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setPatients((prev) => prev.filter((patient) => patient.resource.id !== patientId));
        } catch (err) {
            setError(err.message);
        }
    };

    return { patients, loading, error, fetchPatients, addPatient, deletePatient };
};

export default usePatients;