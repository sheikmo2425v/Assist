import { useNavigate } from "react-router-dom";
import Head from "../Components/Head";
import { AiOutlineLogout } from "react-icons/ai";
import { useEffect } from "react";
import Bottom from "../Components/Bottom";
import View_product from "../Components/View_product";
const Admin = () => {
  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("role") === null) {
      nav("/login");
    } else if (localStorage.getItem("role") === "admin") {
      nav("/admin");
    }
  }, []);
  return (
    <>
      <div className="main">
        <AiOutlineLogout
          className="logout"
          size={40}
          onClick={() => nav("/Login")}
        />
        <div>
          <Head />
        </div>
        <br />
        <div className="con">
          <button className="combtn" onClick={() => nav("/add_product")}>
            Add_Product
          </button>{" "}
          <button className="combtn" onClick={() => nav("/orders")}>
            Orders
          </button>
        </div>
        <div>
          <View_product />
        </div>
        <div>
          <Bottom />
        </div>
      </div>
    </>
  );
};

export default Admin;
