import React from 'react'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PageTitle from '../../components/Breadcrumb/PageTitle';
import { useState } from 'react';
function OverView() {

  const [selectedOption, setSelectedOption] = useState('');

    // Function to handle dropdown item click
    const handleDropdownItemClick = (option) => {
        console.log(option,"option==>");
        setSelectedOption(option);
    };
  const responseOptions = [
    { color: 'blue', text: 'Response 1' },
    { color: 'green', text: 'Response 2' },
    { color: 'red', text: 'Response 3' },
    // Add more response options as needed
  ];
  const page = "Overview";
  return (
    <main id="main" className='main'>
      {/* <PageTitle page="Overview" /> */}
      <Card className="overflow-auto card-custom ">
        <Card.Body>
          <PageTitle page={page} />

          {/* <div className='dash-sub-heading'>Website Overview</div> */}
          {/* 2 small cards */}
          <Row xs={1} md={4} className="g-4">
            <Col >
            <Card className='Card1'>
                <Card.Body>
              
                </Card.Body>
              </Card>
            </Col>

            <Col>
            
               
               
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
                                           
               
             
            </Col>
            <Col>

            </Col>
            {/* Add more columns if needed */}
          </Row>
          <br />
          {/* 
       */}
          {/* 6 cards */}
          <Row xs={1} md={3} className="g-4">
            {Array.from({ length: 6 }).map((_, idx) => {
              // Randomly select a response option
              const randomResponse = responseOptions[Math.floor(Math.random() * responseOptions.length)];
              return (
                <Col key={idx}>
                  <Card className='Card1'>
                    <div className='card-parent-revenue'>
                      <div className='heading'>Heading {idx + 1}</div>
                      <div className='number'>$ {Math.floor(Math.random() * 10000) + 1000}</div>
                      <div className='response' style={{ color: randomResponse.color }}>
                        <i className="bi bi-arrow-up-right-circle-fill" style={{ color: randomResponse.color }}></i> {randomResponse.text}
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>

        </Card.Body>
      </Card>
    </main>

  );
}

export default OverView
