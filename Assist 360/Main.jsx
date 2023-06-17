import { Route, Routes } from "react-router-dom";
import Home from "./Screen/Home";
import Admin from "./Screen/Admin";
import Login from "./Screen/Login";
import Register from "./Screen/Register.";
import "./Style/Style.css";
import Buy from "./Screen/Buy";
import Add_product from "./Screen/Add_product";
import Orders from "./Screen/orders";
const Main = () => {
  return (
    <>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Admin />} path="/Admin" />
        <Route element={<Login />} path="/Login" />
        <Route element={<Register />} path="/Register" />
        <Route element={<Buy />} path="/Buy" />
        <Route element={<Add_product />} path="/Add_product" />
        <Route element={<Orders />} path="/orders" />
      </Routes>
    </>
  );
};

export default Main;
