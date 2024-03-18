import React, { useEffect } from 'react'
import PageTitle from '../../components/Breadcrumb/PageTitle'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { Tab, Tabs, Button, Table ,Form} from 'react-bootstrap';
import { BiEdit, BiShow } from 'react-icons/bi';
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
import { API } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaulttax, setFooditems, setItemTag, setLocation, setMenu } from '../../redux/actions/dataActions';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { debounce } from 'lodash';
import Multiselect from 'multiselect-react-dropdown';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Dummy JSON data
const dummyData = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  item_name: `Item Name ${index + 1}`,
  menu: `Menu ${index + 1}`,
  location: `Tag ${index + 1}`,
  price: `$200${index + 1}`,
}));

const Items = (props) => {
  
  const [inputFocused, setInputFocused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const dispatch = useDispatch();
  const fooditemData = useSelector(state => state.data.food_items);
  const menuData = useSelector(state => state.data.menu);
  const locationData = useSelector(state => state.data.location);
  const itemTagData = useSelector(state => state.data.item_tag);
  const defaultTaxData = useSelector(state => state.data.default_tax);

  const [onviewclicked, setOnviewclicked] = useState(false)
  const [initialData, setInitialData] = useState({ id: '',select_menu:[],selected_menu_list:[],location:[],selected_location_list:[],item_tag:[],select_item_tag:[],default_tax_rate:[],select_default_tax_rate:[],name:'',description:'',amount:'',display_photo:false,poppable:false ,online_order_available:false,taxable:false, });
  const [isValidForm, setIsValidForm] = useState(false); // State variable to store isValid value

  useEffect(() => {
    const fetchData = async () => {
        await GetFooditemsData();
        UpdateData();
        GetItemTagData();
        GetMenuData();
        GetRestaurentData();
        GetDefaultTaxData();
    };

    fetchData();
}, []);

  const UpdateData = async () => {
    // console.log(menuData, 'menuData===')
    setInitialData(prevState => ({
      ...prevState,
      select_menu: menuData
    }));
    // console.log(initialData['select_menu'], 'select_menu=====')
    
    // console.log(locationData, 'location===111')
    setInitialData(prevState => ({
      ...prevState,
      location: locationData
    }));
    setInitialData(prevState => ({
      ...prevState,
      item_tag: itemTagData
    }));
    

    console.log(defaultTaxData, 'default_tax_rate=====11')
    setInitialData(prevState => ({
      ...prevState,
      default_tax_rate: defaultTaxData
    }));
    // console.log(initialData['default_tax_rate'], 'default_tax_rate=====22')
  }

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

  const GetItemTagData = async () => {
    API.getInstance().menu.get("/api/tag")
      .then((res) => {
        dispatch(setItemTag(res.data.result.data));
      })
      .catch((error) => {
      })
      .finally(() => {
      });
  }

  const GetMenuData = async () => {
    // console.log('GetMenuData')
    API.getInstance().menu.get("/api/menu")
      .then((res) => {
        // // console.log(res.data.result.all_menu_data, 'GetMenuData=res111====>')
        dispatch(setMenu(res.data.result.data));
      })
      .catch((error) => {
        // // console.log(error, 'GetMenuData');
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

  const GetDefaultTaxData = async () => {
    API.getInstance().menu.get("/api/default-tax")
      .then((res) => {
        dispatch(setDefaulttax(res.data.result.data));
      })
      .catch((error) => {
      })
      .finally(() => {
      });
  }

  const handleCreateMenu = () => {
    setShowModal(true);
    const menu_item_data = { id: '',select_menu:[],selected_menu_list:[],location:[],selected_location_list:[],item_tag:[],select_item_tag:[],default_tax_rate:[],select_default_tax_rate:[],name:'',description:'',amount:'',display_photo:false,poppable:false,online_order_available:false,taxable:false}

    // console.log(tag_data, 'tag_data======')
    setInitialData(menu_item_data);

    setInitialData(prevState => ({
      ...prevState,
      select_menu: menuData
    }));
    setInitialData(prevState => ({
      ...prevState,
      location: locationData
    }));
    setInitialData(prevState => ({
      ...prevState,
      item_tag: itemTagData
    }));
    setInitialData(prevState => ({
      ...prevState,
      default_tax_rate: defaultTaxData
    }));
  };

  // Function to toggle button enable/disable
  const toggleButton = () => {
    setIsButtonEnabled(!isButtonEnabled);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setOnviewclicked(false);
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
  const currentItems = fooditemData?.slice(indexOfFirstItem, indexOfLastItem);

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

  const totalPages = Math.ceil(fooditemData?.length / itemsPerPage);
  const displayPages = Math.min(totalPages, 3); // Ensure we display maximum 3 pages


  // / Display Photo
  const [isDisplayPhoto, setIsDisplayPhoto] = useState(false);

  const handleToggleDisplayPhoto = () => {
    setIsDisplayPhoto(!setIsDisplayPhoto); // Toggle the state
  };

  // Poppable

  const [isPopable, setIsPopable] = useState(false);

  const handleTogglePoppable = () => {
    setIsPopable(!setIsPopable); // Toggle the state
  };

  const [selectedOption, setSelectedOption] = useState('');


  // Search code 
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    // console.log(value, 'valuessssss')
    setSearchValue(value);
  };

  const [selectedOptionItem, setselectedOptionItem] = useState('');

  // Function to handle dropdown item click
  const handleDropdownItemsClick = (option) => {
    // console.log(option, "option==>");
    setselectedOptionItem(option);
  };

  const [selectedLocationItemsOption, setselectedLocationItemsOption] = useState('');

  // Function to handle dropdown item click
  const handleDropdownItemClickLocationItems = (option) => {
    // console.log(option, "option==>");
    setselectedLocationItemsOption(option);
  };


  const [selectedLocationMenuName, setselectedLocationMenuName] = useState('');

  // Function to handle dropdown item click
  const handleDropdownItemClickMenuName = (option) => {
    // console.log(option, "option==>");
    setselectedLocationMenuName(option);
  };


  const [selectedLocationMenuLocation, setselectedLocationMenuLocation] = useState('');

  // Function to handle dropdown item click
  const handleDropdownItemClickMenuLocation = (option) => {
    // console.log(option, "option==>");
    setselectedLocationMenuLocation(option);
  };


  const [selectedLocationItemsName, setselectedLocationItemsName] = useState('');

  // Function to handle dropdown item click
  const handleDropdownItemClickName = (option) => {
    // console.log(option, "option==>");
    setselectedLocationItemsName(option);
  };

  const handleOnView = async (row) => {
    // console.log(row, 'rowwwww')
    await fetchInitialData(row[0]);
    // console.log(initialData, 'initialData====')
    setOnviewclicked(true)
    setShowModal(true);
  }
  const fetchInitialData = async (id) => {
    try {
      // console.log('fetchInitialData==id', id)
      const response = await API.getInstance().menu.get(`/api/menu-items?id=${id}`); // Adjust the API endpoint as needed
      // console.log(response.data.result.data, 'response.data====>')
      const data = response.data.result.data
      // console.log(data, 'data====>')
      
      const menu_item_data = { id: data.id, select_menu: [], selected_menu_list: data.selected_menu_list, location: [], selected_location_list: data.selected_location_list, item_tag: [], select_item_tag: data.select_item_tag, default_tax_rate: [], select_default_tax_rate: data.select_default_tax_rate, name: data.name, description: data.description, amount: data.amount, display_photo: data.display_photo, poppable: data.poppable, online_order_available: data.online_order_available, taxable: data.taxable }

      


      // console.log(tag_data, 'tag_data======')
      setInitialData(menu_item_data);

      setInitialData(prevState => ({
        ...prevState,
        select_menu: menuData
      }));
      setInitialData(prevState => ({
        ...prevState,
        location: locationData
      }));
      setInitialData(prevState => ({
        ...prevState,
        item_tag: itemTagData
      }));
      setInitialData(prevState => ({
        ...prevState,
        default_tax_rate: defaultTaxData
      }));


    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  // Formik

  const initialValues = {
    menu: '',
    location: '',
    itemTag: '',
    defaultTaxRate: '',
    name: '',
    description: '',
    amount: '',
    displayPhoto: false,
    poppable: false,
    availableForOrderOnline: false,
    taxable: false,
  };

  const menus = [
    { id:'1',value: '1', label: 'Menu 1' },
    { id:'2',value: '2', label: 'Menu 2' },
    // Add more menu options as needed
  ];

  const locations = [
    { id:'1',value: '1', label: 'Location 1' },
    { id:'2',value: '2', label: 'Location 2' },
    // Add more location options as needed
  ];

  const itemTags = [
    { id:'1',value: '1', label: 'Item Tag 1' },
    { id:'2',value: '2', label: 'Item Tag 2' },
    // Add more item tag options as needed
  ];

  const defaultTaxRates = [
    { id:'1',value: '1', label: 'Tax Rate 1' },
    { id:'2',value: '2', label: 'Tax Rate 2' },
    // Add more tax rate options as needed
  ];


  


  // Toaster
  const handleSubmit = (values, { setSubmitting }) => {
    if (onviewclicked === true) {
      API.getInstance().menu.put(`/api/menu-items/${values.id}`, values)
        .then((res) => {
          GetFooditemsData();
          toast.success('Item updated successfully!');
        })
        .catch((error) => {
          console.error(error);
          toast.error('Failed to update item!');
        });
    } else {
      API.getInstance().menu.post("/api/menu-items", values)
        .then((res) => {
          GetFooditemsData();
          toast.success('Item added successfully!');
        })
        .catch((error) => {
          console.error(error);
          toast.error('Failed to add item!');
        });
    }
  };


  
  


  const validationSchema = Yup.object().shape({
    selected_menu_list: Yup.array().min(1,'Menu is required'),
    selected_location_list: Yup.array().min(1, 'Location is required'),
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    amount: Yup.string().required('Amount is required'),
    select_item_tag: Yup.array().min(1,'Item Tag is required'),
    default_tax_rate: Yup.array().min(1,'Default Tax Rate is required'),
    // display_photo: Yup.boolean().required('Display Photo is required'),
    // poppable: Yup.boolean().required('Poppable is required'),
    // online_order_available: Yup.boolean().required('Online Order Availability is required'),
    // taxable: Yup.boolean().required('Taxable is required'),
  });
  


  const debouncedHandleChange = debounce((e, handleChange) => {
    handleChange(e);
  }, 300);

  const [isPaymentReceived, setIsPaymentReceived] = useState(false);

  const handleToggle = () => {
    // console.log("asdsdsa");

    setIsPaymentReceived(!isPaymentReceived);
  };

  const OnSelect = (selectedList, selectedItem) => {
    // console.log("event1111",selectedList, selectedItem);
    
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
                      <CustomTable
                        headers={['#', 'Item Name', 'Menu', 'Location', 'Price', 'Action']}
                        data={currentItems?.map(data => [data.id, data.name, data.available_menu, data.available_location, data.amount])}
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
                  <span style={{ marginLeft: '5px' }}>Add New Menu</span>
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
                onClick={handleCreateMenu} // Open modal on button click
              >
                <span style={{ marginLeft: '5px' }}>Add New Item</span>
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered >
        <Modal.Header closeButton style={{
          borderBottom: "none",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "rgb(50, 50, 50)",
          color: "white"
        }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Modal.Title>{onviewclicked ? 'Update Item' : 'New Item'}</Modal.Title>
            <p style={{ borderTop: "none", fontSize: "10px", margin: 0 }}>
              This setting will apply when first added to a menu, though can be,customized for additional location
              and/or menus later.
            </p>
          </div>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "var(--card-dark-shade)",Width:'600px' }}>
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
                <div className="mb-3">
                  
                <div className="input__wrapper" style={{ width: "100%" }}>
                 <Multiselect
                    selectionLimit={1}
                    displayValue="menu_title"
                    onKeyPressFn={function noRefCheck(){}}
                    onSearch={function noRefCheck(){}}
                    onSelect={(selectedValues) => {
                      setFieldValue("selected_menu_list", selectedValues);
                    }}
                    onRemove={(selectedValues) => {
                      setFieldValue("selected_menu_list", selectedValues)}}
                    options={values.select_menu}
                    selectedValues={values.selected_menu_list}
                    style={{inputField: { // To change input field position or margin
                      margin:'10px'
                  },
                  chips: {
                    margin: '5px',
                    background: 'green'
                  }
                }}
                  />
                
                <label htmlFor="select_menu" className="input__label">Menu <span style={{ color: 'red' }}> *</span></label>
                </div>
                {touched.selected_menu_list && errors.selected_menu_list && <div className="error-message">{errors.selected_menu_list}</div>}
                </div>

                <div className="mb-3">
                
                <div className="input__wrapper" style={{ width: "100%" }}>
                <Multiselect
                  displayValue="published_name"
                  onKeyPressFn={function noRefCheck(){}}
                  onSearch={function noRefCheck(){}}
                  onSelect={(selectedValues) => {
                    setFieldValue("selected_location_list", selectedValues);
                  }}
                  onRemove={(selectedValues) => {
                    setFieldValue("selected_location_list", selectedValues)}}
                  options={values.location}
                  selectedValues={values.selected_location_list}
                  style={{inputField: { // To change input field position or margin
                    margin:'10px'
                },
                chips: {
                  margin: '5px',
                  background: 'green'
                }
              }}
                />
                <label htmlFor="location" className="input__label">Location <span style={{ color: 'red' }}> *</span></label>
                </div>
                {touched.selected_location_list && errors.selected_location_list && <div className="error-message">{errors.selected_location_list}</div>}
                </div>
              
                <div className="mb-3">
                  <div className="input__wrapper" style={{ width: "100%" }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="input__field"
                      value={values.name}
                      onChange={(e) => {
                        handleChange(e);
                        // console.log(e.target.value, 'e.target.value', 'values', values);
                      }}
                      onBlur={handleBlur}
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="name" className="input__label">
                      Name <span style={{ color: 'red' }}> *</span>
                    </label>
                  </div>
                  {touched.name && errors.name && <div className="error-message">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <div className="input__wrapper" style={{ width: "100%" }}>
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      className="input__field"
                      value={values.description}
                      onChange={(e) => {
                        handleChange(e);
                        // console.log(e.target.value, 'e.target.value', 'values', values);
                      }}
                      onBlur={handleBlur}
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="description" className="input__label">
                      Description <span style={{ color: 'red' }}> *</span>
                    </label>
                  </div>
                  {touched.description && errors.description && <div className="error-message">{errors.description}</div>}
                </div>

                <div className="mb-3">
                  <div className="input__wrapper" style={{ width: "100%" }}>
                    <input
                      type="text"
                      name="amount"
                      placeholder="Amount"
                      className="input__field"
                      value={values.amount}
                      onChange={(e) => {
                        handleChange(e);
                        // console.log(e.target.value, 'e.target.value', 'values', values);
                      }}
                      onBlur={handleBlur}
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="amount" className="input__label">
                      Amount <span style={{ color: 'red' }}> *</span>
                    </label>
                  </div>
                  {touched.amount && errors.amount && <div className="error-message">{errors.amount}</div>}
                </div>
                
                <div style={{display:'flex'}}>

              
                <div className="mb-3">
                 
                <div className="input__wrapper" style={{ marginRight:'20px' }}>
                <Multiselect
                  displayValue="name"
                  onKeyPressFn={function noRefCheck(){}}
                  onSearch={function noRefCheck(){}}
                  onSelect={(selectedValues) => {
                    // console.log("Selected values:", selectedValues);
                    setFieldValue("select_item_tag", selectedValues);
                  }}
                  onRemove={(selectedValues) => {
                    // console.log("Selected values:", selectedValues);
                    setFieldValue("select_item_tag", selectedValues)}}
                  options={values.item_tag}
                  selectedValues={values.select_item_tag}
                  style={{inputField: { // To change input field position or margin
                    margin:'10px'
                },
                chips: {
                  margin: '5px',
                  background: 'green'
                }
              }}
                />
                <label htmlFor="item_tag" className="input__label">Item Tag <span style={{ color: 'red' }}> *</span></label>
                </div>
                {touched.select_item_tag && errors.select_item_tag && <div className="error-message">{errors.select_item_tag}</div>}
                </div>

                <div className="mb-3">
                  <div className="input__wrapper" style={{}}>
                <Multiselect
                selectionLimit={1}
                  displayValue="name"
                  onKeyPressFn={function noRefCheck(){}}
                  onSearch={function noRefCheck(){}}
                  onSelect={(selectedValues) => {
                    // console.log("Selected values:", selectedValues);
                    setFieldValue("select_default_tax_rate", selectedValues);
                  }}
                  onRemove={(selectedValues) => {
                    // console.log("Selected values:", selectedValues);
                    setFieldValue("select_default_tax_rate", selectedValues)}}
                  options={values.default_tax_rate}
                  selectedValues={values.select_default_tax_rate}
                  style={{inputField: { // To change input field position or margin
                    margin:'10px',
                    color:'white'
                },
                chips: {
                  margin: '5px',
                  background: 'green'
                }
              }}
                />
                <label htmlFor="default_tax_rate" className="input__label">Default Tax Rate <span style={{ color: 'red' }}> *</span></label>
                </div>
                {touched.default_tax_rate && errors.default_tax_rate && <div className="error-message">{errors.default_tax_rate}</div>}
                </div>
                </div>


                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', color: `var(--primary-text-color)` }}>
                  <div>Display Photo <span style={{ color: 'red' }}> *</span></div>
                  <input
                    type="checkbox"
                    id="switch"
                    checked={values.display_photo}
                    name="display_photo"
                  />
                  <label1 htmlFor="display_photo" onClick={() => { console.log(!values.display_photo); setFieldValue("display_photo", !values.display_photo); }}></label1>

                </div>
                {/* {touched.display_photo && errors.display_photo && <div className="error-message">{errors.display_photo}</div>} */}


                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', color: `var(--primary-text-color)` }}>
                  <div>Poppable <span style={{ color: 'red' }}> *</span></div>
                  <input
                    type="checkbox"
                    id="switch"
                    checked={values.poppable}
                    name="poppable"
                  />
                  <label1 htmlFor="poppable" onClick={() => {  console.log(!values.poppable); setFieldValue("poppable", !values.poppable); }}></label1>

                </div>
                {/* {touched.poppable && errors.poppable && <div className="error-message">{errors.poppable}</div>} */}
                
                
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', color: `var(--primary-text-color)` }}>
                  <div>Available for Online order <span style={{ color: 'red' }}> *</span></div>
                  <input
                    type="checkbox"
                    id="switch"
                    checked={values.online_order_available}
                    name="online_order_available"
                  />
                  <label1 htmlFor="online_order_available" onClick={() => {console.log(!values.online_order_available); setFieldValue("online_order_available", !values.online_order_available); }}></label1>

                </div>
                {/* {touched.online_order_available && errors.online_order_available && <div className="error-message">{errors.online_order_available}</div>} */}

                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', color: `var(--primary-text-color)` }}>
                  <div>Taxable <span style={{ color: 'red' }}> *</span></div>
                  <input
                    type="checkbox"
                    id="switch"
                    checked={values.taxable}
                    name="taxable"
                  />
                  <label1 htmlFor="taxable" onClick={() => { console.log(!values.taxable); setFieldValue("taxable", !values.taxable); }}></label1>

                </div>
                {/* {touched.taxable && errors.taxable && <div className="error-message">{errors.taxable}</div>} */}

              
                
                      
                
                <Button
    style={{
      marginTop: '20px',
      height: "40px",
      fontSize: "12px",
      border: "none",
      backgroundColor: !isValidForm ? 'rgba(180, 49, 45, 0.7)' : 'rgb(180,49,45)',
      borderColor: `var(--primary)`,
    }}
    disabled={!isValidForm}
    type="submit"
    className="btn btn-primary"
    onClick={() => setShowModal(false)} // Add onClick event handler to close the modal
  >
    <FaPlus style={{ marginRight: '4px' }} />
    {
      onviewclicked ? <span>UPDATE ITEM</span> : <span>ADD ITEM</span>
    }
  </Button>
              </Form>
            )}
          </Formik>

        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button> 
           Add save button or any other action button
        </Modal.Footer> */}
      </Modal>
    </main>
  )
}

export default Items
