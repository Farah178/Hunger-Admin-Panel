import React from 'react'
import PageTitle from '../../components/Breadcrumb/PageTitle'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { Tab, Tabs, Button, Table, Form } from 'react-bootstrap';
import { IoIosEye } from 'react-icons/io';
import './allMenus.css'
import { FaPlus, FaCog } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import Pagination from '../../components/Pagination/Pagination';
import CustomTable from '../../components/Tables/SimpleCustomTable/SimpleCustomTable';
import TableSearchBar from '../../components/SearchBar/TableSearch';
import { API } from "../../../src/api/api";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFooditems, setItemTag, setLocation, setMenu } from '../../redux/actions/dataActions';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { convertToBase64 } from '../../utils/Appconstants';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Dummy JSON data
const dummyData = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `Break Fast Menu ${index + 1}`,
  location: `${index + 1}`,
  items: `Items ${index + 1}`,
  lastupdate: `2024-02-${index + 1}`,
}));

const AllMenus = () => {
  const dispatch = useDispatch();
  const menuData = useSelector(state => state.data.menu);
  const [initialData, setInitialData] = useState({
    id: '',
    menu_title: '',
    menu_display_title: '',
    disclaimer: '',
    backgroundImage: null,
    menu_image: null,
  });
  const [onviewclicked, setOnviewclicked] = useState(false)




  const fetchInitialData = async (id) => {
    console.log('id===11', id)
    try {
      console.log('id===', id)
      const response = await API.getInstance().menu.get(`/api/menu?menu_id=${id}`); // Adjust the API endpoint as needed
      console.log(response.data.result.data, 'response.data====>')
      const data = response.data.result.data
      const menu_data = {
        id: data.id,
        menu_title: data.menu_title,
        menu_display_title: data.menu_display_title,
        disclaimer: data.disclaimer,
        backgroundImage: data.image_path,
        menu_image: data.menu_image,
      }
      console.log(menu_data, 'menu_data====')
      setInitialData(menu_data); // Assuming response.data is an object with menu_title, menu_display_title, disclaimer, and backgroundImage properties
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };
  useEffect(() => {
    GetMenuData()
    GetRestaurentData()
    GetItemsTagData()
    GetFooditemsData()
    // fetchInitialData();
  }, []);

  const GetFooditemsData = async () => {
    console.log('GetFooditemsData===>')
    API.getInstance().base.get("/api/menu-items")
      .then((res) => {
        console.log(res.data.result.data, 'fooditemData====>')
        dispatch(setFooditems(res.data.result.data));
      })
      .catch((error) => {
        // console.log(error, 'fooditemData==error');
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

  const GetMenuData = async () => {
    console.log('GetMenuData')
    API.getInstance().menu.get("/api/menu")
      .then((res) => {
        console.log(res.data.result.data, 'GetMenuData=res111====>')
        dispatch(setMenu(res.data.result.data));
      })
      .catch((error) => {
        // console.log(error, 'GetMenuData');
      })
      .finally(() => {

      });
  }
  const GetRestaurentData = async () => {
    API.getInstance().menu.get("/api/restaurent")
      .then((res) => {
        dispatch(setLocation(res.data.result.data));
      })
      .catch((error) => {
      })
      .finally(() => {
      });
  }


  const [showModal, setShowModal] = useState(false);

  const handleOpenCreateMenu = () => {
    setShowModal(true);
    setInitialData({
      id: '',
      menu_title: '',
      menu_display_title: '',
      disclaimer: '',
      backgroundImage: null,
      menu_image: null
    })
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setOnviewclicked(false);
  };

  // Pagination state ====
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // console.log(menuData, 'menuData===')
  const currentItems = menuData?.slice(indexOfFirstItem, indexOfLastItem);
  const [isValidForm, setIsValidForm] = useState(false); // State variable to store isValid value

  console.log(isValidForm, 'isValidForm===')
  // const currentItems = menuData.slice(indexOfFirstItem, indexOfLastItem);

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

  const totalPages = Math.ceil(menuData?.length / itemsPerPage);
  const displayPages = Math.min(totalPages, 3); // Ensure we display maximum 3 pages





  // Search code 
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (value) => {
    // console.log(value, 'valuessssss')
    setSearchValue(value);
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Check if backgroundImage exists and convert it to base64 if it does
      if (values.backgroundImage && values.backgroundImage instanceof Blob) {
        const base64Image = await convertToBase64(values.backgroundImage);
        // Update the values with the base64-encoded image
        values.backgroundImage = base64Image;
      } else {
        // If backgroundImage doesn't exist or is not a Blob, remove it from the values object
        delete values.backgroundImage;
      }
  
      if (onviewclicked == true) {
        API.getInstance().menu.put(`/api/menu/${values.id}`, values)
        .then((res) => {
          GetMenuData();
          toast.success('Menu updated successfully!'); // Display toaster message
          setSubmitting(false); // Disable form submission
          setModalIsOpen(false); // Close the modal
          handleCloseModal();
        })
        .catch((error) => {
          // Handle error
          toast.error('Failed to update menu!'); // Display failure toaster message
          setSubmitting(false); // Disable form submission
          handleCloseModal();
        });
      } else {
        API.getInstance().menu.post("/api/menu", values)
        .then((res) => {
          GetMenuData();
          toast.success('Menu added successfully!'); // Display toaster message
          setSubmitting(false); // Disable form submission
          setModalIsOpen(false); // Close the modal
          handleCloseModal();
        })
        .catch((error) => {
          // Handle error
          toast.error('Failed to add menu!'); // Display failure toaster message
          setSubmitting(false); // Disable form submission
          handleCloseModal();
        });
      }
      // Disable the menu modal after successfully adding or updating data
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitting(false); // Disable form submission
    }
  };
  



  const validationSchema = Yup.object().shape({
    menu_title: Yup.string().required('Menu Title is required'),
    menu_display_title: Yup.string().required('Menu Display Title is required'),
    disclaimer: Yup.string().required('Disclaimer is required'),
  });

  const handleOnView = async (row) => {
    console.log(row[0], 'rowwwww')
    await fetchInitialData(row[0]);
    console.log(row[0], 'rowwwww111')
    setOnviewclicked(true)
    setShowModal(true);
    console.log(row[0], 'rowwwww222')
  }


  return (


    <main id="main" className='main'>
      <Card className="overflow-auto card-custom">
        <Card.Body>
          <PageTitle page="All Menus" />
          <div className='Tab-parent'>
            <div className='Tab-parent'>

              <div>
                <div className="container">


                  <ul className="nav nav-pills mb-3 " id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link  fw-semibold position-relative active" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">All Menus</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link  fw-semibold position-relative" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Location</button>
                    </li>

                  </ul>

                  <TableSearchBar placeholder="Search menu" onSearch={handleSearch} />


                  <div className="tab-content  rounded-3 mt-4" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                      <CustomTable
                        headers={['Id', 'Name', 'Location', 'Location Name', 'Total Items', 'Last Update', 'Action']}
                        data={currentItems?.map(data => [data.id, data.menu_title, data.menu_location_count, data.unique_location_string, data.menu_item_count, data.m_u_timestamp])}
                        actions={[{ icon: <IoIosEye style={{ color: 'white', fontSize: '20px' }} />, onClick: handleOnView }]}
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
                        headers={['Id', 'Name', 'Location', 'Location Name', 'Total Items', 'Last Update', 'Action']}
                        data={currentItems?.map(data => [data.id, data.menu_title, data.menu_location_count, data.unique_location_string, data.menu_item_count, data.m_u_timestamp])}
                        actions={[{ icon: <IoIosEye style={{ color: 'white', fontSize: '20px' }} />, onClick: handleOnView }]}
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
                  <FaPlus /> <span style={{ marginLeft: '5px' }}>Create New Menu</span>
                </Button>


              </div>
            </div>
            {/* dashboard + Create New Menu button */}
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
                tabIndex={0}
                onClick={handleOpenCreateMenu} // Open modal on button click
              >
                <FaPlus /> <span style={{ marginLeft: '5px' }}>Create New Menu</span>
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header style={{ borderLeftStyle: '10px', borderBottom: "none", display: "flex", justifyContent: "space-between", backgroundColor: `var(--card-dark-shade)` }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Modal.Title style={{ color: 'white' }}>{onviewclicked ? 'Update Menu' : 'New Menu'}</Modal.Title>
          </div>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: `var(--card-dark-shade)` }}>
          <Formik
            enableReinitialize
            initialValues={initialData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true} // Validate on change to update isValidForm state
            validateOnBlur={false} // Disable onBlur validation to prevent unexpected form state changes
            validate={(values) => {
              // Manually validate the form on change
              validationSchema.validate(values)
                .then(() => setIsValidForm(true))
                .catch(() => setIsValidForm(false));
            }}
          >
            {({ isValid, values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <div className="input__wrapper" style={{ width: "100%" }}>
                    <Field
                      type="text"
                      placeholder="Menu Title"
                      className="input__field"
                      name="menu_title"
                      value={values.menu_title}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="menu_title" className="input__label">Menu Title<span style={{ color: 'red' }}> *</span></label>
                  </div>
                  <ErrorMessage name="menu_title" component="div" className="error-message" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <div className="input__wrapper" style={{ width: "100%" }}>
                    <Field
                      type="text"
                      placeholder="Menu Display Title"
                      className="input__field"
                      name="menu_display_title"
                      value={values.menu_display_title}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="menu_display_title" className="input__label">Menu Display Title<span style={{ color: 'red' }}> *</span></label>
                  </div>
                  <ErrorMessage name="menu_display_title" component="div" className="error-message" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <div className="input__wrapper" style={{ width: "100%" }}>
                    <Field
                      type="text"
                      placeholder="Disclaimer"
                      className="input__field"
                      name="disclaimer"
                      value={values.disclaimer}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="disclaimer" className="input__label">Disclaimer<span style={{ color: 'red' }}> *</span></label>
                  </div>
                  <ErrorMessage name="disclaimer" component="div" className="error-message" />
                </Form.Group>

                <Form.Group className="mb-3" style={{ position: 'relative' }}>
                  <div className="input__wrapper" style={{ width: "100%" }}>
                    <input
                      type="file"
                      className="input__field"
                      name="backgroundImage"
                      accept="image/*"
                      onChange={(event) => setFieldValue("backgroundImage", event.currentTarget.files[0])}
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="backgroundImage" className="input__label">Background Image</label>
                  </div>
                  {/* <ErrorMessage name="backgroundImage" component="div" className="error-message" /> */}
                  {/* <Button
                    variant="outline-secondary"
                    style={{
                      border: "none",
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                      outline: 'none'
                    }}
                    onClick={() => console.log('ADD button clicked')}
                  >
                    <i className="bi bi-plus" style={{ color: "white" }}> ADD</i>
                  </Button> */}
                </Form.Group>

                <Form.Group className="mb-3" style={{ position: 'relative' }}>

                  <img
                    src={values.menu_image || 'https://via.placeholder.com/150'}
                    alt="icon"
                    style={{
                      borderRadius: '10%',
                      width: '50px',
                      height: '50px',
                    }}
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = 'https://img.freepik.com/free-photo/red-gift-tag-price-ticket-with-red-ribbon-isolated-white_1101-2266.jpg?w=1800&t=st=1707896796~exp=1707897396~hmac=d8cb9dbcb33daebdc61816b0f459a94081c770115bccc6f3047aeeac79359c05'; // Set default image source
                    }}
                  />

                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="me-md-2 me-0 mb-2 mb-md-0 btn-lg d-flex align-items-center"
                  style={{
                    height: "40px",
                    backgroundColor: !isValidForm ? 'rgba(180, 49, 45, 0.7)' : 'rgb(180,49,45)',
                    fontSize: "12px",
                    border: "none",
                    fontFamily: "Popins",
                  }}
                  disabled={!isValidForm}
                  // Add onClick event handler to close the modal
                >
                  <FaPlus style={{ marginRight: '4px' }} />
                  {
                    onviewclicked ? <span>UPDATE MENU</span> : <span>CREATE NEW MENU</span>
                  }
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </main>
  )
}

export default AllMenus
