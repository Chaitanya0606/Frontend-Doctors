import React,{useState, useEffect } from "react";
import axios from "axios";

const EditPatient = ({ patientId, onClose , onUpdate}) => {
  const[patientData,setPatientData] = useState({});
  console.log("Patient ID",patientId);

  useEffect(() => {
    //get
    if (!patientId) return;
    console.log("Patient",patientId);
    const fetchPatientData = async () => {
      try{
        const response = await axios.get(`http://restdemo01-env.eba-hfs4hmkf.ap-south-1.elasticbeanstalk.com//patient/${patientId}`);
        console.log("fetching before edit",response)
        setPatientData(response.data);
       
      }catch(error){
        console.error('Error fetching patient Data for Editing :',error);
        setPatientData(error.response.data);
      }
    };

    fetchPatientData();
  },[patientId]);

  const handleUpdate = async () => {
    try{
      const response=await axios.put(`http://restdemo01-env.eba-hfs4hmkf.ap-south-1.elasticbeanstalk.com//patient/${patientId}`,patientData);
      onUpdate(response.data);
      onClose();
      
       
    }catch (error){
      console.error("error updating patient :",error);
    }
  }

  const handleChange = (e) => {
    const{name,value} = e.target;
    setPatientData({...patientData,[name]:value});
  };

  return(
    <div>
      <h2>Edit Patient</h2>
    {console.log("patientData",patientData)}
      <label>Name :</label>
      <input type="text" name="name" value={patientData.name || ""} onChange={handleChange}/>

      <label>Weight :</label>
      <input type="text" name="weight" value={patientData.weight || ""} onChange={handleChange}/>

      <label>Gender :</label>
      <input type="text" name="gender" value={patientData.gender || ""} onChange={handleChange}/>

      <label>Age :</label>
      <input type="text" name="age" value={patientData.age || ""} onChange={handleChange}/>

      <label>Disease :</label>
      <input type="text" name="disease" value={patientData.disease || ""} onChange={handleChange}/>
      <br/>

      {/* <label>DoctorId :</label>
      <input type="text" name="name" value={patientData.doctorid || ""} onChange={handleChange}/> */}

        <div className="update-grp">
          <button onClick={handleUpdate} className="update-btn">Update</button>
          <button onClick={onClose}>Cancel</button>
        </div>

      
    </div>
  )

};

export default EditPatient;