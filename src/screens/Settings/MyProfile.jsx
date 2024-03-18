import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../../screens/Dashboard/main.css'
import './settings.css'
import { Button } from 'react-bootstrap';
import UpdatedProfileButton from './UpdatedProfileButton';
import InputField from '../../components/Input/InputField';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { convertToBase64 } from '../../utils/Appconstants';
import { API } from '../../api/api';
import * as Yup from 'yup';
import { setAdminUserdata } from '../../redux/actions/dataActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyProfile() {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = React.useState('');
  const [formData, setFormData] = useState({});
  const [isValidForm, setIsValidForm] = useState(false); // State variable to store isValid value
  const [profileinitialData, setProfileInitialData] = useState({ profile_img:null,email: '',firstName: '',lastName: '',phone: ''});
  const login_info = useSelector(state => state.data.login_data);
  // const cuserData = useSelector(state => state.data.admin_profile_data);

  useEffect(() => {
    GetAdminUserData()
  }, []);
  const [cuserData, setcuserData] = useState({});

  // Callback function to handle input change and update formData state
  const handleInputChange = (inputData) => {
    console.log(inputData, 'inputData=====>')
    setFormData(inputData);
  };

  const handleIconClick = () => {
    // Trigger click event on the file input element
    document.getElementById('fileInput').click();
  };

  const GetAdminUserData = async () => {

    console.log(login_info,'login_info===')
    // console.log('GetMenuData')
    API.getInstance().menu.get(`/api/admin-profile?id=${login_info.user_id}`)
      .then((res) => {
        const res_data = res.data.result.data
        setcuserData(res.data.result.data)
        // console.log(res.data.result.data, 'GetAdminUserData=res111====>')
        dispatch(setAdminUserdata(res.data.result.data));

        const profile_data = { profile_img:res_data.profile_img, email:res_data.email_id, firstName:res_data.f_name, lastName:res_data.l_name, phone:res_data.phone_number}
        // console.log(profile_data,'profile_data===>')
        setProfileInitialData(profile_data)

        
      })
      .catch((error) => {
        // // console.log(error, 'GetMenuData');
      })
      .finally(() => {

      });
  }


  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
     
      console.log(values.profile_img, 'values.profile_img======>')
      if (values.profile_img instanceof Blob) {
          const base64Image = await convertToBase64(values.profile_img);
          values.profile_img = base64Image;
      }
      console.log(values, 'values======>')
      console.log(values,'values======>')
      setSubmitting(false)
        API.getInstance().menu.put(`/api/admin-profile/${login_info.user_id}`,values)
        .then((res) => {
          console.log(res, 'res===================')
          GetAdminUserData()
        })
        .catch((error) => {
        })
        }
    catch (error) {
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phone: Yup.string().required('Phone number is required'),
  })

  const passvalidationSchema = Yup.object().shape({
    old_password: Yup.string().required('Old password is required'),
    new_password: Yup.string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters long'),
    confirm_password: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('new_password'), null], 'Passwords must match'),
  })

  // Inside your component
