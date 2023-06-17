import { useLocation, useNavigate } from "react-router-dom";
import Head from "../Components/Head";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import Alert_ from "../Components/alert";

const Buy = () => {
  const state = useLocation();

  const [orderdata, setorderdata] = useState(state.state);
  const data = localStorage.getItem("data").split(",");
  const [price, setprice] = useState(0);
  const [total, settotal] = useState(0);
  const [gst, setgst] = useState(0);
  const [malt, setmalt] = useState();
  const nav = useNavigate();
  useEffect(() => {
    setprice(orderdata.reduce((sr, s) => sr + JSON.parse(s[3]), 0));
    setgst(
      Number(
        (
          (orderdata.reduce((sr, s) => sr + JSON.parse(s[3]), 0) * 10.858) /
          100
        ).toFixed(3)
      )
    );
    settotal(
      Number(
        orderdata.reduce((sr, s) => sr + JSON.parse(s[3]), 0) +
          (orderdata.reduce((sr, s) => sr + JSON.parse(s[3]), 0) * 10.858) / 100
      ).toFixed(3)
    );
  }, [orderdata]);
  const delet = (e) => {
    const k = orderdata.filter((item) => item !== e);

    setorderdata(k);
  };
  const pay = () => {
    var k = {
      orderdata: orderdata,
      order_info: [data[0], gst, price, total],
    };
    axios
      .post("http://127.0.0.1:5000/Assist/order_product", k)
      .then((res) => {
        setmalt("Paid Successfully");
      })
      .catch((res) => {
        setmalt("Server Error");
      });
  };
  return (
    <>
      <div className="main">
        <div>
          <Head />
        </div>
        {malt && (
          <div onClick={() => (setmalt(), nav("/"))}>
            <Alert_ msg={malt} />
          </div>
        )}
        <div className="center">
          <div className="tab_">
            <p>
              <b> {data[1]} </b>
            </p>

            <table className="table table-dark tab">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product_Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Cancel</th>
                </tr>
              </thead>
              <tbody>
                {orderdata.map((o) => {
                  return (
                    <>
                      <tr>
                        <td>{o[0]}</td>
                        <td>{o[2]}</td>
                        <td>{o[1]}</td>
                        <td>{o[3]}</td>
                        <td>
                          <AiFillDelete
                            size={40}
                            color="#8b4d0a "
                            className="cn"
                            onClick={() => delet(o)}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
            <div className="buy">
              <p className="b">
                {" "}
                Total <span className="left">₹{total}</span>
              </p>
              <p>
                {" "}
                Tax <span className="left">{gst}</span>
              </p>
              <p>
                {" "}
                Net <span className="left">{price}</span>
              </p>
              <div className="center">
                <button onClick={() => nav("/")} className="cancel">
                  Cancel
                </button>{" "}
                <button className="pay " onClick={pay}>
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Buy;
