import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Prabashwara/Home";
import Register from "../Pages/Prabashwara/Register";
import Login from "../Pages/Prabashwara/Login";
import Adminpanel from "../Pages/AdminPanel/Adminpanel";
import CustomerList from "../Pages/AdminPanel/customerList";
import OwnerList from "../Pages/AdminPanel/OwnerList";
import DeliveryList from "../Pages/AdminPanel/DeliveryList";
import ManageOrders from "../Pages/AdminPanel/ManageOrders";

//restaurant owner
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

          {/* Admin Routes */}
          <Route path="/admin/customers" element={<CustomerList />} />
          <Route path="/admin/owners" element={<OwnerList />} />
          <Route path="/admin/delivery" element={<DeliveryList />} />
          <Route path="/admin/home" element={<Adminpanel />} />
          <Route
            path="/admin/manage-restaurant"
            element={<ManageRestaurants />}
          />
          <Route path="/admin/view-restaurant" element={<ViewRestaurant />} />
          <Route path="/admin/add-restaurant" element={<AddRestaurant />} />
          <Route path="/owner/login" element={<OwnerLogin />} />
          <Route path="/owner/register" element={<OwnerRegister />} />
          <Route path="/admin/manage-orders" element={<ManageOrders />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
