import React, { useEffect } from 'react'
import './main.css'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BiCalendar } from 'react-icons/bi'
import PageTitle from '../../components/Breadcrumb/PageTitle';
import { useDispatch } from 'react-redux';
import { setAdminUserdata, setFooditems, setItemTag, setMenu, setOrders } from '../../redux/actions/dataActions';
import { API } from '../../api/api';
function Main() {
  const dispatch = useDispatch();
  useEffect(() => {
    GetMenuData()
    GetFooditemsData()
    GetItemsTagData()
    GetOrderData()
  }, []);
  const GetMenuData = async () => {
    console.log('GetMenuData')
    API.getInstance().menu.get("/api/menu")
      .then((res) => {
        dispatch(setMenu(res.data.result.data));
      })
      .catch((error) => {
      })
      .finally(() => {
      });
  }

  const GetFooditemsData = async () => {
    console.log('GetFooditemsData===>')
    API.getInstance().base.get("/api/menu-items")
      .then((res) => {
        console.log(res.data.result.data, 'fooditemData====>')
        dispatch(setFooditems(res.data.result.data));
      })
      .catch((error) => {
      })
      .finally(() => {
      });
  }

  const GetItemsTagData = async () => {
    console.log("GetItemsTagData====22222");
    try {
      API.getInstance().menu.get("/api/tag")
      .then((res) => {
        const data = res.data.result.data;
        console.log(data, 'itemtagData====API');
        dispatch(setItemTag(data));
      })
      .catch((error) => {
        // console.log(error, 'GetMenuData');
      })
      .finally(() => {
      });
    } catch (error) {
      console.log(error, 'itemtagData==error');
    }
  };

  const GetOrderData = async () => {
    API.getInstance().base.get("/api/orders")
      .then((res) => {
        dispatch(setOrders(res.data.result.data));
      })
      .catch((error) => {
        console.log(error, 'orderData==error');
      })
      .finally(() => {
       
      });
  }

  const page = "Dashboard";
  return (
    <main id="main" className='main'>

      <Card className="overflow-auto card-custom ">

        <Card.Body>

          <PageTitle page={page} />

          {/* 2 small cards */}
          <Row xs={1} md={4} className="g-4">
            <Col >
              <Card className='Card1'>
                <Card.Body>

                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card className='Card1'>
                <Card.Body>
                  {/* <div className="d-flex align-items-center">
                  <Card.Text className="ms-2">Locations</Card.Text>
                  <i className="bi bi-chevron-down ms-2"></i> 
                </div> */}
                  {/* Dropdown content */}
                </Card.Body>
              </Card>
            </Col>
            <Col>

            </Col>
            {/* Add more columns if needed */}
          </Row>
          <br />
          {/* <br /> */}
          <div className='dash-sub-heading'>Website Overview</div>
          {/* 3 cards */}
          <Row className="g-3">
            <Col md={4}>
              <Card className='Card'>
                <div className='card-super-parent'>
                  <div className='card-parent'>
                    <div className='card-icon'>
                      <i className="bi bi-graph-up-arrow"></i>
                    </div>
                    <div className='card-right'>
                      <div className='car-right-txt'>Total Site Vistits</div>
                      <div className='card-right-number'>722</div>
                    </div>
                  </div>
                  <div className='card-parent'>
                    <div className='card-icon'>
                      <i className="bi bi-graph-up-arrow"></i>

                    </div>
                    <div className='card-right'>
                      <div className='car-right-txt'>Total Site Vistits</div>
                      <div className='card-right-number'>722</div>
                    </div>
                  </div>
                </div>

              </Card>
            </Col>
            <Col md={4}>
              <Card className='Card'>
                <div className='card-super-parent'>
                  <div className='card-parent'>
                    <div className='card-icon'>
                      <i className="bi bi-graph-up-arrow"></i>
                    </div>
                    <div className='card-right'>
                      <div className='car-right-txt'>Total Site Vistits</div>
                      <div className='card-right-number'>722</div>
                    </div>
                  </div>
                  <div className='card-parent'>
                    <div className='card-icon'>
                      <i className="bi bi-graph-up-arrow"></i>

                    </div>
                    <div className='card-right'>
                      <div className='car-right-txt'>Total Site Vistits</div>
                      <div className='card-right-number'>722</div>
                    </div>
                  </div>
                </div>

              </Card>
            </Col>
            <Col md={4}>
              <Card className='Card'>
                <div className='card-super-parent'>
                  <div className='card-parent'>
                    <div className='card-icon'>
                      <i className="bi bi-graph-up-arrow"></i>
                    </div>
                    <div className='card-right'>
                      <div className='car-right-txt'>Total Site Vistits</div>
                      <div className='card-right-number'>722</div>
                    </div>
                  </div>
                  <div className='card-parent'>
                    <div className='card-icon'>
                      <i className="bi bi-graph-up-arrow"></i>

                    </div>
                    <div className='card-right'>
                      <div className='car-right-txt'>Total Site Vistits</div>
                      <div className='card-right-number'>722</div>
                    </div>
                  </div>
                </div>

              </Card>
            </Col>
          </Row>
          <br />

          {/* 4 cards */}
          <Row xs={1} md={2} className="g-4">
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

export default Main
