import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; 

import Home from "../Pages/Prabashwara/Home";
import Register from "../Pages/Prabashwara/Register";
import Login from "../Pages/Prabashwara/Login";
import Adminpanel from "../Pages/AdminPanel/Adminpanel";
import OrderHome from "../Pages/Prabashwara/Orders/OrderHome";

//restaurant owner
import OwnerDashboard from "../Pages/Hasara/RestaurantOwner/OwnerDashboard";
import RestaurantView from "../Pages/Hasara/RestaurantDetails/RestaurantView";
import MenuDetails from "../Pages/Hasara/Menu/MenuDetails";
import CartDetails from "../Pages/Hasara/Cart/Cart";
import Success from "../Pages/Hasara/Cart/Success";
import Cancel from "../Pages/Hasara/Cart/Cancel";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Adminpanel />} />
          <Route path="/order" element={<OrderHome />} />

          {/* restaurant owner route  */}
          <Route path="/OwnerDashboard" element={<OwnerDashboard />} />
          <Route path="/restaurant/:id" element={<RestaurantView />} />
          <Route path="/menu/:menuId" element={<MenuDetails />} />
          <Route path="/cart" element={<CartDetails />} />
          <Route path="/success" element={<Success/>} />
          <Route path="/cancel" element={<Cancel />} />

        </Routes>
        <Toaster position="top-center" reverseOrder={false} /> 
      </BrowserRouter>
    </>
  );
}

export default App;
