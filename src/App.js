import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Tienda from "./components/pages/Tienda/Tienda";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import EditProducto from "./components/EditProducto/EditProducto";
import ContactUs from "./components/pages/ContactUs/ContactUs";
import Create from "./components/createProduct/Create";
import { loadStripe } from "@stripe/stripe-js";
import { FormCompra } from "./components/formularioCompra/formCompra";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51NJLe4DxCAER9P4mmVPMsglUYKPpkaHPAHQb6FADLILpEvvOyDLOeDnkqBpeCMr7XjshHIPAbjV5pJRDVSydQ1Zl00ko1MsssO"
);

function App() {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    }
  }, [isAuthenticated, user]);

  return (
    <Elements stripe={stripePromise}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/editar/:id" element={<EditProducto />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/create" element={<Create />} />
        <Route path="/Compra" element={<FormCompra />} />
      </Routes>
    </Elements>
  );
}

export default App;