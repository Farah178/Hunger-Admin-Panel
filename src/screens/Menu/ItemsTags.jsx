import React, { useEffect } from 'react'
import PageTitle from '../../components/Breadcrumb/PageTitle'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { Tab, Tabs, Button, Table, Form } from 'react-bootstrap';
import { BiEdit, BiShow, BiTrash } from 'react-icons/bi';
import './allMenus.css'
import { FaPlus, FaCog } from 'react-icons/fa';
import SearchBar from '../../components/SearchBar/SearchBar';
import { BsSearch } from 'react-icons/bs';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import CustomTable from '../../components/Tables/SimpleCustomTable/SimpleCustomTable';
import Pagination from '../../components/Pagination/Pagination';
import { IoIosEye } from 'react-icons/io';
import TableSearchBar from '../../components/SearchBar/TableSearch';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../../api/api';
import { setItemTag } from '../../redux/actions/dataActions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { convertToBase64 } from '../../utils/Appconstants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


// Dummy JSON data
const dummyData = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  item_name: `Item Name ${index + 1}`,
  abbrivation: `https://via.placeholder.com/50x50.png?text=Menu${index + 1}`,
  total_items: `Tag ${index + 1}`,
}));


const ItemTags = () => {
  const [inputFocused, setInputFocused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const itemtagData = useSelector(state => state.data.item_tag);
  const [onviewclicked, setOnviewclicked] = useState(false)
  const [initialData, setInitialData] = useState({id:'', name: '', abbreviation: '',photo:null });
  const [isValidForm, setIsValidForm] = useState(false); // State variable to store isValid value

  useEffect(() => {
    GetItemsTagData();
    console.log("GetItemsTagData====1111");
  }, []); // Empty dependency array ensures that the effect runs only once
  
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

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);


  const handleCloseModal = () => {
    setShowModal(false);
    setOnviewclicked(false);
  };
  const handleButtonClick1 = () => {
    // Your button 1 click handling logic here
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  console.log(itemtagData,'itemtagData===')
  const currentItems = itemtagData.slice(indexOfFirstItem, indexOfLastItem);

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

  const totalPages = Math.ceil(itemtagData.length / itemsPerPage);
  const displayPages = Math.min(totalPages, 3); // Ensure we display maximum 3 pages

  // Search code 
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    console.log(value, 'valuessssss')
    setSearchValue(value);
  };

  // Disclaimer

  const [selectedDisclaimers, setSelectedDisclaimers] = useState([]);

  // Function to add disclaimer
  const addDisclaimer = () => {
    const newDisclaimer = "New Disclaimer"; // You can customize the default value
    setSelectedDisclaimers(prevDisclaimers => [...prevDisclaimers, newDisclaimer]);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    abbreviation: Yup.string().required('Abbreviation is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Check if photo exists and convert it to base64 if it does
      if (values.photo && values.photo instanceof Blob) {
        const base64Image = await convertToBase64(values.photo);
        // Update the values with the base64-encoded image
        values.photo = base64Image;
      } else {
        // If photo doesn't exist or is not a Blob, remove it from the values object
        delete values.photo;
      }
  
      if (onviewclicked) {
        API.getInstance()
          .menu
          .put(`/api/tag/${values.id}`, values)
          .then((res) => {
            GetItemsTagData();
            toast.success('Tag updated successfully!');
            handleCloseModal();
          })
          .catch((error) => {
            console.error(error);
            toast.error('Failed to update tag!');
          });
      } else {
        API.getInstance()
          .menu
          .post("/api/tag", values)
          .then((res) => {
            GetItemsTagData();
            toast.success('Tag added successfully!');
            handleCloseModal();
          })
          .catch((error) => {
            console.error(error);
            toast.error('Failed to add tag!');
          });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };


  const handleOnView = async (row) => {
    console.log(row[0],'rowwwww')
    await fetchInitialData(row[0]);
    console.log(initialData,'initialData====')
    setOnviewclicked(true)
    setShowModal(true);
  }

  const fetchInitialData = async (id) => {
    try {
      console.log('fetchInitialData==id',id)
      const response = await API.getInstance().menu.get(`/api/tag?id=${id}`); // Adjust the API endpoint as needed
      console.log(response.data.result.data,'response.data====>')
      const data = response.data.result.data
      console.log(data,'data====>')
      const tag_data ={id:data.id, name: data.name, abbreviation:data.abbreviation, photo: data.photo }
      console.log(tag_data,'tag_data======')
      setInitialData(tag_data); // Assuming response.data is an object with menu_title, menu_display_title, disclaimer, and backgroundImage 
      // properties
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const handleOpenCreateItemTag = () => {
    setShowModal(true);
    setInitialData({id:'', name: '', abbreviation: '',photo:null })
  };


  return (
    <main id="main" className='main'>
      <Card className="overflow-auto card-custom">
        <Card.Body>
          <PageTitle page="Items" />
          <div className='Tab-parent'>
            <div className='Tab-parent'>

              <div>
                <div className="container">



                  <TableSearchBar placeholder="Search items" onSearch={handleSearch} />


                  <div className="tab-content  rounded-3 mt-4" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                      {/* <CustomTable
                        headers={['#', 'Name', 'Abbrivation', 'Total Items', 'Action']}
                        data={currentItems.map(data => [data.id, data.name, data.add_img_path, data.tag_count])}
                        actions={[{ icon: <BiEdit style={{ color: 'white', fontSize: '20px' }} />, onClick: 'handleEdit' }, { icon: <BiTrash style={{ color: 'white', fontSize: '20px' }} />, onClick: 'handleEdit' }]}
                      /> */}
                      <CustomTable
                        headers={['Id', 'Name', 'Abbrivation','icon', 'Total Items', 'Action']}
                        data={currentItems.map(data => [data.id, data.name, data.abbreviation, data.photo, data.tag_count])}
                        actions={[{ icon: <BiEdit style={{ color: 'white', fontSize: '20px' }} />, onClick: handleOnView }, { icon: <BiTrash style={{ color: 'white', fontSize: '20px' }} />, onClick: 'handleEdit' }]}
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
                  <FaPlus style={{ marginRight: '4px' }} />
                  <span style={{ marginLeft: '5px' }}>Add New Item Tag</span>
                </Button>


              </div>;
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
                tabIndex={0}
                onClick={handleOpenCreateItemTag} // Open modal on button click
              >
                <FaPlus style={{ marginRight: '4px' }} />
                <span style={{ marginLeft: '5px' }}>Add New Item Tag</span>
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Modal */}
      {/* <Modal show={showModal} onHide={handleCloseModal} centered> */}
      <Modal show={showModal} onHide={handleCloseModal} centered backdrop="static" keyboard={false} >
      <Modal.Header style={{  borderLeftStyle: '10px', borderBottom: "none", display: "flex", justifyContent: "space-between", backgroundColor: `var(--card-dark-shade)` }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Modal.Title style={{ color: 'white' }}>New Item Tag</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: `var(--card-dark-shade)`}}>
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
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <div className="input__wrapper" style={{ width: "100%" }}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input__field"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ width: "100%" }}
                  />
                  <label htmlFor="name" className="input__label">
                    Name
                  </label>
                </div>
                {touched.name && errors.name && <div className="error-message">{errors.name}</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="input__wrapper" style={{ width: "100%" }}>
                  <input
                    type="text"
                    name="abbreviation"
                    placeholder="Abbreviation"
                    className="input__field"
                    value={values.abbreviation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ width: "100%" }}
                  />
                  <label htmlFor="abbreviation" className="input__label">
                    Abbrevation
                  </label>
                </div>
                {touched.abbreviation && errors.abbreviation && <div className="error-message">{errors.abbreviation}</div>}
              </Form.Group>

              <Form.Group className="mb-3" style={{ position: 'relative' }}>
                <div className="input__wrapper" style={{ width: "100%" }}>
                  <input
                    type="file"
                    name="photo"
                    className="input__field"
                    accept="image/*"
                    onChange={(event) => setFieldValue("photo", event.currentTarget.files[0])}
                    onBlur={handleBlur}
                    style={{ width: "100%" }}
                  />
                  <label htmlFor="photo" className="input__label">
                    Add Photo
                  </label>
                </div>
                {touched.photo && errors.photo && <div className="error-message">{errors.photo}</div>}
                {/* <Button
                  variant="outline-secondary"
                  style={{
                    border: "none",
                    position: 'absolute',
                    right: '10px',
                    top: '60%',
                    color: "white",
                    color: 'black',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'transparent', // Set background color to transparent
                    boxShadow: 'none', // Remove any box shadow
                    outline: 'none' // Remove outline
                  }}
                  onClick={() => console.log('ADD button clicked')}
                >
                  <i className="bi bi-plus" style={{ color: "white" }}>  ADD</i>
                </Button> */}
              </Form.Group>

              <Form.Group className="mb-3" style={{ position: 'relative' }}>
                
                <img
                  src={values.photo || 'https://via.placeholder.com/150'} 
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
  className="me-md-3 me-0 mb-3 mb-md-0 btn-lg d-flex align-items-center"
  style={{
    height: "40px",
    backgroundColor: 'rgb(180,49,45)',
    fontSize: "12px",
    border: "none",
    marginTop:'20px'
  }}
  disabled={isSubmitting} // Disable the button when submitting
>
  <FaPlus style={{ marginRight: '4px' }} />
  CREATE ITEM TAG
</Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
    </main>
  )
}

export default ItemTags
