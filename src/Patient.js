import React,{ useState } from "react";
import axios from "axios";

const PatientForm = () => {
  const [patientData, setPatientData] = useState({
    name:"",
    weight:"",
    gender:"",
    age:"",
    disease:"",
    doctor:{
      id:0
    }
  })

  const handleChange = (e) => {
    const{name,value} = e.target;
    if (name === 'doctorId') {
      setPatientData({ ...patientData, doctor: { ...patientData.doctor, id: value } });
    } else {
      setPatientData({ ...patientData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post("http://restdemo01-env.eba-hfs4hmkf.ap-south-1.elasticbeanstalk.com//patient",patientData);
      console.log("Patient Created : ",response.data);
    }catch (error){
      console.error("Error Creating patient :",error);
    }
  };

  return (
    <center>
      <div>
        <h2>Create New Patient</h2>
        <form  className="grp" onSubmit={handleSubmit} autoComplete="off">
          <label>
           <span className="form-label"> Name :</span>
            <input type="text" name="name" value={patientData.name} onChange={handleChange} required/>
          </label>
          <br/>
          <label>
          <span className="form-label"> Weight :</span>
            <input type="text" name="weight" value={patientData.weight} onChange={handleChange} required/>
          </label>
          <br/>
          <label>
          <span className="form-label"> Gender :</span>
            <input type="text" name="gender" value={patientData.gender} onChange={handleChange} required/>
          </label>
          <br/>
          <label>
          <span className="form-label"> Age :</span>
            <input type="text" name="age" value={patientData.age} onChange={handleChange} required/>
          </label>
          <br/>
          <label>
          <span className="form-label"> Disease :</span>
            <input type="text" name="disease" value={patientData.disease} onChange={handleChange} required/>
          </label>
          <br/>
          <label>
          <span className="form-label"> DoctorId :</span>
            <input type="text" name="doctorId" value={patientData.doctor.id} onChange={handleChange} required/>
          </label>
          <br/>
          <button type="submit">Create Patient</button>
        </form>
      </div>
    </center>
  )
};
export default PatientForm;