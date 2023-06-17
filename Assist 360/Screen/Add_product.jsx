import { useNavigate } from "react-router-dom";
import Head from "../Components/Head";
import { AiOutlineLogout } from "react-icons/ai";
import { useEffect } from "react";
import Bottom from "../Components/Bottom";
import View_product from "../Components/View_product";
import Add from "../Components/Add_product";
const Add_product = () => {
  const nav = useNavigate();

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
        <div>
          <button className="combtn" onClick={() => nav("/admin")}>
            Back
          </button>
        </div>
        <div>
          <Add />
        </div>
        <div>
          <Bottom />
        </div>
      </div>
    </>
  );
};

export default Add_product;
