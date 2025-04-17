import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Prabashwara/Home";
import Register from "../Pages/Prabashwara/Register";
import Login from "../Pages/Prabashwara/Login";
import Adminpanel from "../Pages/AdminPanel/Adminpanel";

//restaurant owner
import OwnerDashboard from "../Pages/RestaurantOwner/OwnerDashboard"
import AssignDriver from "../Pages/Delivery/AssignDriver";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Adminpanel />} />
          <Route path="/OwnerDashboard" element={<OwnerDashboard />} />

          {/* restaurant owner route  */}
          <Route path="/driver" element={<AssignDriver />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
