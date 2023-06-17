import { useNavigate } from "react-router-dom";
import Head from "../Components/Head";
import { AiOutlineLogout } from "react-icons/ai";
import { useEffect } from "react";
import Bottom from "../Components/Bottom";

import View_orders from "../Components/View_orders";

const Orders = () => {
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
          <View_orders />
        </div>
        <div>
          <Bottom />
        </div>
      </div>
    </>
  );
};

export default Orders;
