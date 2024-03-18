import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Main from './screens/Dashboard/Main';
import EmailMessaging from './screens/Marketing/EmailMessaging';
import OverView from './screens/Marketing/OverView';
import SideBar from './components/Sidebar/SideBar';
import TextMessages from './screens/Marketing/TextMessages';
import AllMenus from './screens/Menu/AllMenus';
import Items from './screens/Menu/Items';
import ItemsTag from './screens/Menu/ItemsTags';
import Gallery from './screens/Gallery/Gallery';
import Settings from './screens/Settings/Settings';
import MyProfile from './screens/Settings/MyProfile';
import BillingPayment from './screens/Settings/BillingPayment';
import TeamManagement from './screens/Settings/Settings';
import Integration from './screens/Settings/Integration';
import General from './screens/Settings/General';
import LocationAndHours from './screens/Settings/LocationAndHours';
import RestaurentTeamManagement from './screens/Settings/RestaurentTeamManagement';
import Product from './screens/Product/Product';
import AllOrders from './screens/Orders/AllOrders';
import AddLocationButton from './screens/Settings/AddLocationButton';
import OrderSettings from './screens/Orders/OrderSettings';
import SignIn from './screens/Signin/signin';
import Report from './screens/Orders/Report';
// import NotFound from './screens/NotFound'; // Import your custom 404 page
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SidebarLayout = () => (
  <>
    <SideBar />
    <Outlet />
  </>
);

function App() {
  const isLoggedIn = useSelector(state => state.login_data);

  const showToast = (message, type = 'info') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      default:
        toast.info(message);
    }
  };

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SidebarLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/marketing/overview" element={<OverView />} />
          <Route path="/marketing/email-message" element={<EmailMessaging />} />
          <Route path="/marketing/text-message" element={<TextMessages />} />
          <Route path="/menu/all-menu" element={<AllMenus />} />
          <Route path="/menu/items" element={<Items />} />
          <Route path="/menu/items-tags" element={<ItemsTag />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/billing-payment" element={<BillingPayment />} />
          <Route path="/team-management" element={<TeamManagement />} />
          <Route path="/integration" element={<Integration />} />
          <Route path="/general" element={<General />} />
          <Route path="/locationhours" element={<LocationAndHours />} />
          <Route path="/locationhours/add-location-button" element={<AddLocationButton />} />
          <Route path="/restau-team-management" element={<RestaurentTeamManagement />} />
          <Route path="/product" element={<Product />} />
          <Route path="/orders/all-orders" element={<AllOrders />} />
          <Route path="/orders/orders-settings" element={<OrderSettings />} />
          <Route path="/orders/report" element={<Report />} />
          {/* Custom 404 page */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
        {/* Redirect to sign-in page if user is not logged in */}
        {isLoggedIn == undefined && <Route path="*" element={<Navigate to="/sign-in" />} />}
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
