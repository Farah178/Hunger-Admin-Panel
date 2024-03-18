import React from 'react'
import PageTitle from '../../components/Breadcrumb/PageTitle'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { Tab, Tabs, Button, Table, Form } from 'react-bootstrap';
import { BiEdit, BiShow } from 'react-icons/bi';
import { IoIosEye } from 'react-icons/io';
import '../Menu/allMenus.css'
import { FaPlus, FaCog } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import { Modal } from 'react-bootstrap';
import Pagination from '../../components/Pagination/Pagination';
import CustomTable from '../../components/Tables/SimpleCustomTable/SimpleCustomTable';
import TableSearchBar from '../../components/SearchBar/TableSearch';
import './allOrders.css'
import SearchBar from '../../components/SearchBar/SearchBar';
import Frame93 from '../../../src/images/Frame 93.png';

import '../../components/../screens/Dashboard/main.css'

// import '../../components/SearchBar/tablestyle.css'

// Dummy JSON data
const dummyData = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  status: `Completed ${index + 1}`,
  type: `Pickup`,
  due: `2024-02-${index + 1}`,
  name: `Thilak`,
  placed: `About 18 hrs ago`,
  location: `Alberta`,
}));

const menuitemtopselling = Array.from({ length: 5 }, (_, index) => ({
  item: `The Cuban`,
  sold: `253`,
  revenue: `$689`,
}));

const menuitemtopmodifying = Array.from({ length: 5 }, (_, index) => ({
  extra: `The Cuban`,
  sold: `253`,
  revenue: `$689`,
}));

const menuitemsales = Array.from({ length: 5 }, (_, index) => ({
  item: `Mango shake`,
  modifiers: `1`,
  orderquantity: `1`,
  totalamount: `$689`,

}));

function AllOrders() {
  const [inputFocused, setInputFocused] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    // Trigger file input click when Add button is clicked
    document.getElementById('imageInput').click();
  };
  const [showModal, setShowModal] = useState(false);

  const handleCreateMenu = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(dummyData.length / itemsPerPage);
  const displayPages = Math.min(totalPages, 3); // Ensure we display maximum 3 pages

  const [activeTab, setActiveTab] = useState('sendMessages');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  const page = "AllOrders";

  const [isFocused, setIsFocused] = useState(false);

  const handleButtonClickSearch = () => {
    setIsFocused(true);
  }

  // Search code 
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    console.log(value, 'valuessssss')
    setSearchValue(value);
  };

  



  const [isPaymentReceived, setIsPaymentReceived] = useState(false);

  const handleToggle = () => {
    setIsPaymentReceived(!isPaymentReceived); // Toggle the state
  };

  const [selectedOption, setSelectedOption] = useState('');

    // Function to handle dropdown item click
    const handleDropdownItemClick = (option) => {
        console.log(option,"option==>");
        setSelectedOption(option);
    };
// Location
    const [selectedLocationOption, setselectedLocationOption] = useState('');

    // Function to handle dropdown item click
    const handleDropdownItemClickLocation = (option) => {
        console.log(option,"option==>");
        setselectedLocationOption(option);
    };

// Month

const [selectedMonthOption, setselectedMonthOption] = useState('');

// Function to handle dropdown item click
const handleDropdownItemClickMonth = (option) => {
    console.log(option,"option==>");
    setselectedMonthOption(option);
};

// Time Interval

const [selectedTimeOption, setselectedTimeOption] = useState('');

// Function to handle dropdown item click
const handleDropdownItemClickTimeInterval = (option) => {
    console.log(option,"option==>");
    setselectedTimeOption(option);
};

// Currency

const [selectedCurrencyOption, setselectedCurrencyOption] = useState('');

// Function to handle dropdown item click
const handleDropdownItemClickCurrency = (option) => {
    console.log(option,"option==>");
    setselectedCurrencyOption(option);
};

// FullFilment

const [selectedFullFilmentOption, setselectedFullFilmentOption] = useState('');

// Function to handle dropdown item click
const handleDropdownItemClickFullFilment = (option) => {
    console.log(option,"option==>");
    setselectedFullFilmentOption(option);
};

// Payment Method

const [selectedPaymentOption, setselectedPaymentOption] = useState('');

