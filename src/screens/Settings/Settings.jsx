import React from 'react'
import '../../screens/Dashboard/main.css'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BiCalendar } from 'react-icons/bi'
import PageTitle from '../../components/Breadcrumb/PageTitle';
import Orders from '../../../src/images/Orders.png'
import { useState } from 'react';
import './settings.css';
import { Link, useNavigate } from 'react-router-dom';
import MyProfile from './MyProfile';

function Settings() {
    const [clickedCard, setClickedCard] = useState(null);
    const navigate = useNavigate();

    const handleCardClick = (idx) => {
        console.log(idx, 'click====>');
        switch (idx) {
            case "My Profile":
                navigate('/MyProfile');
                break;

            case "Billing / Payment":
                navigate('/billing-payment');
                break;
            case "Team Managment":
                navigate('/team-management');
                break;
            case "Integration":
                navigate('/integration');
                break;
            case "General":
                navigate('/general');
                break;
            case "Location & Hours":
                navigate('/locationhours');
                break;
            case "Team Managment":
                navigate('/restau-team-management');
                break;
            default:
                break;
        }
    };

    const cardNames = ["My Profile", "Billing / Payment", "Team Managment", "Integration"];
    const cardNamesRestaurent = ["General", "Location & Hours", "Team Managment"];

    const page = "Settings";
    return (
        <main id="main" className='main'>

            <Card className="overflow-auto card-custom ">

                <Card.Body>

                    <PageTitle page={page} />


                    <br />

                    {/* 4 cards */}
                    <div>
                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{ color: 'white', fontWeight: 'normal', fontSize: '15px', textAlign: 'left', marginLeft: '10px' }}>Account</h4>
                            <Row xs={1} md={4} className="g-4">
                                {Array.from({ length: 4 }).map((_, idx) => (
                                    <Col key={idx}>

                                        <Card
                                            className={`Card1 ${clickedCard === idx ? 'clicked' : ''}`}
                                            onClick={() => handleCardClick(cardNames[idx])}
                                        >
                                            <div className='card-parent-revenue' style={{ textAlign: 'left', paddingLeft: '10px' }}>
                                                <img src={Orders} alt={`Logo ${idx}`} style={{ display: 'block', marginBottom: '10px' }} />
                                                <div className='heading' style={{ color: '#fff', textAlign: 'left' }}>{cardNames[idx]}</div>
                                            </div>
                                        </Card>

                                    </Col>
                                ))}
                            </Row>
                        </div>

                        <div>
                            <div style={{ marginBottom: '20px' }}>
                                <h4 style={{ color: 'white', fontWeight: 'normal', fontSize: '15px' }}>Restaurent Information</h4>
                                <Row xs={1} md={4} className="g-4"> {/* Add another Row for additional cards */}
                                    {Array.from({ length: 3 }).map((_, idx) => (
                                        <Col key={idx}>
                                            <Card className={`Card1 ${clickedCard === idx ? 'clicked' : ''}`}
                                                onClick={() => handleCardClick(cardNamesRestaurent[idx])}>
                                                <div className='card-parent-revenue' style={{ textAlign: 'left', paddingLeft: '10px' }}>
                                                    <img src={Orders} alt={`Logo ${idx}`} style={{ display: 'block', marginBottom: '10px' }} />
                                                    <div className='heading' style={{ color: '#fff', textAlign: 'left' }}>{cardNamesRestaurent[idx]}</div>
                                                </div>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </div>
                    </div>


                </Card.Body>
            </Card>
        </main>

    )
}

export default Settings
