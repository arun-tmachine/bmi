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
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return 'Mobile number should start with 6, 7, 8, or 9 and have 10 digits';
    }
    return '';
  };
  
  const renderImage = () => {
    if (category === 'Underweight') {
      return <img src="https://img.freepik.com/free-vector/woman-hugging-herself-character_40876-2891.jpg?w=740&t=st=1689103128~exp=1689103728~hmac=a13d557b7240f4a49101008ee1455d0568881777ba25a3f6facaa94f392e0e36" alt="Underweight" />;
    } else if (category === 'Normal') {
      return <img src="https://img.freepik.com/free-vector/hand-drawn-health-illustration_23-2150074493.jpg?w=740&t=st=1689103262~exp=1689103862~hmac=9ae3f604387126e1eb15e4c5307278c37c37704ef36715bbe6a0c31fdd0eb3c5" alt="Normal" />;
    } else if (category === 'Overweight') {
      return <img src="https://img.freepik.com/free-vector/overweight-man-sitting-isolated_1308-133748.jpg?w=740&t=st=1689103212~exp=1689103812~hmac=ef9840ad6d768d24799051052396c2a9ad2831402c24d895c11d9a980512d1a1" alt="Overweight" />;
    } else if (category === 'Obese') {
      return <img src="https://img.freepik.com/free-vector/fat-lady-checking-weight_1308-22249.jpg?w=360&t=st=1689103175~exp=1689103775~hmac=1cb222ca9dda603239a21f60399e17daae9d33308c08af26ca3d68d1eb841ff5" alt="Obese" />;
    } else {
      return null;
    }
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
          {renderImage()}
        </div>
      )}
    </div>
  );
};

export default App;