// Function to handle dropdown item click
const handleDropdownItemFullFilment = (option) => {
    console.log(option,"option==>");
    setselectedPaymentOption(option);
};

// Order Type Menu

const [selectedORMenuOption, setselectedORMenuOption] = useState('');

// Function to handle dropdown item click
const handleDropdownItemORMenu = (option) => {
    console.log(option,"option==>");
    setselectedORMenuOption(option);
};

const [selectedORMenuLocation, setselectedORMenuLocation] = useState('');

// Function to handle dropdown item click
const handleDropdownItemORLocation = (option) => {
    console.log(option,"option==>");
    setselectedORMenuLocation(option);
};

const [selectedORMonth, setselectedORMonth] = useState('');

// Function to handle dropdown item click
const handleDropdownItemORMonth = (option) => {
    console.log(option,"option==>");
    setselectedORMonth(option);
};

const [selectedORTimeInterval, setselectedORTimeInterval] = useState('');

// Function to handle dropdown item click
const handleDropdownItemORTI = (option) => {
    console.log(option,"option==>");
    setselectedORTimeInterval(option);
};

const [selectedORCurrency, setselectedORCurrency] = useState('');

// Function to handle dropdown item click
const handleDropdownItemORCurrency = (option) => {
    console.log(option,"option==>");
    setselectedORCurrency(option);
};

const [selectedORFullFill, setselectedORFullFill] = useState('');

// Function to handle dropdown item click
const handleDropdownItemORFullFill = (option) => {
    console.log(option,"option==>");
    setselectedORFullFill(option);
};

const [selectedORPayment, setselectedORPayment] = useState('');

// Function to handle dropaydown item click
const handleDropdownItemORPayment = (option) => {
    console.log(option,"option==>");
    setselectedORPayment(option);
};

// Top Selling

const [selectedTPenuOption, setselectedTPenuOption] = useState('');

// Function to handle dropdown item click
const handleDropdownItemTPMenu = (option) => {
    console.log(option,"option==>");
    setselectedTPenuOption(option);
};

const [selectedORMenuTPLocation, setselectedORMenuTPLocation] = useState('');

// Function to handle dropdown item click
const handleDropdownItemTPLocation = (option) => {
    console.log(option,"option==>");
    setselectedORMenuTPLocation(option);
};

const [selectedTPMonth, setselectedTPMonth] = useState('');

// Function to handle dropdown item click
const handleDropdownItemTPMonth = (option) => {
    console.log(option,"option==>");
    setselectedTPMonth(option);
};

const [selectedTPTimeInterval, setselectedTPTimeInterval] = useState('');

// Function to handle dropdown item click
const handleDropdownItemTP = (option) => {
    console.log(option,"option==>");
    setselectedTPTimeInterval(option);
};

const [selectedTPCurrency, setselectedTPCurrency] = useState('');

// Function to handle dropdown item click
const handleDropdownItemTPCurrency = (option) => {
    console.log(option,"option==>");
    setselectedTPCurrency(option);
};

const [selectedTPFullFill, setselectedTPFullFill] = useState('');

// Function to handle dropdown item click
const handleDropdownItemTPFullFill = (option) => {
    console.log(option,"option==>");
    setselectedTPFullFill(option);
};

const [selectedTPPayment, setselectedTPPayment] = useState('');

