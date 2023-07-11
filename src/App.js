import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [mobile, setMobile] = useState('');
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState('');

  const validateName = () => {
    if (!name.trim()) {
      return 'Name is required';
    }
    if (!/^[A-Za-z]+$/.test(name)) {
      return 'Name should only contain alphabetic characters';
    }
    return '';
  };

  const validateAge = () => {
    const ageNumber = parseInt(age);
    if (!age.trim()) {
      return 'Age is required';
    }
    if (isNaN(ageNumber) || ageNumber <= 0) {
      return 'Age should be a positive integer';
    }
    return '';
  };

  const validateHeight = () => {
    const heightNumber = parseFloat(height);
    if (!height.trim()) {
      return 'Height is required';
    }
    if (isNaN(heightNumber) || heightNumber <= 0) {
      return 'Height should be a positive number';
    }
    return '';
  };

  const validateWeight = () => {
    const weightNumber = parseFloat(weight);
    if (!weight.trim()) {
      return 'Weight is required';
    }
    if (isNaN(weightNumber) || weightNumber <= 0) {
      return 'Weight should be a positive number';
    }
    return '';
  };

  const validateMobile = () => {
    if (!mobile.trim()) {
      return 'Mobile number is required';
    }
    if (!/^\d{10}$/.test(mobile)) {
      return 'Mobile number should be a 10-digit number';
    }
    return '';
  };

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBMI(bmiValue.toFixed(2));

    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory('Normal');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameError = validateName();
    const ageError = validateAge();
    const heightError = validateHeight();
    const weightError = validateWeight();
    const mobileError = validateMobile();

    if (nameError || ageError || heightError || weightError || mobileError) {
      // Handle validation errors, such as displaying error messages or preventing submission
      return;
    }

    calculateBMI();


  };

  const addData = () =>{
    try{
    const formData = new FormData();
            formData.append('name', name);
            formData.append('age', age);
            formData.append('height', height);
            formData.append('weight', weight);
            formData.append('mobile_number', mobile);
            formData.append('bmi', bmi);
            formData.append('bmi_category', category);
            axios.post('http://127.0.0.1:8000/api/BMIRecord/', formData)
              .then(res => {
                console.log("updated Successfully")
              })
              .catch(error => {
                console.log(error);
              });
            }
            catch(error){
              console.log(error)
            }
          };
  

  return (
    <div className="App">
      <h1>BMI Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {validateName() && <span className="error">{validateName()}</span>}
        </label>
        <label>
          Age:
          <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
          {validateAge() && <span className="error">{validateAge()}</span>}
        </label>
        <label>
          Height (cm):
          <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} />
          {validateHeight() && <span className="error">{validateHeight()}</span>}
        </label>
        <label>
          Weight (kg):
          <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
          {validateWeight() && <span className="error">{validateWeight()}</span>}
        </label>
        <label>
          Mobile Number:
          <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          {validateMobile() && <span className="error">{validateMobile()}</span>}
        </label>
        <button type="submit">Calculate</button>
      </form>
      {bmi && (
        <div>
          <h2>Your BMI: {bmi}</h2>
          <h3>Category: {category}</h3>
          {addData()}
        </div>
      )}
    </div>
  );
};

export default App;
