import React from 'react'
import PageTitle from '../../components/Breadcrumb/PageTitle'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { Tab, Tabs, Button, Table } from 'react-bootstrap';
import { BiEdit, BiShow } from 'react-icons/bi';
import { IoIosEye } from 'react-icons/io';
import './textMessages.css'
import { FaPlus, FaCog } from 'react-icons/fa';
import Pagination from '../../components/Pagination/Pagination';
import CustomTable from '../../components/Tables/SimpleCustomTable/SimpleCustomTable';

// Dummy JSON data
const dummyData = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  messageSubject: `Subject ${index + 1}`,
  location: `Location ${index + 1}`,
  tag: `Tag ${index + 1}`,
  sentAt: `2024-02-${index + 1}`,
  message: `Message ${index + 1}`
}));


function Marketing() {

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
  const page = "Marketing";
  return (
    <main id="main" className='main'>

      <Card className="overflow-auto card-custom">
        <Card.Body>
          <PageTitle page="Email Messages" />
          <div className='Tab-parent'>
            <div>
              <div className="container">
                <ul className="nav nav-pills mb-3 " id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link  fw-semibold position-relative active" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Mass Messages</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link  fw-semibold position-relative" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Automated Messages</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link  fw-semibold position-relative" id="pills-draft-tab" data-bs-toggle="pill" data-bs-target="#pills-draft" type="button" role="tab" aria-controls="pills-draft" aria-selected="false">Draft Messages</button>
                  </li>
                </ul>

                <div className="tab-content  rounded-3 mt-4" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                    <CustomTable
                      headers={['#', 'Message Subject', 'Location', 'Tag', 'Sent At', 'Message', 'Action']}
                      data={currentItems.map(data => [data.id, data.messageSubject, data.location, data.tag, data.sentAt, data.message])}
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
                      headers={['#', 'Message Subject', 'Location', 'Tag', 'Sent At', 'Message', 'Action']}
                      data={currentItems.map(data => [data.id, data.messageSubject, data.location, data.tag, data.sentAt, data.message])}
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

                  <div className="tab-pane fade" id="pills-draft" role="tabpanel" aria-labelledby="pills-draft-tab">
                  <CustomTable
                      headers={['#', 'Message Subject', 'Location', 'Tag', 'Sent At', 'Message', 'Action']}
                      data={currentItems.map(data => [data.id, data.messageSubject, data.location, data.tag, data.sentAt, data.message])}
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
              <Button
                variant="primary"
                className="me-md-2 me-0 mb-2 mb-md-0 btn-lg"
                style={{
                  height: "40px",
                  backgroundColor: 'rgb(180,49,45)',
                  fontSize: "12px",
                  border: "none",
                  fontFamily: "Popins"
                }}
                tabIndex={0} // Add tabIndex attribute and set it to 0
              >
                <FaPlus /> <span style={{ marginLeft: '5px' }}>New Mass Message</span>
              </Button>
              <Button
                variant="secondary"
                className="btn-lg ms-2 d-flex align-items-center" // Add margin to the left side and align items vertically
                style={{
                  height: "40px",
                  backgroundColor: "transparent",
                  fontSize: "12px",
                  fontFamily: "Popins",
                  // position: "absolute",
                  // Add more styling if needed
                }}
                tabIndex={0} // Add tabIndex attribute and set it to 0
              >
                <FaCog style={{ marginRight: '5px' }} /> {/* Add margin to the right of the icon */}
                <span>Settings</span>
              </Button>
            </div>;
          </div>
        </Card.Body>
      </Card>
    </main>
  )
}

export default Marketing
