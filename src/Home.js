import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditPatient from './EditPatient';
import "./App.css";

const Home = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null); // Initialize with null
  const [editPatientId, setEditPatientId] = useState(null);

  useEffect(() => {
    const fetchPatientAndDoctors = async () => {
      try {
        const patientsResponse = await axios.get("http://restdemo01-env.eba-hfs4hmkf.ap-south-1.elasticbeanstalk.com/patient");
        const doctorsResponse = await axios.get("http://restdemo01-env.eba-hfs4hmkf.ap-south-1.elasticbeanstalk.com/doctor");
        setPatients(patientsResponse.data);
        setDoctors(doctorsResponse.data); 
        console.log("doctor data from home", doctorsResponse.data);
      } catch (error) {
        console.error("error fetching data: ", error);
      }
    };
    fetchPatientAndDoctors();
  }, []);

  const handleDoctorChange = (event) => {
    const selectedDoctorId = event.target.value === "all" ? null : parseInt(event.target.value);
    setSelectedDoctorId(selectedDoctorId);
  };

  const filteredPatients = selectedDoctorId
    ? patients.filter(patient => patient.doctor?.id === selectedDoctorId)
    : patients;
    
  console.log("filtered patients", filteredPatients, selectedDoctorId);

  const handleEdit = (patientId) => {
    setEditPatientId(patientId);
  };

  const handleCloseEdit = () => {
    setEditPatientId(null);
  };
  const handleUpdate = (updatedPatient) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
    setEditPatientId(null);
  };

  const handleDelete = async (patientId) => {
    try {
      await axios.delete(`http://restdemo01-env.eba-hfs4hmkf.ap-south-1.elasticbeanstalk.com/patient/${patientId}`);
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== patientId));
    } catch (error) {
      console.error("error deleting patient: ", error);
    }
  };
  

  return (
    <center>
      <div>
        <h2>Patients</h2>
        <label className='selectDoctor'>Select Doctor: </label>
        <select onChange={handleDoctorChange} defaultValue="all">
          <option value="all">All Doctors</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.specialization}
            </option>
          ))}
        </select>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Weight</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Disease</th>
              <th>Doctor</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.weight}</td>
                <td>{patient.gender}</td>
                <td>{patient.age}</td>
                <td>{patient.disease}</td>
                <td>
                  {patient.doctor?.name ? patient.doctor.name : 'Unknown Doctor'} - 
                  {patient.doctor?.specialization ? patient.doctor.specialization : 'Unknown Specialization'}
                </td>
                <td>
                  <button onClick={() => handleEdit(patient.id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(patient.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editPatientId !== null && (
          <EditPatient
            patientId={editPatientId}
            onClose={handleCloseEdit}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </center>
  );
};

export default Home;
