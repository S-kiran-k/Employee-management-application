import { useState } from 'react';
import axios from 'axios';

function EmployeeForm (){
  const [formData, setFormData] = useState({
    name: '',
    employee_id: '',
    department: '',
    dob: '',
    gender: '',
    designation: '',
    salary: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/employees', formData)
      .then(response => {
        console.log('Response:', response);
        alert('Employee added successfully!');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error occurred while adding employee!');
      });
  };

  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
      <label htmlFor='empname'>Employee Name</label><br/>
      <input type="text" name="name" id ="empname" placeholder="Employee Name" onChange={handleChange}/><br/>
      <label htmlFor='empid'>Employee Name</label><br />
      <input type="text" name="employee_id" id ="empid" placeholder="Employee ID" onChange={handleChange} /><br/>
      <label htmlFor='depart'>Department</label><br />
      <select name="department" id="depart" onChange={handleChange}>
        <option value="">Select Department</option>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
      </select><br/>
      
        <label htmlFor='dateofbirth'>Date Of Birth</label><br />
        <input type="date" id="dateofbirth" name="dob" onChange={handleChange} /><br />
        <label>Gender</label><br />
        <label htmlFor='male'>Male</label>
        <input type="radio" name="gender" id="male" value="Male" onChange={handleChange} /><br />
        <label htmlFor='female'>Female</label>
        <input type="radio" name="gender" value="Female" onChange={handleChange} /><br />
        <label htmlFor='design'>Designation</label><br />
        <input type="text" name="designation" id="design" placeholder="Designation" onChange={handleChange} /><br />
        <label htmlFor='Salary'>Salary</label><br />
        <input type="number" id="Salary" name="salary" placeholder="Salary" onChange={handleChange} /><br />
        <button type="submit">Submit</button><br />
    </form>
    </div>
  );
}

export default EmployeeForm;
