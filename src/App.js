import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Tienda from "./components/pages/Tienda/Tienda";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import EditProducto from "./components/EditProducto/EditProducto";
import ContactUs from "./components/pages/ContactUs/ContactUs";
import Create from "./components/createProduct/Create";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Dashboard } from "./components/dashboard/dashboard";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51NJLe4DxCAER9P4mmVPMsglUYKPpkaHPAHQb6FADLILpEvvOyDLOeDnkqBpeCMr7XjshHIPAbjV5pJRDVSydQ1Zl00ko1MsssO"
);

function App() {
  const { user } = useAuth0();
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    if (user && user.email) {
      axios(`https://servidor-vinos.onrender.com/users?email=${user.email}`)
        .then(({ data }) => {
          setUsuario(data);
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((error) => console.log("parece que hubo un error:", error));
    } else {
      const storedUser = localStorage.getItem("user");
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && parsedUser.email) {
        axios(
          `https://servidor-vinos.onrender.com/users?email=${parsedUser.email}`
        ).then(({ data }) => {
          setUsuario(data);
        });
      }
    }
  }, [user]);

  return (
    <Elements stripe={stripePromise}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route
          path="/profilepage"
          element={<ProfilePage usuarios={usuario} />}
        />
        <Route
          path="/editar/:id"
          element={<EditProducto usuarios={usuario} />}
        />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/create" element={<Create usuarios={usuario} />} />
        <Route path="/dashboard" element={<Dashboard usuarios={usuario} />} />
      </Routes>
    </Elements>
  );
}

export default App;
