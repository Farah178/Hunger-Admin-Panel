import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../../screens/Dashboard/main.css'
import './settings.css'
import { Button, Form } from 'react-bootstrap';
import UpdatedProfileButton from './UpdatedProfileButton';
import InputField from '../../components/Input/InputField';
import { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import PageTitle from '../../components/Breadcrumb/PageTitle';
import { API } from '../../api/api';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLocationInfoByid } from '../../redux/actions/dataActions';
import { toast } from 'react-toastify';

function AddLocationButton() {
    const [isValidForm, setIsValidForm] = useState(false); // State variable to store isValid value
    const [isPlaceIdValidForm, setIsPlaceIdValidForm] = useState(false);
    const [addlocation, setAddLocation] = useState(false);
    const [location_initialValues, setLocationinitialValues] = useState({
        location: '',
        publishingName: '',
        locationPhone: '',
        contactEmail: '',
        address: '',
        city: '',
        state: '',
        country: '',
        phone: '',
    });
    const [place_id_initialValues, setPlace_id_initialValues] = useState({
        google_place_id: '',
    });

    const id = new URLSearchParams(useLocation().search).get('id');
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            GetLocationByid(id)
        }
        else {
            setAddLocation(true)
        }

    }, []);


    const GetLocationByid = async (id) => {
        try {
            console.log('GetLocationByid===', id)
            API.getInstance().menu.get(`/api/restaurent?id=${id}`)
                .then((res) => {

                    const main_data = res.data.result.data[0]
                    const final_data = {
                        location: main_data.location,
                        publishingName: main_data.published_name,
                        locationPhone: main_data.location_phone,
                        contactEmail: main_data.contact_email,
                        address: main_data.address_info,
                        city: main_data.city,
                        state: main_data.state,
                        country: main_data.country,
                        phone: main_data.phone,
                    }
                    setPlace_id_initialValues({ google_place_id: main_data.google_place_id })
                    setLocationinitialValues(final_data)
                    //   dispatch(setLocationInfoByid(res.data.result.data[0]));
                })
                .catch((error) => {
                })
        }
        catch (error) {
        }
    };
    const page = "Location & Hours";


    // const circleColors1 = ['#9B9B9B', '#9B9B9B', '#E5B638', '#E5B638', '#E5B638', '#9B9B9B', '#E5B638'];
    // const circleColors = ['#E5B638', '#E5B638', '#9B9B9B', '#9B9B9B', '#9B9B9B', '#E5B638', '#E5B638'];

    // const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const addressvalidationSchema = Yup.object().shape({
        location: Yup.string().required('Location is required'),
        publishingName: Yup.string().required('Publishing Name is required'),
        locationPhone: Yup.string().required('Location Phone is required'),
        contactEmail: Yup.string().email('Invalid email').required('Contact Email is required'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        country: Yup.string().required('Country is required'),
        phone: Yup.string().required('Phone is required'),
    });

    const googlePlacevalidationSchema = Yup.object().shape({
        google_place_id: Yup.string().required('Google Place ID required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {

            console.log(values, 'values======>handleSubmit')
            setSubmitting(false)
            if (addlocation == true) {
                console.log(values, 'ADD ==value')
                API.getInstance().menu.post(`/api/restaurent`, values)
                    .then((res) => {
                        console.log(res, 'res===================handleSubmit')
                        //   GetLocationByid(id=0)
                    })
                    .catch((error) => {
                    })

            }
            else {
                API.getInstance().menu.put(`/api/restaurent/${id}`, values)
                    .then((res) => {
                        console.log(res, 'res===================handleSubmit')
                        GetLocationByid(id)
                    })
                    .catch((error) => {
                    })
            }
        }

        catch (error) {
        }
    };
    // Toaster
    const handleSave = () => {
        // Your save logic here

        // Show success toast
        toast.success('Saved successfully!');


    };

    const handleSaveLocation = () => {
        // Your save logic here

        // Show success toast
        toast.success('Location Saved successfully!');


    };


    // SELECT the hours open timing 

    const [selectedDays1, setSelectedDays1] = useState([]);
    const [hours, setHours] = useState([{ open: '', close: '' }]);
    const [countClickHour, setCountClickHour] = useState(0);
    const [SelectedDaysValue, setSelectedDaysValue] = useState([]);
    const [finalarray, setFinalArray] = useState([]);
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const addHour = (selectedDays) => {
        console.log(selectedDays,'selectedDays===addHour','hours======',hours)
        const remainingDays = daysOfWeek.filter((_, index) => !selectedDays.includes(index));
        const nextHour = { open: '', close: '' };
        setHours([...hours, nextHour]);
        // console.log(remainingDays,'remainingDays[0]===')
        console.log("Selected Days with Hours:SelectedDaysValue", SelectedDaysValue);
        const selectedDaysWithHours = selectedDays1.map(dayIndex => {
            const dayHours = hours[dayIndex] || { open: '', close: '' };
            return {
                day: daysOfWeek[dayIndex], 
                hours: hours[countClickHour] 
            };
        });
        setCountClickHour(prevCount => prevCount + 1);
        setSelectedDaysValue(prevSelectedDaysValue => [...prevSelectedDaysValue, ...selectedDaysWithHours]);
        console.log("Countclickhour",countClickHour,"Selected Days with Hours:2222", selectedDaysWithHours);


        return remainingDays[0];
    };
    


    const deleteHour = (index) => {
        setHours(hours.filter((_, i) => i !== index));
    };

    const handleOpenChange = (index, value) => {
        const updatedHours = [...hours];
        updatedHours[index].open = value;
        setHours(updatedHours);
        console.log(updatedHours,'updatedHours==handleOpenChange')
        console.log(selectedDays1,'selectedDays1==handleOpenChange')
    };

    const handleCloseChange = (index, value) => {
        const updatedHours = [...hours];
        updatedHours[index].close = value;
        setHours(updatedHours);
        console.log(updatedHours,'updatedHours==handleCloseChange')
        console.log(selectedDays1,'selectedDays1==handleOpenChange')
    };

    const toggleDay = (index, selectedDays, setSelectedDays) => {
        const updatedSelectedDays = [...selectedDays];
        if (updatedSelectedDays.includes(index)) {
            updatedSelectedDays.splice(updatedSelectedDays.indexOf(index), 1);
        } else {
            updatedSelectedDays.push(index);
            
            // Call addHour to add hours for the selected day
            // const nextDay = addHour(updatedSelectedDays);
            const remainingDays = daysOfWeek.filter((_, index) => !updatedSelectedDays.includes(index));
            console.log(updatedSelectedDays,'updatedSelectedDays====>',index,'indexx===',remainingDays,'remainingDays=====')
            // Update selectedDays with the remaining days
            
            setSelectedDays([...updatedSelectedDays, remainingDays]);
        }
        setSelectedDays1(updatedSelectedDays);
    };

    const handleSubmitTime = (e) => {
        e.preventDefault();
        // Create an array to store the selected days and their corresponding hours
        let count = 0
        console.log(hours,'dayHours==>111111')
    const selectedDaysWithHours = selectedDays1.map(dayIndex => {
        // Find the corresponding hours for the current dayIndex
        
        if (daysOfWeek[dayIndex] == undefined){
            count = count +1
            
        }
            const dayHours = hours[count] || { open: '', close: '' };
            console.log(dayHours,'dayHours==>')
            return {
                day: daysOfWeek[dayIndex], // Get the day from the daysOfWeek array
                hours: dayHours // Assign the corresponding hours to the day
            };
        
        
    });

    console.log("Selected Days with Hours:", selectedDaysWithHours);
    const filteredSelectedDaysWithHours = selectedDaysWithHours.filter(entry => entry.day !== undefined);
    console.log(filteredSelectedDaysWithHours,'filteredSelectedDaysWithHours==')
    setFinalArray(filteredSelectedDaysWithHours);
    };

    return (
        <main id="main" className='main'>

            <Card className="overflow-auto card-custom">
                <Card.Body>

                    <Card.Body>
                        <PageTitle page={page} />
                        {/* First row with two cards */}
                        <Row className="g-3">
                            <Formik
                                enableReinitialize
                                initialValues={location_initialValues}
                                onSubmit={handleSubmit}
                                validationSchema={addressvalidationSchema}
                                validateOnChange={true}
                                validateOnBlur={false}
                                validate={(values) => {
                                    // Manually validate the form on change
                                    addressvalidationSchema.validate(values)
                                        .then(() => setIsValidForm(true))
                                        .catch(() => setIsValidForm(false));
                                }}
                            >
                                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Col md={6}>
                                            <Card className='Card'>
                                                <Form.Group className="card-content">
                                                    <div>
                                                        {/* First Row */}
                                                        <Form.Group className="input__wrapper" style={{ width: "100%" }}>
                                                            <input
                                                                type="text"
                                                                placeholder="Location"
                                                                className="input__field"
                                                                // id="Location"
                                                                style={{ width: "100%" }}
                                                                name="location"
                                                                value={values.location}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                            <label htmlFor="location" className="input__label">
                                                                Location
                                                            </label>
                                                            <ErrorMessage name="location" component="div" className="error-message" />
                                                        </Form.Group>

                                                        <Form.Group className="input__wrapper" style={{ width: "100%" }}>
                                                            <input
                                                                type="text"
                                                                placeholder="Publishing Name"
                                                                className="input__field"
                                                                name="publishingName"
                                                                value={values.publishingName}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                style={{ width: "100%" }}
                                                            />
                                                            <label htmlFor="publishingName" className="input__label">
                                                                Publishing Name
                                                            </label>
                                                            <ErrorMessage name="publishingName" component="div" className="error-message" />
                                                        </Form.Group>

                                                        <Form.Group className="input__wrapper" style={{ width: "100%" }}>
                                                            <input
                                                                type="text"
                                                                placeholder="Location Phone"
                                                                className="input__field"
                                                                name="locationPhone"
                                                                value={values.locationPhone}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                style={{ width: "100%" }}
                                                            />
                                                            <label htmlFor="locationPhone" className="input__label">
                                                                Location Phone
                                                            </label>
                                                            <ErrorMessage name="locationPhone" component="div" className="error-message" />
                                                        </Form.Group>

                                                        <Form.Group className="input__wrapper" style={{ width: "100%" }}>
                                                            <input
                                                                type="text"
                                                                placeholder="Contact Email"
                                                                className="input__field"
                                                                name="contactEmail"
                                                                value={values.contactEmail}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                style={{ width: "100%" }}
                                                            />
                                                            <label htmlFor="contactEmail" className="input__label">
                                                                Contact Email
                                                            </label>
                                                            <ErrorMessage name="contactEmail" component="div" className="error-message" />
                                                        </Form.Group>


                                                        {/* Second Row */}
                                                        <Form.Group className="input__wrapper" style={{ width: "100%" }}>
                                                            <Field
                                                                as="textarea"
                                                                type="text"
                                                                placeholder="Address"
                                                                className="input__field"
                                                                name="address"
                                                                value={values.address}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                style={{ width: "100%" }}
                                                            />
                                                            <label htmlFor="address" className="input__label">
                                                                Address
                                                            </label>
                                                            <ErrorMessage name="address" component="div" className="error-message" />
                                                        </Form.Group>

                                                        <Form.Group className="input__wrapper" style={{ width: "100%" }}>
                                                            <input
                                                                type="text"
                                                                placeholder="City"
                                                                className="input__field"
                                                                name="city"
                                                                value={values.city}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                style={{ width: "100%" }}
                                                            />
                                                            <label htmlFor="city" className="input__label">
                                                                City
                                                            </label>
                                                            <ErrorMessage name="city" component="div" className="error-message" />

                                                        </Form.Group>


                                                        <Form.Group className="input__wrapper" style={{ width: "100%" }}>
                                                            <input
                                                                type="text"
                                                                placeholder="State"
                                                                className="input__field"
                                                                name="state"
                                                                value={values.state}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                style={{ width: "100%" }}
                                                            />
                                                            <label htmlFor="state" className="input__label">
                                                                State
                                                            </label>
                                                            <ErrorMessage name="state" component="div" className="error-message" />
                                                        </Form.Group>

                                                        <Form.Group className="input__wrapper" style={{ width: "100%" }}>
                                                            <input
                                                                type="text"
                                                                placeholder="Country"
                                                                className="input__field"
                                                                name="country"
                                                                value={values.country}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                style={{ width: "100%" }}
                                                            />
                                                            <label htmlFor="country" className="input__label">
                                                                Country
                                                            </label>
                                                            <ErrorMessage name="country" component="div" className="error-message" />
                                                        </Form.Group>

                                                        <Form.Group className="input__wrapper" style={{ width: "100%" }}>
                                                            <input
                                                                type="text"
                                                                placeholder="Phone"
                                                                className="input__field"
                                                                name="phone"
                                                                value={values.phone}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                style={{ width: "100%" }}
                                                            />
                                                            <label htmlFor="phone" className="input__label">
                                                                Phone
                                                            </label>
                                                            <ErrorMessage name="phone" component="div" className="error-message" />
                                                        </Form.Group>
                                                    </div>


                                                    {/* </div> */}
                                                    {/* Update button */}
                                                    <Form.Group >
                                                        <Button
                                                            type="submit"
                                                            disabled={!isValidForm}
                                                            className='update-btn'
                                                            size="lg"
                                                            style={{
                                                                backgroundColor: !isValidForm ? 'rgba(180, 49, 45, 0.7)' : 'rgb(180,49,45)',
                                                                color: 'white'
                                                            }}
                                                            onClick={() => handleSave()}
                                                        >
                                                            SAVE
                                                        </Button>

                                                    </Form.Group>

                                                </Form.Group>
                                            </Card>
                                        </Col>
                                    </Form>
                                )}
                            </Formik>

                            <Col md={6}>
                                {/* Second card content */}
                            </Col>
                        </Row>

                        {/* Second row with two cards */}
                        <Row className="g-3">
                            <Col md={6}>



                            </Col>
                            <Col md={6}>
                                {/* Fourth card content */}
                            </Col>
                        </Row>
                    </Card.Body>



                    {/* </Card> */}

                    {/* <Card className="overflow-auto card-custom"> */}
                    <Card.Body>
                        <Formik
                            enableReinitialize
                            initialValues={place_id_initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={googlePlacevalidationSchema}
                            validateOnChange={true}
                            validateOnBlur={false}
                            validate={(values) => {
                                // Manually validate the form on change
                                googlePlacevalidationSchema.validate(values)
                                    .then(() => setIsPlaceIdValidForm(true))
                                    .catch(() => setIsPlaceIdValidForm(false));
                            }}
                        >
                            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Row className="g-3">

                                        <Col md={6}>
                                            <Card className='Card'>
                                                <div className="card-content">
                                                    {/* Location name input field */}

                                                    <span style={{ color: "white", marginTop: "10px" }}>Location </span><br /><br />

                                                    <div className="google-map">
                                                        {/* Dummy Google Location Map */}
                                                        <img style={{
                                                            width: "89%", height: "40%"

                                                        }} src="https://static.tnn.in/thumb/msid-104802333,thumbsize-531616,width-1280,height-720,resizemode-75/104802333.jpg" />
                                                    </div>

                                                    {/* Phone input field */}
                                                    <div className="input__wrapper" style={{ width: "100%" }}>
                                                        <input
                                                            type="text"
                                                            placeholder="Phone"
                                                            className="input__field"
                                                            name="google_place_id"
                                                            value={values.google_place_id}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            style={{ width: "100%" }}
                                                        />
                                                        <label htmlFor="google_place_id" className="input__label">
                                                            Google Place ID
                                                        </label>
                                                    </div>

                                                    {/* Dummy Google location map */}


                                                    {/* Save button */}
                                                    <Form.Group >
                                                        <Button type="submit" disabled={!isPlaceIdValidForm} className='update-btn' size="lg" style={{ backgroundColor: !isPlaceIdValidForm ? 'rgba(180, 49, 45, 0.7)' : 'rgb(180,49,45)', color: 'white' }}
                                                            onClick={() => handleSaveLocation()}>
                                                            SAVE
                                                        </Button>
                                                    </Form.Group>
                                                </div>
                                            </Card>
                                        </Col>

                                    </Row>
                                </Form>
                            )}
                        </Formik>
                    </Card.Body>

                    {/* </Card> */}

                    <Card.Body>
                        <Row className="g-3">
                            <Col md={6}>
                                <Card className='Card'>
                                <div className="card-content">
                                    <form onSubmit={handleSubmitTime}>
                                        {/* Location name input field */}
                                        {hours.map((hour, index) => (
                                            <div key={index}>
                                                {/* Days of the week */}
                                                <div style={{ display: 'flex', marginTop: '10px' }}>
                                                    {daysOfWeek.map((day, dayIndex) => (
                                                        <div
                                                            key={dayIndex}
                                                            className="circle"
                                                            style={{
                                                                backgroundColor: selectedDays1.includes(dayIndex) ? '#E5B638' : '#9B9B9B',
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={() => toggleDay(dayIndex, selectedDays1, setSelectedDays1)}
                                                        >
                                                            {day}
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Second Row */}
                                                <div style={{ display: "flex", gap: '10px', marginTop: '20px' }}>
                                                    <div className="input__wrapper" style={{ width: "50%" }}>
                                                        <input
                                                            type="text"
                                                            placeholder="Open"
                                                            className="input__field"
                                                            value={hour.open}
                                                            onChange={(e) => handleOpenChange(index, e.target.value)}
                                                            style={{ width: "100%" }}
                                                        />
                                                        <label htmlFor="Open" className="input__label">
                                                            Open
                                                        </label>
                                                    </div>
                                                    <div className="input__wrapper" style={{ width: "50%" }}>
                                                        <input
                                                            type="text"
                                                            placeholder="Close"
                                                            className="input__field"
                                                            value={hour.close}
                                                            onChange={(e) => handleCloseChange(index, e.target.value)}
                                                            style={{ width: "100%" }}
                                                        />
                                                        <label htmlFor="Close" className="input__label">
                                                            Close
                                                        </label>
                                                    </div>
                                                    <button className="delete-icon" style={{ backgroundColor: 'transparent', border: 'none', color: "#FFFFFF" }} onClick={() => deleteHour(index)}>
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Add Hours button */}
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                            <button className="btn" onClick={() => setSelectedDays1([...selectedDays1, addHour(selectedDays1)])} style={{ backgroundColor: 'transparent', border: '1px solid rgb(229, 182, 56)', borderRadius: '10%', width: "28.25px", height: "28.3px", padding: '0', marginRight: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <span style={{ fontSize: '1.3rem', color: "rgb(229, 182, 56)" }}>+</span>
                                            </button>
                                            <span style={{ color: " #FFFFFF" }}>Add Hours</span>
                                        </div>

                                        {/* Save button */}
                                        <button type="submit" className='update-btn' style={{ backgroundColor: 'rgb(180,49,45)', color: 'white', marginTop: '20px' }}>
                                            SAVE
                                        </button>
                                    </form>
                                </div>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card.Body>
            </Card>




        </main>
    )
}

export default AddLocationButton
