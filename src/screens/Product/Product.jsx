import React from 'react'
import '../Dashboard/main.css'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BiCalendar } from 'react-icons/bi'
import PageTitle from '../../components/Breadcrumb/PageTitle';


function Product() {
    const page = "Dashboard";
  return (
    <main id="main" className='main'>
         <PageTitle page={page} />

   
  </main>
  )
}

export default Product