// Function to handle dropaydown item click
const handleDropdownItemTPPayment = (option) => {
    console.log(option,"option==>");
    setselectedTPPayment(option);
};




  return (


    <main id="main" className='main'>
      <Card className="overflow-auto card-custom">
        <Card.Body>
          <PageTitle page="All Orders" />
          <div className='Tab-parent'>
            <div className='Tab-parent'>

              <div>
                <div className="container">


                  <ul className="nav nav-pills mb-3 " id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link  fw-semibold position-relative active" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Orders </button>


                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link  fw-semibold position-relative" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Menu Items </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button className="nav-link  fw-semibold position-relative" id="pills-future-tab" data-bs-toggle="pill" data-bs-target="#pills-future" type="button" role="tab" aria-controls="pills-future" aria-selected="false">Item sales </button>
                    </li>



                  </ul>







                  <div className="tab-content  rounded-3 mt-4" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                      <div className="container">
                        <div style={{ display: 'flex' }} className="row">
                          <div className="col-md-10 mb-3">
                            <div style={{ display: "flex", gap: '10px' }}>
                              {/* Input fields */}
                              {/* Order Type */}



                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Order Type"
                                  className="input__field"
                                  id="Order Type"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Order Type" className="input__label">
                                  Order Type
                                </label> */}

                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Order Type"
                                                            aria-label="Order Type"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            value={selectedOption} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemClick('Option 1')}>Option 1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemClick('Option 2')}>Option 2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                             




                              {/* Location */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Location"
                                  className="input__field"
                                  id="Location"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Location" className="input__label">
                                  Location
                                </label> */}
                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Location"
                                                            aria-label="Location"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            value={selectedLocationOption} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemClickLocation('LocationOption1')}>LocationOption1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemClickLocation('LocationOption2')}>LocationOption2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                              {/* </div> */}


                              {/* Month */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Month"
                                  className="input__field"
                                  id="Month"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Month" className="input__label">
                                  Month
                                </label> */}

                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Month"
                                                            aria-label="Month"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            

                                                            value={selectedMonthOption} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemClickMonth('Month1')}>Month 1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemClickMonth('Month2')}>Month 2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                              {/* </div> */}
                              {/* Time Interval */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Time Interval"
                                  className="input__field"
                                  id="Time Interval"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Time Interval" className="input__label">
                                  Time Interval
                                </label> */}
                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Time Interval"
                                                            aria-label="Time Interval"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            

                                                            value={selectedTimeOption} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemClickTimeInterval('TimeInterval1')}>Option 1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemClickTimeInterval('TimeInterval2')}>TimeInterval2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                              {/* </div> */}
                            </div>
                           



                            {/* Additional input fields */}
                          
                          </div>
                          <div className="col-md-8 mb-3">                   
                            <div style={{ display: "flex", gap: '1px' }}>
                              {/* Input fields */}
                              {/* Order Type */}



                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Order Type"
                                  className="input__field"
                                  id="Order Type"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Order Type" className="input__label">
                                  Order Type
                                </label> */}

                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Currency"
                                                            aria-label="Currency"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            

                                                            value={selectedCurrencyOption} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemClickCurrency('Currency11')}>Currency1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemClickCurrency('Option 2')}>Option 2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                             




                              {/* Location */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Location"
                                  className="input__field"
                                  id="Location"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Location" className="input__label">
                                  Location
                                </label> */}

                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="FullFillment Type"
                                                            aria-label="FullFillment Type"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            

                                                            value={selectedFullFilmentOption} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemClickFullFilment('FullFil1')}>Option 1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemClickFullFilment('Option 2')}>Option 2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                              {/* </div> */}


                              {/* Month */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Month"
                                  className="input__field"
                                  id="Month"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Month" className="input__label">
                                  Month
                                </label> */}

                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Payment Method"
                                                            aria-label="Month"
                                                            aria-describedby="Payment Method"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            

                                                            value={selectedPaymentOption} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemFullFilment('Option1')}>Option 1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemFullFilment('Option')}>Option 2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                              {/* </div> */}
                              {/* Time Interval */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Time Interval"
                                  className="input__field"
                                  id="Time Interval"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Time Interval" className="input__label">
                                  Time Interval
                                </label> */}
                               
                              {/* </div> */}
                            </div>
                            </div>
                        </div>

                      </div>
                      <>
                        <CustomTable
                          headers={['#', 'Status', 'Type', 'Due', 'Name', 'Placed', 'Location', 'Action']}
                          data={currentItems.map(data => [data.id,
                          data.status,
                          data.type,
                          data.due,
                          data.name,
                          data.placed,
                          data.location])}
                          actions={[{ icon: <IoIosEye style={{ color: 'white', fontSize: '20px' }} />, onClick: 'handleEdit' }]}
                        />
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          displayPages={displayPages}
                          goToPage={goToPage}
                          prevPage={prevPage}
                          nextPage={nextPage}
                        />
                      </>

                    </div>

                    {/* Menu Item */}

                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">



                      {/* <Card className="overflow-auto card-custom"> */}

                      {/* First row with two cards */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div className="container">
                        <div style={{ display: 'flex' }} className="row">
                          <div className="col-md-10 mb-3">
                            <div style={{ display: "flex", gap: '10px' }}>
                              {/* Input fields */}
                              {/* Order Type */}



                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Order Type"
                                  className="input__field"
                                  id="Order Type"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Order Type" className="input__label">
                                  Order Type
                                </label> */}

                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Order Type"
                                                            aria-label="Order Type"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            

                                                            value={selectedORMenuOption} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemORMenu('ORMenu 1')}>ORMenu 1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemORMenu('ORMenu 2')}>ORMenu 2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                             




                              {/* Location */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Location"
                                  className="input__field"
                                  id="Location"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Location" className="input__label">
                                  Location
                                </label> */}
                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Location"
                                                            aria-label="Location"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            

                                                            value={selectedORMenuLocation} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemORLocation('ORLocationOption1')}>ORLocationOption1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemORLocation('ORLocationOption1')}>ORLocationOption2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                              {/* </div> */}


                              {/* Month */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Month"
                                  className="input__field"
                                  id="Month"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Month" className="input__label">
                                  Month
                                </label> */}

                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Month"
                                                            aria-label="Month"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            


                                                            value={selectedORMonth} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemORMonth('ORMonth1')}>ORMonth1 1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemORMonth('ORMonth1')}>ORMonth1 2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                              {/* </div> */}
                              {/* Time Interval */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Time Interval"
                                  className="input__field"
                                  id="Time Interval"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Time Interval" className="input__label">
                                  Time Interval
                                </label> */}
                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Time Interval"
                                                            aria-label="Time Interval"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            
                                                            
                                                            
                                                            value={selectedORTimeInterval} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemORTI('ORTimeInterval1')}>Option 1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemORTI('ORTimeInterval1')}>TimeInterval2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                              {/* </div> */}
                            </div>
                           



                            {/* Additional input fields */}
                          
                          </div>
                          <div className="col-md-10 mb-3">                   
                            <div style={{ display: "flex", gap: '1px' }}>
                              {/* Input fields */}
                              {/* Order Type */}



                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Order Type"
                                  className="input__field"
                                  id="Order Type"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Order Type" className="input__label">
                                  Order Type
                                </label> */}

                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Currency"
                                                            aria-label="Currency"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            
                                                            
                                                            
                                                            value={selectedORCurrency} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemORCurrency('ORCurrency1')}>ORCurrency1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemORCurrency('ORCurrency1 2')}>ORCurrency1 2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                   
                                                </div>
                                                
                             




                              {/* Location */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Location"
                                  className="input__field"
                                  id="Location"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Location" className="input__label">
                                  Location
                                </label> */}

                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="FullFillment Type"
                                                            aria-label="FullFillment Type"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            
                                                            

                                                            value={selectedORFullFill} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemORFullFill('FullFil1')}>full 1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemORFullFill('Option 2')}>Option 2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                              {/* </div> */}


                              {/* Month */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Month"
                                  className="input__field"
                                  id="Month"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Month" className="input__label">
                                  Month
                                </label> */}

                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Payment Method"
                                                            aria-label="Month"
                                                            aria-describedby="Payment Method"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            

                                                            value={selectedORPayment} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemORPayment('Option1')}>Option 1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemORPayment('Option')}>Option 2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                    
                                                </div>

                                               
                                                  
                                                <div className="input-group custom-input-group">
                                                   
                                                <div style={{ position: 'absolute', top: '-1px', right: '0', width: '100%' }}>
          <button className="btn btn-primary">Export</button>
        </div>
                                                    
                                                    
                                                </div>
                                               
                                                
                                               
                              {/* </div> */}
                              {/* Time Interval */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Time Interval"
                                  className="input__field"
                                  id="Time Interval"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Time Interval" className="input__label">
                                  Time Interval
                                </label> */}
                               
                              {/* </div> */}
                           
                            </div>
                        
                        </div>
                       
                        </div>
                            
                       

                        </div>
                        
                        <Row className="g-3">
                          <Col md={6}>

                            <Card className='Card'>

                              <div className="card-content">

                                <div>
                                  <div style={{
                                    color: 'rgb(205,205,205', marginBottom: "15px"
                                  }}>
                                    Top Selling Items
                                  </div>
                                  <CustomTable
                                    headers={['Item', 'Sold', 'Revenue']}
                                    data={menuitemtopselling.map(data => [data.item, data.sold, data.revenue])}

                                  />

                                </div>

                              </div>
                            </Card>
                          </Col>
                        </Row>

                        <Row className="g-3">
                          <Col md={6}>
                            <Card className='Card'>
                              <div className="card-content">

                                <div>
                                  <div style={{
                                    color: 'rgb(205,205,205', marginBottom: "15px"
                                  }}>
                                    Top Modification
                                  </div>
                                  <CustomTable
                                    headers={['Extra', 'Sold', 'Revenue']}
                                    data={menuitemtopmodifying.map(data => [data.extra, data.sold, data.revenue])}

                                  />

                                </div>

                              </div>
                            </Card>
                          </Col>
                        </Row>
                      </div>

                      {/* {/* <CustomTable
                        headers={['#', 'Status', 'Type', 'Due', 'Name', 'Placed', 'Location', 'Action']}
                        data={currentItems.map(data => [data.id,
                        data.status,
                        data.type,
                        data.due,
                        data.name,
                        data.placed,
                        data.location])}
                        actions={[{ icon: <IoIosEye style={{ color: 'white', fontSize: '20px' }} />, onClick: 'handleEdit' }]}
                      /> 
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        displayPages={displayPages}
                        goToPage={goToPage}
                        prevPage={prevPage}
                        nextPage={nextPage}
                      /> */}
                    </div>


                    {/* Item Sales */}
                    <div className="tab-pane fade" id="pills-future" role="tabpanel" aria-labelledby="pills-pills-future">

                      {/* Top selling */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex' }} className="row">
                          <div className="col-md-10 mb-3">
                            <div style={{ display: "flex", gap: '10px' }}>
                              {/* Input fields */}
                              {/* Order Type */}



                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Order Type"
                                  className="input__field"
                                  id="Order Type"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Order Type" className="input__label">
                                  Order Type
                                </label> */}

                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Order Type"
                                                            aria-label="Order Type"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            

                                                            value={selectedTPenuOption} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemTPMenu('OTMenu 1')}>OTMenu 1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemTPMenu('OTMenu 2')}>OTMenu 2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                             




                              {/* Location */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Location"
                                  className="input__field"
                                  id="Location"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Location" className="input__label">
                                  Location
                                </label> */}
                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Location"
                                                            aria-label="Location"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            

                                                            value={selectedORMenuTPLocation} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemTPLocation('OTLocationOption1')}>OTLocationOption1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemTPLocation('OTLocationOption1')}>OTLocationOption2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                              {/* </div> */}


                              {/* Month */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Month"
                                  className="input__field"
                                  id="Month"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Month" className="input__label">
                                  Month
                                </label> */}

                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Month"
                                                            aria-label="Month"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            


                                                            value={selectedTPMonth} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemTPMonth('ORMonth1')}>OTMonth1 1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemTPMonth('OTMonth1')}>OTMonth1 2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                              {/* </div> */}
                              {/* Time Interval */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Time Interval"
                                  className="input__field"
                                  id="Time Interval"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Time Interval" className="input__label">
                                  Time Interval
                                </label> */}
                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Time Interval"
                                                            aria-label="Time Interval"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            
                                                            
                                                            
                                                            value={selectedTPTimeInterval} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemTP('OTimeInterval2')}>OTimeInterval1 1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemTP('OTimeInterval1')}>OTimeInterval2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                              {/* </div> */}
                            </div>
                           



                            {/* Additional input fields */}
                          
                          </div>
                          <div className="col-md-8 mb-3">                   
                            <div style={{ display: "flex", gap: '1px' }}>
                              {/* Input fields */}
                              {/* Order Type */}



                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Order Type"
                                  className="input__field"
                                  id="Order Type"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Order Type" className="input__label">
                                  Order Type
                                </label> */}

                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Currency"
                                                            aria-label="Currency"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            
                                                            
                                                            
                                                            value={selectedTPCurrency} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemTPCurrency('OTCurrency1')}>OTCurrency1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemTPCurrency('OTCurrency1 2')}>OTCurrency1 2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                             




                              {/* Location */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Location"
                                  className="input__field"
                                  id="Location"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Location" className="input__label">
                                  Location
                                </label> */}

                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="FullFillment Type"
                                                            aria-label="FullFillment Type"
                                                            aria-describedby="basic-addon2"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            
                                                            

                                                            value={selectedTPFullFill} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemTPFullFill('OTfull')}>OTfull 1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemTPFullFill('OTfull 2')}>OTfull 2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                              {/* </div> */}


                              {/* Month */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Month"
                                  className="input__field"
                                  id="Month"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Month" className="input__label">
                                  Month
                                </label> */}

                                <div className="input-group custom-input-group">
                                                    <button
                                                        style={{ borderRadius: '4px', height: '39px', position: 'relative' }} // Add position: relative
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control custom-form-control"
                                                            placeholder="Payment Method"
                                                            aria-label="Month"
                                                            aria-describedby="Payment Method"
                                                            style={{
                                                                border: 'none',
                                                                height: '20px',
                                                                background: 'transparent',
                                                                width: 'calc(100% - 28px)', // Adjust the width to accommodate the text and the icon
                                                                paddingRight: '30px' // Adjust paddingRight to accommodate the chevron icon
                                                            }} // Remove border and background
                                                            

                                                            value={selectedTPPayment} // Set input value to the selectedOption state
                                                            readOnly // Make the input read-only to prevent direct editing
                                                        />
                                                        <i
                                                            className="bi bi-chevron-down"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)' // Align the icon vertically in the middle
                                                            }}
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemTPPayment('Option1')}>Option 1</a></li>
                                                        <li><a className="dropdown-item" onClick={() => handleDropdownItemTPPayment('Option')}>Option 2</a></li>
                                                        {/* Add more options as needed */}
                                                    </ul>
                                                </div>
                              {/* </div> */}
                              {/* Time Interval */}
                              {/* <div className="input__wrapper" style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Time Interval"
                                  className="input__field"
                                  id="Time Interval"
                                  style={{ width: "100%" }}
                                />
                                <label htmlFor="Time Interval" className="input__label">
                                  Time Interval
                                </label> */}
                               
                              {/* </div> */}
                            </div>
                            </div>
                        </div>



                        <Row className="g-3">
                          <Col md={6}>

                            <Card className='Card'>

                              <div className="card-content">

                                <div>
                                  <div style={{
                                    color: 'rgb(205,205,205', marginBottom: "15px"
                                  }}>
                                    Top Selling Items
                                  </div>
                                  <CustomTable

                                    headers={['Item', 'Modifiers', 'Order Quantity', 'Total Amount']}
                                    data={menuitemsales.map(data => [
                                      data.item,
                                      data.modifiers,
                                      data.orderquantity,
                                      data.totalamount,
                                    ])}

                                  />

                                </div>

                              </div>
                            </Card>
                          </Col>
                        </Row>


                      </div>






                      {/* <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        displayPages={displayPages}
                        goToPage={goToPage}
                        prevPage={prevPage}
                        nextPage={nextPage}
                      />  */}
                    </div>





                    <div className="tab-pane fade" id="pills-history" role="tabpanel" aria-labelledby="pills-pills-history">
                      <CustomTable
                        headers={['#', 'Status', 'Type', 'Due', 'Name', 'Placed', 'Location', 'Action']}
                        data={currentItems.map(data => [data.id,
                        data.status,
                        data.type,
                        data.due,
                        data.name,
                        data.placed,
                        data.location])}
                        actions={[{ icon: <IoIosEye style={{ color: 'white', fontSize: '20px' }} />, onClick: 'handleEdit' }]}
                      />
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        displayPages={displayPages}
                        goToPage={goToPage}
                        prevPage={prevPage}
                        nextPage={nextPage}
                      />


                    </div>
                  </div>
                </div>

              </div>
              <div className='Tab-right d-flex align-items-center'>


              </div>
            </div>
            <div className='Tab-right d-flex align-items-center'>

            </div>
          </div>
        </Card.Body>
      </Card>



    </main>
  )
}

export default AllOrders