const handleUpdateProfile = () => {
  // Your logic to update the profile
  
  // Assuming the profile is successfully updated
  toast.success('Profile updated successfully!', {
    position: 'top-center'
  });
};
// console.log(profileinitialData,'profileinitialDa=====')
  return (
    <main id="main" className='main'>

    <Card className="overflow-auto card-custom">
      <Card.Body>
        <Formik
        enableReinitialize
          initialValues={{ profile_img:cuserData.profile_img, email:cuserData.email_id, firstName:cuserData.f_name, lastName:cuserData.l_name, phone:cuserData.phone_number}}
          onSubmit={handleSubmit}
          validateOnChange={true} // Validate on change to update isValidForm state
          validateOnBlur={false} // Disable onBlur validation to prevent unexpected form state changes
          validate={(values) => {
            // Manually validate the form on change
            validationSchema.validate(values)
              .then(() => setIsValidForm(true))
              .catch(() => setIsValidForm(false));
          }}
        >
          {({  values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting}) => (
            <Form onSubmit={handleSubmit}>
              {/* First row with two cards */}
              <Row className="g-3">
                <Col md={6}>
                  <Card className='Card'>
                    <div className="card-content">
                      <div className="profile-picture-upload" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15vh' }}>
                      <input 
                          type="file" 
                          id="fileInput" 
                          style={{ display: 'none' }} 
                          onChange={(event) => {

                            const file = event.currentTarget.files[0];
                            setFieldValue("profile_img", file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImageUrl(reader.result);
                            };
                            reader.readAsDataURL(file);
                            
                          }} 
                        />
                        <div className="icon" onClick={handleIconClick}>
                          <img
                            // src={values.profile_img ? URL.createObjectURL(values.profile_img) : 'https://via.placeholder.com/150'}
                            src={imageUrl || values.profile_img || 'https://via.placeholder.com/150'}
                            alt="icon"
                            style={{
                              borderRadius: '50%',
                              width: '100px',
                              height: '100px',
                            }}
                            onError={(e) => {
                              console.log("Error",e)
                              e.target.onerror = null; // Prevent infinite loop
                              e.target.src = 'https://img.freepik.com/free-photo/red-gift-tag-price-ticket-with-red-ribbon-isolated-white_1101-2266.jpg?w=1800&t=st=1707896796~exp=1707897396~hmac=d8cb9dbcb33daebdc61816b0f459a94081c770115bccc6f3047aeeac79359c05';
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="input__wrapper" style={{ width: "100%" }}>
                          <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="input__field"
                            style={{ width: "100%" }}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <label htmlFor="email" className="input__label">Email</label>
                        </div>
                        <div style={{ display: "flex", gap: '10px' }}>
                          <div className="input__wrapper" style={{ width: "50%" }}>
                            <input
                              type="text"
                              name="firstName"
                              placeholder="First Name"
                              className="input__field"
                              style={{ width: "100%" }}
                              value={values.firstName}
                              onChange={handleChange}
                            />
                            <label htmlFor="firstName" className="input__label">First Name</label>
                          </div>
                          <div className="input__wrapper" style={{ width: "50%" }}>
                            <input
                              type="text"
                              name="lastName"
                              placeholder="Last Name"
                              className="input__field"
                              style={{ width: "100%" }}
                              value={values.lastName}
                              onChange={handleChange}
                            />
                            <label htmlFor="lastName" className="input__label">Last Name</label>
                          </div>
                        </div>
                        <div className="input__wrapper" style={{ width: "100%" }}>
                          <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            className="input__field"
                            style={{ width: "100%" }}
                            value={values.phone}
                            onChange={handleChange}
                          />
                          <label htmlFor="phone" className="input__label">Phone</label>
                        </div>
                      </div>
                      <div className="d-grid gap-2">
    <Button
      type="submit"
      className='update-btn'
      size="lg"
      style={{ backgroundColor: 'rgb(180, 49, 45)', color: 'white' }}
      onClick={handleUpdateProfile} // Call your update profile function on button click
    >
      UPDATE PROFILE
    </Button>
  </div>
                    </div>
                  </Card>
                </Col>
                <Col md={6}>
                  {/* Second card content */}
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Card.Body>

      <Card.Body>
        {/* Second row with two cards */}
        <Row className="g-3">
          <Col md={6}>
            <Formik
            enableReinitialize
              initialValues={{'old_password':'',
                'new_password':'',
                'confirm_password':'',}}
              onSubmit={handleSubmit}
              validationSchema={passvalidationSchema}
              validateOnChange={true}
              validateOnBlur={false}
              validate={(values) => {
                // Manually validate the form on change
                passvalidationSchema.validate(values)
                  .then(() => setIsValidForm(true))
                  .catch(() => setIsValidForm(false));
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                <Card className='Card'>
                  <div className="card-content">
                    <div>
                      <div className="input__wrapper" style={{ width: "100%" }}>
                        <input
                          type="password"
                          name="old_password"
                          placeholder="Current Password"
                          className="input__field"
                          style={{ width: "100%" }}
                          value={values.old_password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="old_password" className="input__label">Current Password</label>
                        <ErrorMessage name="old_password" component="div" className="error-message" />
                      </div>
                      <div className="input__wrapper" style={{ width: "100%" }}>
                        <input
                          type="password"
                          name="new_password"
                          placeholder="New Password"
                          className="input__field"
                          style={{ width: "100%" }}
                          value={values.new_password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="new_password" className="input__label">New Password</label>
                        <ErrorMessage name="new_password" component="div" className="error-message" />
                      </div>
                      <div className="input__wrapper" style={{ width: "100%" }}>
                        <input
                          type="password"
                          name="confirm_password"
                          placeholder="Confirm Password"
                          className="input__field"
                          style={{ width: "100%" }}
                          value={values.confirm_password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="confirm_password" className="input__label">Confirm Password</label>
                        <ErrorMessage name="confirm_password" component="div" className="error-message" />
                      </div>
                    </div>
                    <div className="d-grid gap-2">
                      <Button type="submit" disabled={!isValidForm} className='update-btn' size="lg" style={{ backgroundColor: !isValidForm ? 'rgba(180, 49, 45, 0.7)' : 'rgb(180,49,45)', color: 'white' }}>
                        UPDATE PASSWORD
                      </Button>
                    </div>
                  </div>
                </Card>
              </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Card.Body>
    </Card>

    </main>
  )
}

export default MyProfile
