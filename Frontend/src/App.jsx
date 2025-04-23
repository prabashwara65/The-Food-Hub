import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Prabashwara/Home";
import Register from "../Pages/Prabashwara/Register";
import Login from "../Pages/Prabashwara/Login";
import Adminpanel from "../Pages/AdminPanel/Adminpanel";

import store from "../store/store"; //redux store

//restaurant owner
import OwnerDashboard from "../Pages/RestaurantOwner/OwnerDashboard"
import AssignDriver from "../Pages/Delivery/AssignDriver";
import DeliveryPerson from "../Pages/Delivery/deliveryPerson";
import { Provider } from "react-redux";
import EmailVerification from "../Pages/Delivery/EmailVerification";
import LocationAccess from "../Pages/Delivery/LocationAccess";

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
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
