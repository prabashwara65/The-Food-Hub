import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; 

import Home from "../Pages/Prabashwara/Home";
import Register from "../Pages/Prabashwara/Register";
import Login from "../Pages/Prabashwara/Login";
import Adminpanel from "../Pages/AdminPanel/Adminpanel";
import OrderHome from "../Pages/Prabashwara/Orders/OrderHome";

import store from "../store/store"; //redux store

//restaurant owner
import AssignDriver from "../Pages/Delivery/AssignDriver";
import DeliveryPerson from "../Pages/Delivery/deliveryPerson";
import { Provider } from "react-redux";
import EmailVerification from "../Pages/Delivery/EmailVerification";
import LocationAccess from "../Pages/Delivery/LocationAccess";
import OwnerDashboard from "../Pages/Hasara/RestaurantOwner/OwnerDashboard";
import RestaurantView from "../Pages/Hasara/RestaurantDetails/RestaurantView";
import MenuDetails from "../Pages/Hasara/Menu/MenuDetails";
import CartDetails from "../Pages/Hasara/Cart/Cart";

function App() {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Adminpanel />} />
          <Route path="/OwnerDashboard" element={<OwnerDashboard />} />

          {/* restaurant owner route  */}
          <Route path="/assignDriver" element={<AssignDriver />} />
          <Route path="/addDeliveryPerson" element={<DeliveryPerson />} />
          <Route path="/emailVerification" element={<EmailVerification />} />
          <Route path="/location-access" element={<LocationAccess />} />

          {/* delivery person route */}
          <Route path="/order" element={<OrderHome />} />

          {/* restaurant owner route  */}
          <Route path="/OwnerDashboard" element={<OwnerDashboard />} />
          <Route path="/restaurant/:id" element={<RestaurantView />} />
          <Route path="/menu/:menuId" element={<MenuDetails />} />
          <Route path="/cart" element={<CartDetails />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} /> 
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
