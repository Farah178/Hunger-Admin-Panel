import React from 'react'
import PageTitle from '../../components/Breadcrumb/PageTitle'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { Tab, Tabs, Button, Table, Form } from 'react-bootstrap';
import { BiEdit, BiShow } from 'react-icons/bi';
import { FaPlus, FaCog } from 'react-icons/fa';
import SearchBar from '../../components/SearchBar/SearchBar';
import { BsSearch } from 'react-icons/bs';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import DragandDropFile from './DragandDropFile';
import './gallerystyle.css'

// Dummy JSON data
const dummyData = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  messageSubject: `Subject ${index + 1}`,
  location: `Location ${index + 1}`,
  tag: `Tag ${index + 1}`,
  sentAt: `2024-02-${index + 1}`,
  message: `Message ${index + 1}`
}));


function Gallery() {
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

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Function to toggle button enable/disable
  const toggleButton = () => {
    setIsButtonEnabled(!isButtonEnabled);
  };


  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleButtonClick1 = () => {
    // Your button 1 click handling logic here
  };
  const handleButtonClick2 = () => {
    // Your button 1 click handling logic here
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
  const page = "Items";

  const [isFocused, setIsFocused] = useState(false);

  const handleButtonClickSearch = () => {
    setIsFocused(true);
  }




  return (


    <main id="main" className='main'>
      <Card className="overflow-auto card-custom">
        <Card.Body>
          <PageTitle page="Gallery" />
          <DragandDropFile  /> 
          <div >
            <div className="search-container">
                <input type="text" className="search-input" placeholder="Search..." style={{ width: '70%' }} />
                <button className="sort-button" style={{background:'transparent', width: '15%' ,color:'white'}}>SORT BY NAME</button>
                <button className="sort-button" style={{ width: '15%',backgroundColor:`var(--second)`,borderColor:`var(--second)` }}>SORT BY DATE</button>
            </div>
        </div>
          {/* 4 cards */}
          <Row className="g-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Col key={idx}>
                <Card className='Card1'>
                  <div className='card-parent-revenue'>
                    <div className='heading'>Online Ordering Revenue</div>
                    <div className='number'>$ 4,1244.00</div>
                    <div className='response'><i className="bi bi-arrow-up-right"></i>  Up 32% over the past 7 days</div>
                  </div>
                </Card>
              </Col>
            ))}
            <Col>
              <Card className='Card1'>
                <div className='card-parent-revenue'>
                  <div className='heading'>11Online Ordering Revenue</div>
                  <div className='number'>$ 4,1244.00</div>
                  <div className='response'><i className="bi bi-arrow-up-right"></i>  Up 32% over the past 7 days</div>
                </div>
              </Card>
            </Col>
          </Row>
        </Card.Body>

      </Card>


    </main>
  )
}

export default Gallery
