import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const View_orders = () => {
  console.log("dsfj");
  const [data, setdata] = useState([]);
  const [sh0, setsh0] = useState(false);

  const [data2, setdata2] = useState([]);
  const [tdata, settdata] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      getdata();
    } else {
      nav("/login");
    }
  }, []);
  const getdata = () => {
    axios.post("http://127.0.0.1:5000//Assist/Admin_order_info").then((res) => {
      setdata(res.data["data"]);
      setdata2(res.data["data2"]);
    });
  };
  const about = (e) => {
    var t = data2;
    const k = t.filter((i) => i[0] === e);
    settdata(k);

    setsh0(true);
  };

  return (
    <>
      <div>
        {" "}
        <div className="container-fluid ">
          <hr />
          <div className=" p-3">
            {data && (
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>customer_id</th>
                    <th>Order_id</th>
                    <th>GST_Price</th>
                    <th>Price</th> <th>Total_Price</th> <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => {
                    return (
                      <>
                        {" "}
                        <tr key={i} onClick={() => about(d[0])}>
                          <td>{d[1]}</td> <td>{d[0]}</td>
                          <td>{d[2]}</td>
                          <td>{d[3]}</td>
                          <td>{d[4]}</td>
                          <td>{d[5]}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>{" "}
          <div className=" p-3">
            {sh0 && (
              <>
                <AiFillCloseCircle
                  size={30}
                  className="close"
                  onClick={() => (setsh0(false), settdata([]))}
                />
                <table className="table   table-dark">
                  <thead>
                    <tr>
                      <th>Order_id</th>
                      <th>Product_id</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tdata.map((d, i) => {
                      return (
                        <>
                          {" "}
                          <tr key={i}>
                            <td>{d[0]}</td> <td>{d[1]}</td>
                            <td>{d[4]}</td>
                            <td>{d[2]}</td>
                            <td>{d[3]}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default View_orders;
