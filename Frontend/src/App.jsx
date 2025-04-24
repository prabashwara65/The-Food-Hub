import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Prabashwara/Home";
import Register from "../Pages/Prabashwara/Register";
import Login from "../Pages/Prabashwara/Login";
import Adminpanel from "../Pages/AdminPanel/Adminpanel";

//restaurant owner
import OwnerDashboard from "../Pages/Hasara/RestaurantOwner/OwnerDashboard"
import RestaurantView from "../Pages/Hasara/RestaurantDetails/RestaurantView"
import MenuDetails from "../Pages/Hasara/Menu/MenuDetails"
import CartDetails from "../Pages/Hasara/Cart/Cart"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Adminpanel />} />

          {/* restaurant owner route  */}
          <Route path="/OwnerDashboard" element={<OwnerDashboard />} />
          {/*restaurant View - hasara*/ }
          <Route path="/restaurant/:id" element={<RestaurantView />} />
          {/*menu details view -hasara*/}
          <Route path="/menu/:menuId" element={<MenuDetails />} />
          {/* cart page - hasara */}
          <Route path="/cart" element={<CartDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
