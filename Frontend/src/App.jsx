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

//Admin Side
import CustomerList from "../Pages/AdminPanel/customerList";
import OwnerList from "../Pages/AdminPanel/OwnerList";
import DeliveryList from "../Pages/AdminPanel/DeliveryList";
import ManageOrders from "../Pages/AdminPanel/ManageOrders";

//Resturant Owner routes 
import ManageRestaurants from "../Pages/AdminPanel/ManageRestaurants";
import ViewRestaurant from "../Pages/AdminPanel/ViewRestaurant";
import AddRestaurant from "../Pages/AdminPanel/AddRestaurant";
import OwnerLogin from "../Pages/RestaurantOwner/OwnerLogin";
import OwnerRegister from "../Pages/RestaurantOwner/OwnerRegister";

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

          {/* Admin Side */}
          <Route path="/admin/customers" element={<CustomerList />} />
          <Route path="/admin/owners" element={<OwnerList />} />
          <Route path="/admin/delivery" element={<DeliveryList />} />
          <Route path="/admin/home" element={<Adminpanel />} />

          <Route path="/admin/manage-restaurant" element={<ManageRestaurants />} />
          <Route path="/admin/view-restaurant" element={<ViewRestaurant />} />
          <Route path="/admin/add-restaurant" element={<AddRestaurant />} />
          <Route path="/owner/login" element={<OwnerLogin />} />
          <Route path="/owner/register" element={<OwnerRegister />} />
          <Route path="/admin/manage-orders" element={<ManageOrders />} />

        </Routes>
        <Toaster position="top-center" reverseOrder={false} /> 
      </BrowserRouter>
    </>
  );
}

export default App;
