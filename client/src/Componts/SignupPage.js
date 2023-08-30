import React, {useContext, useState} from 'react'
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom'
import NavBar from "./NavBar"
const initialState = {
    name:"",
    username: '',
    password: '',
  };
const baseurl = "http://127.0.0.1:5555"

const SignUpPage = () => {
  const [formData, setFormData] = useState(initialState);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  // useHistory to manage navigation
  const navigate = useNavigate();

  const signUpUser = (loginInfo) => {
    const postRequest = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(loginInfo),
    };
    fetch(baseurl + '/signup', postRequest)
    .then((r) => {
      if (!r.ok) {
        throw new Error('Signup request failed with status: ' + r.status);
      }
      return r.json();
    })
    .then((responseData) => {
      // Check if responseData contains an "error" field indicating a signup error
      if (responseData.error) {
        throw new Error('Signup failed: ' + responseData.error);
      }
  
      setCurrentUser(responseData);
      console.log(responseData);
  
      // Redirect to the login page after successful signup
      navigate('/');
    })
    .catch((error) => {
      console.error('An error occurred:', error);;
        alert('Signup failed: ' + error.message);
      })
  };


  const updateFormData = (e) => {
    const { name, value } = e.target;
    const changeFormData = { ...formData, [name]: value };
    setFormData(changeFormData);
  };

  return (
    
    <div>
      <NavBar     currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <h1>SIGNUP HERE</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signUpUser(formData);
          setFormData(initialState);
        }}
      >
       <div>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={updateFormData}
            name="username"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={updateFormData}
            name="password"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={updateFormData}
            name="name"
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;