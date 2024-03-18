import React, { useEffect } from 'react'
import PageTitle from '../../components/Breadcrumb/PageTitle'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { Tab, Tabs, Button, Table, Form } from 'react-bootstrap';
import { BiEdit, BiShow } from 'react-icons/bi';
import '../Menu/allMenus.css'
import { FaPlus, FaCog } from 'react-icons/fa';
import SearchBar from '../../components/SearchBar/SearchBar';
import { BsSearch } from 'react-icons/bs';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import CustomTable from '../../components/Tables/SimpleCustomTable/SimpleCustomTable';
import Pagination from '../../components/Pagination/Pagination';
import { IoIosEye } from 'react-icons/io';
import TableSearchBar from '../../components/SearchBar/TableSearch';
import { useHistory, useNavigate } from 'react-router-dom';
import AddLocationButton from './AddLocationButton';
import Vector from '../../images/Vector.png';
import Frame from '../../images/Frame 124314.png';


import '../Settings/settings.css'
import { API } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../redux/actions/dataActions';

function LocationAndHours() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState('');
  const locationData = useSelector(state => state.data.location);

  useEffect(() => {
    GetLocationData()
    
  }, []);

  const GetLocationData = async () => {
    API.getInstance().base.get("/api/restaurent")
      .then((res) => {
        // // console.log(res.data.result.data, 'fooditemData====>')
        dispatch(setLocation(res.data.result.data));
      })
      .catch((error) => {
        // console.log(error, 'fooditemData==error');
      })
      .finally(() => {

      });
  }





  const handleButtonClick = (button) => {
    setActiveButton(button);
  };


  const page = "Items";

  const [isFocused, setIsFocused] = useState(false);

  const handleButtonClickSearch = () => {
    setIsFocused(true);
  }



  const [isPaymentReceived, setIsPaymentReceived] = useState(false);

  const handleToggle = () => {
    console.log("asdsdsa");
    setIsPaymentReceived(!isPaymentReceived);
  };




  // Search code 
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    console.log(value, 'valuessssss')
    setSearchValue(value);
  };

  const [formData, setFormData] = useState({});

  const handleInputChange = (inputData) => {
    setFormData(inputData);
  };

  const handleCreateMenu = () => {
    navigate('/locationhours/add-location-button');
  };

  const handleOnEditClick = (id) => {
    console.log(id,'location====')
    navigate(`/locationhours/add-location-button?id=${id}`);
  };
  

  return (


    <main id="main" className='main'>
      <Card className="overflow-auto card-custom">
        <Card.Body>
          <PageTitle page="LocationAndHours" />
          <div className='Tab-parent'>
            <div className='Tab-parent'>
              <div>
                <div className="container">
                  <TableSearchBar placeholder="Search items" onSearch={handleSearch} />
                </div>
              </div>
            </div>
            <div className='Tab-right d-flex align-items-center'>
              <Button
                variant="primary"
                className="me-md-2 me-0 mb-2 mb-md-0 btn-lg"
                style={{
                  height: "40px",
                  backgroundColor: 'rgb(180,49,45)',
                  fontSize: "12px",
                  border: "none",
                 
                }}
                tabIndex={0}
                onClick={handleCreateMenu} // Open modal on button click
              >
                <span style={{ marginLeft: '5px' }}>Add Location</span>
              </Button>
            </div>
          </div>
          {/* <Card.Body> */}
            {/* First row with two cards */}
            {locationData.map((location, index) => (
              <Card.Body>
            <Row className="g-3" key={index}>
              <Col md={6}>
                <Card className='Card'>
                  <div className="card-content1">
                    <div className="left-side">
                      <h4 style={{ color: "#FFFFFF" }}>{location.published_name}</h4>
                    </div>
                    <div className="right-side">
                      <div onClick={() => handleOnEditClick(location.id)}>
                      <img  src={Vector} style={{ height: '40%',width:'100%' }} />
                      </div>
                      
                      <p style={{ color: "#FFFFFF" }}>Publish</p>
                      <input type="checkbox" id="switch" defaultChecked={false} checked={isPaymentReceived} onClick={handleToggle} />
                      <label1 onClick={handleToggle} htmlFor="switch"></label1>
                    </div>
                  </div>
                  <div className="card-content2">
                    <div className="left-side">
                      <h6 style={{ color: "#FFFFFF", fontWeight: '300' }}>{location.location}</h6>
                    </div>
                    <div className="right-side">
                      <div style={{ fontSize: '14px', color: "#FFFFFF", backgroundColor: 'black', padding: '5px' }}>{location.city}</div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
            </Card.Body>
          ))}
            
          {/* </Card.Body> */}

          
        </Card.Body>
      </Card>


    </main>
  )
}

export default LocationAndHours
