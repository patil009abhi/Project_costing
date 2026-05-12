import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [project, setProject] = useState({
    project_name: '',
    client_name: '',
    cement_cost: '',
    steel_cost: '',
    labor_cost: ''
  });

  const [projects, setProjects] = useState([]);

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    });
  };

  const addProject = async () => {

    try {

      await axios.post(
        'http://localhost:5000/add-project',
        project
      );

      alert('Project Added Successfully');

      fetchProjects();

    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {

    try {

      const response = await axios.get(
        'http://localhost:5000/projects'
      );

      setProjects(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (

    <div className="container">

      <h1>Civil Estimation & Costing App</h1>

      <div className="form-container">

        <input
          type="text"
          name="project_name"
          placeholder="Project Name"
          onChange={handleChange}
        />

        <input
          type="text"
          name="client_name"
          placeholder="Client Name"
          onChange={handleChange}
        />

        <input
          type="number"
          name="cement_cost"
          placeholder="Cement Cost"
          onChange={handleChange}
        />

        <input
          type="number"
          name="steel_cost"
          placeholder="Steel Cost"
          onChange={handleChange}
        />

        <input
          type="number"
          name="labor_cost"
          placeholder="Labor Cost"
          onChange={handleChange}
        />

        <button onClick={addProject}>
          Add Project
        </button>

      </div>

      <div className="project-list">

        <h2>Project Estimations</h2>

        {
          projects.map((item) => (

            <div className="card" key={item.id}>

              <h3>{item.project_name}</h3>

              <p>Client: {item.client_name}</p>

              <p>Cement Cost: ₹{item.cement_cost}</p>

              <p>Steel Cost: ₹{item.steel_cost}</p>

              <p>Labor Cost: ₹{item.labor_cost}</p>

              <h4>Total Cost: ₹{item.total_cost}</h4>

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default App;