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
import Frame124311 from '../../../src/images/Frame124311.png';

// import '../../components/SearchBar/tablestyle.css'

// Dummy JSON data
const dummyData = Array.from({ length: 100 }, (_, index) => ({

  Action: `Completed ${index + 1}`,
  Pickup: `Pickup Enabled`,
  Delievry: `Delivery Enabled`,
  Location: `Alberta`,
}));







function OrderSettings() {
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
  const page = "OrdersSetting";

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

  const handleToggle = (index) => {
    setIsPaymentReceived(!isPaymentReceived); // Toggle the state
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
                      <button className="nav-link  fw-semibold position-relative active" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Locations</button>


                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link  fw-semibold position-relative" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Notification </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button className="nav-link  fw-semibold position-relative" id="pills-future-tab" data-bs-toggle="pill" data-bs-target="#pills-future" type="button" role="tab" aria-controls="pills-future" aria-selected="false">Pages </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button className="nav-link  fw-semibold position-relative" id="pills-history-tab" data-bs-toggle="pill" data-bs-target="#pills-history" type="button" role="tab" aria-controls="pills-history" aria-selected="false">Taxes </button>

                    </li>

                  </ul>





                  <div className="tab-content  rounded-3 mt-4" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                      <CustomTable

                        headers={['Location', 'Pickup', 'Delievry', 'Action']}

                        data={currentItems.map(data => [
                          data.Location,
                          data.Pickup,
                          data.Delievry,
                        ])}


                        actions={[{ icon: <IoIosEye style={{ color: 'white', fontSize: '20px' }} />, onClick: 'handleEdit' }]}

                      />


                    </div>

                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                      <CustomTable
                        headers={['Location', 'Pickup', 'Delievry', 'Action']}
                        data={currentItems.map(data => [
                          data.Location,
                          data.Pickup,
                          data.Delievry,
                        ])}
                        actions={[{ icon: <IoIosEye style={{ color: 'white', fontSize: '20px' }} />, onClick: 'handleEdit' }]}
                      />
                    </div>


                    <div className="tab-pane fade" id="pills-future" role="tabpanel" aria-labelledby="pills-pills-future">
                      <CustomTable
                        headers={['Location', 'Pickup', 'Delievry', 'Action']}
                        data={currentItems.map(data => [
                          data.Location,
                          data.Pickup,
                          data.Delievry,
                        ])}
                        actions={[{ icon: <IoIosEye style={{ color: 'white', fontSize: '20px' }} />, onClick: 'handleEdit' }]}
                      />

                    </div>

                    <div className="tab-pane fade" id="pills-history" role="tabpanel" aria-labelledby="pills-pills-history">
                      <CustomTable
                        headers={['Location', 'Pickup', 'Delievry', 'Action']}
                        data={currentItems.map(data => [
                          data.Location,
                          data.Pickup,
                          data.Delievry,
                        ])}
                        actions={[{ icon: <IoIosEye style={{ color: 'white', fontSize: '20px' }} />, onClick: 'handleEdit' }]}
                        isPaymentReceived={isPaymentReceived}
                        handleToggle={handleToggle}
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

export default OrderSettings
