import React from 'react'
import PageTitle from '../../components/Breadcrumb/PageTitle'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { IoIosEye } from 'react-icons/io';
import '../Menu/allMenus.css'
import Pagination from '../../components/Pagination/Pagination';
import CustomTable from '../../components/Tables/SimpleCustomTable/SimpleCustomTable';
import './allOrders.css'
import SearchBar from '../../components/SearchBar/SearchBar';
import Frame93 from '../../../src/images/Frame 93.png';
import { API } from "../../../src/api/api";
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders } from '../../redux/actions/dataActions';

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


function AllOrders() {

    const dispatch = useDispatch();
    const orderData = useSelector(state => state.data.orders);
  
    useEffect(() => {
        GetOrderData()
      console.log(orderData,'orderData')
    }, []);
  
    const GetOrderData = async () => {
      API.getInstance().base.get("/api/orders")
        .then((res) => {
          console.log(res.data.result.data, 'orderData====>')
          dispatch(setOrders(res.data.result.data));
        })
        .catch((error) => {
          console.log(error, 'orderData==error');
        })
        .finally(() => {
         
        });
    }

    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orderData.slice(indexOfFirstItem, indexOfLastItem);

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

    const totalPages = Math.ceil(orderData.length / itemsPerPage);
    const displayPages = Math.min(totalPages, 3); // Ensure we display maximum 3 pages

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
                                            <button className="nav-link  fw-semibold position-relative active" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">New <img style={{
                                                width: "40px"
                                            }} src={Frame93} /></button>


                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link  fw-semibold position-relative" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Today <img style={{
                                                width: "40px"
                                            }} src={Frame93} /></button>
                                        </li>

                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link  fw-semibold position-relative" id="pills-future-tab" data-bs-toggle="pill" data-bs-target="#pills-future" type="button" role="tab" aria-controls="pills-future" aria-selected="false">Future <img style={{
                                                width: "40px"
                                            }} src={Frame93} /></button>
                                        </li>

                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link  fw-semibold position-relative" id="pills-history-tab" data-bs-toggle="pill" data-bs-target="#pills-history" type="button" role="tab" aria-controls="pills-history" aria-selected="false">History <img style={{
                                                width: "40px"
                                            }} src={Frame93} /></button>

                                        </li>

                                    </ul>

                                    <div className="container">
                                        <div style={{ display: 'flex', }} className="row">
                                            {/* <div className=""> */}

                                            <div className="col-md-2 mb-3">
                                                <div className="input-group custom-input-group">
                                                    <SearchBar placeholder="Search menu" />
                                                </div>
                                            </div>

                                            <div className="col-md-2 mb-3">
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
                                                                width: 'calc(100%)', // Adjust the width to accommodate the text and the icon
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
                                            </div>






                                            <div className="col-md-1 mb-3">
                                                <div className="input-group custom-input-group">
                                                    <input type="text" className="form-control custom-form-control" placeholder="Filters" aria-label="Filters" aria-describedby="basic-addon2" />
                                                </div>
                                            </div>
                                            {/* </div> */}
                                            <div className="col-md-5 mb-3"></div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="col-md-2 mb-3">
                                                <Row className="align-items-center">



                                                    <Col style={{ display: 'flex', gap: '10px', }}>
                                                        {/* <span style={{ color: "white" }}>{isPaymentReceived ? 'Payment Received' : 'Payment Pending'}</span>
                                                        <input type="checkbox" id="switch" checked={isPaymentReceived} onChange={handleToggle} />
                                                        <label1 onClick={handleToggle} htmlFor="switch"></label1> */}
                                                        <div style={{ color: "#FFFFFF" }}>Publish</div>


                                                        <input type="checkbox" id="switch" checked={isPaymentReceived} onClick={handleToggle} />
                                                        <label1 onClick={handleToggle} htmlFor="switch"></label1>


                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>




                                    <div className="tab-content  rounded-3 mt-4" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                            <CustomTable
                                                headers={[ 'Status', 'Type', 'Due', 'Name', 'Placed', 'Location', 'Action']}
                                                data={currentItems.map(data => [
                                                data.order_status,
                                                data.delivery_method,
                                                data.due_requested_delivery_time,
                                                data.customer_name,
                                                data.order_date,
                                                data.city])}
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

                                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                        <CustomTable
                                                headers={[ 'Status', 'Type', 'Due', 'Name', 'Placed', 'Location', 'Action']}
                                                data={currentItems.map(data => [
                                                data.order_status,
                                                data.delivery_method,
                                                data.due_requested_delivery_time,
                                                data.customer_name,
                                                data.order_date,
                                                data.city])}
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


                                        <div className="tab-pane fade" id="pills-future" role="tabpanel" aria-labelledby="pills-pills-future">
                                        <CustomTable
                                                headers={[ 'Status', 'Type', 'Due', 'Name', 'Placed', 'Location', 'Action']}
                                                data={currentItems.map(data => [
                                                data.order_status,
                                                data.delivery_method,
                                                data.due_requested_delivery_time,
                                                data.customer_name,
                                                data.order_date,
                                                data.city])}
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
