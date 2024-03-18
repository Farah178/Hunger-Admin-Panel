import React, { useState } from 'react'
import './styles.css'
import InputField from '../../components/Input/InputField';
import signin_logo from '../../images/signin-logo.jpg';
import logo from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLoginInfo } from '../../redux/actions/dataActions';
import { useDispatch } from 'react-redux';



const showToast = (message, type = 'info') => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    default:
      toast.info(message);
  }
};

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  // Callback function to handle input change and update formData state
  const handleInputChange = (inputData) => {
    console.log(inputData, 'inputData=====>')
    setFormData(inputData);
  };
  const inputsData = [
    { name: 'Email Address', placeholder: 'Email Address', width: '100%' },
    { name: 'Password', placeholder: 'Password', width: '100%' },
    // Add more input data objects as needed
  ];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  // const handleSignIn = async () => {
  //   try {
  //     const response = await axios.post("http://127.0.0.1:8000/api/login", {
  //       email: email,
  //       password: password
  //     });

  //     console.log(response.data); 
     
  //     navigate('/dashboard'); 

  //   } catch (error) {
  //     console.error(error);
     
  //   }
  // }

  const handleSign = () => {
    navigate('/');
  };

  const page = "Dashboard";

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('values');
    console.log('handleSubmit==>');
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: values.email,
        password: values.password
      });

      dispatch(setLoginInfo(response.data));
      console.log(response.data); 

      navigate('/'); 
      showToast('Logged in successfully!', 'success'); 

    } catch (error) {
      console.error(error.response); // Log the error response
      if (error.response && error.response.status === 401) {
        showToast('Invalid email or password. Please try again.', 'error'); 
      } else {
        showToast('An error occurred. Please try again later.', 'error');
      }
    }
  
    setSubmitting(false);
  };
 
  

  return (
    <div className='signin-body'>
    <div className='sigin-image'>
      <img
        // className="logo-icon"
        loading="eager"
        alt=""
        src={logo}
      />
    </div>
    <Formik
    enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form className="my-form-signin">
          <div className="login-welcome-row">
            <div className='heading-signin'>SignIn &#x1F44F;</div>
            <div className='sub-heading-signin'> A few more questions to better communicate with you!</div>
          </div>
          <div className="input__wrapper_signin">
            <div className="input__wrapper" style={{ width: "100%" }}>
              <Field
                type="text"
                placeholder="Email"
                className={`input__field ${errors.email && touched.email ? 'error' : ''}`}
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "100%" }}
              />
              <label htmlFor="email" className="input__label">Email<span style={{ color: 'red' }}> *</span></label>
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="input__wrapper" style={{ width: "100%" }}>
              <Field
                type="password"
                placeholder="Password"
                className={`input__field ${errors.password && touched.password ? 'error' : ''}`}
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "100%" }}
              />
              <label htmlFor="password" className="input__label">Password<span style={{ color: 'red' }}> *</span></label>
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <button type="submit" className="my-form__button" disabled={isSubmitting}>
              Sign in
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default SignIn
