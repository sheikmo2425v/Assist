import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getbrands, getcloth, getsizes } from "../data";
import { AiFillCloseCircle, AiOutlineSearch } from "react-icons/ai";

const View_product = () => {
  const nav = useNavigate();
  const [data, setdata] = useState([]);
  const [cdata, setcdata] = useState([]);
  const [tdata, settdata] = useState([]);
  const [sh0, setsh0] = useState(false);
  const [sh1, setsh1] = useState(true);
  const [sh2, setsh2] = useState(false);
  const [sh3, setsh3] = useState(false);
  const [sh4, setsh4] = useState(false);
  const [sty, setsty] = useState("afi");
  const [order, setorder] = useState([]);
  const [torder, settorder] = useState(0);
  const [shd, setshd] = useState(false);
  const [delid, setdelid] = useState();
  const [im, setim] = useState("");
  const [qty, setqty] = useState("flb");
  const [brand, setbrand] = useState();
  const [brands, setbrands] = useState(getbrands());
  const [size, setsize] = useState("");
  const sizes = getsizes("XS");
  const [price, setprice] = useState(800);
  const [cloth, setcloth] = useState("Cotton");
  const [gender, setgender] = useState("Male");
  const [si, setsi] = useState("si");
  const [res, setres] = useState();
  const cloth_types = getcloth();
  const fetchData = () => {
    axios
      .post("http://127.0.0.1:5000/Assist/product")
      .then((res) => {
        setdata(res.data);
        setcdata(res.data);
        const k = res.data.map((c) => [c[0], 1, c[2], c[3]]);
        settdata(k);
      })
      .catch(() => {
        alert("server error");
      });
  };
  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      setsh1(false);
      setsh2(true);
      setsty("fi");
      setqty("flba");
      setsi("asi");
    }
    fetchData();
  }, []);

  const fullscreen = (e) => {
    setsh0(true);
    setim(e);
  };

  const order_ = (e) => {
    var k = order;
    setsh3(true);
    k.push(e);
    setorder(k);
    const filtered = data.filter((item) => item[0] != e[0]);
    setdata(filtered);
    settorder(torder + 1);
  };
  const search = (e) => {
    const sea = e.toLowerCase();
    const filtered = cdata.filter((item) =>
      item[2].toLowerCase().includes(sea)
    );
    setdata(filtered);
    if (data === []) {
      setdata(cdata);
    }
  };

  const filter = () => {
    var k = [price, size, cloth, brand, gender];

    const tempdata = cdata.filter(
      (i) =>
        parseInt(i[3], 10) >= parseInt(k[0], 10) - 100 &&
        parseInt(i[3], 10) <= parseInt(k[0], 10) + 100 &&
        i[4].includes(k[1]) &&
        i[5].includes(k[2]) &&
        i[7].includes(k[3]) &&
        i[6].includes(k[4])
    );

    if (tempdata === []) {
      setdata(cdata);
    }
    if (tempdata.length === 0) {
      setres("NO Results Found");
    } else {
      setres();
    }
    setdata(tempdata);
  };
  const Qty = (e, i) => {
    const td = JSON.parse(JSON.stringify(tdata));
    const price = data[i][3];
    td[i][1] = e.target.value;
    td[i][3] = price * e.target.value;
    settdata(td);
  };
  const delet = () => {
    var k = { id: delid };
    axios
      .post("http://127.0.0.1:5000/Assist/product_delete", k)
      .then((res) => {
        setdelid();
        alert("Deleted successfully");
        setshd(false);
        fetchData();
      })
      .catch(() => {
        alert("server error");
        setshd(false);
      });
  };

  return (
    <>
      {sh3 && (
        <div className="or ">
          <AiFillCloseCircle
            size={22}
            onClick={() => (
              setsh3(false), setdata(cdata), setorder([]), settorder(0)
            )}
          />
          <p style={{ marginTop: "10px" }}>{torder} Product Added</p>
          <button
            className=" obtn"
            onClick={() => nav("/Buy", { state: order })}
          >
            Buy
          </button>
        </div>
      )}
      <div className="search center ">
        <div>
          <input
            type="search "
            className="srh form-control "
            placeholder="Search..."
            onInput={(e) => search(e.target.value)}
          />{" "}
          <AiOutlineSearch size={30} className={si} />
        </div>
      </div>

      <div className="row ">
        <div className={qty}>
          <button className="cbtn " onClick={() => setsh4(true)}>
            Filter
          </button>
        </div>
        {sh4 && (
          <div className="filter  ">
            <div className="label">
              <AiFillCloseCircle size={32} onClick={() => setsh4(false)} />
              <button className="combtn" onClick={() => filter()}>
                Fliter
              </button>{" "}
              <button
                className="combtn"
                onClick={() => (
                  setbrand(),
                  setcloth("Cotton"),
                  setsize("XS"),
                  setgender("Male"),
                  setprice(800),
                  setsh4(false),
                  setdata(cdata)
                )}
              >
                Reset
              </button>
            </div>{" "}
            <br />
            <div className="label">
              <div className="label">
                <label htmlFor="size" className="label">
                  <b>Brand</b>
                </label>
                <input
                  type="text"
                  list="brand"
                  name="size"
                  className=" input"
                  placeholder="Brand"
                  value={brand}
                  onChange={(e) => {
                    setbrand(e.target.value);
                    console.log(brand);
                  }}
                />

                <datalist id="brand">
                  {brands.map((d) => {
                    return <option value={d}>{d}</option>;
                  })}
                </datalist>
              </div>
              <br />
              <div className="label">
                <label htmlFor="size" className="label">
                  <b>Size_</b>
                </label>
                <select
                  value={size}
                  onChange={(e) => setsize(e.target.value)}
                  className=" input"
                  placeholder="Size like S-Small Enter 36"
                >
                  {sizes.map((s) => {
                    return <option value={s}>{s}</option>;
                  })}
                </select>
              </div>
              <br />{" "}
              <div className="label">
                <label htmlFor="size" className="label">
                  <b>Gender</b>
                </label>
                <select
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  className=" input"
                  placeholder="Gender"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <br />
              <div className="label">
                <label htmlFor="cloth" className="label">
                  <b>Cloth Type</b>
                </label>
                <select
                  value={cloth}
                  onInput={(e) => setcloth(e.target.value)}
                  className="input"
                  placeholder="cloth"
                >
                  {cloth_types.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>{" "}
              <br />
              <div className="label">
                <label htmlFor="range">
                  <b> Price ₹{price}_</b>
                </label>
                <input
                  type="range"
                  min="300"
                  max="5000"
                  value={price}
                  className="input"
                  onChange={(e) => setprice(e.target.value)}
                />{" "}
                <p className="price"> </p>
              </div>
            </div>
          </div>
        )}

        {shd && (
          <div className="center">
            <div className=" alert">
              <p> Are you sure ?</p>

              <div className="sepa">
                <button className="cbtn" onClick={() => delet()}>
                  Yes{" "}
                </button>{" "}
                <button
                  className="cbtn"
                  onClick={() => (setshd(false), setdelid())}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="grid ">
          {sh0 && (
            <div className={sty}>
              <img
                className="sh"
                src={im}
                alt="shirt"
                height={600}
                onClick={() => setsh0(!sh0)}
              />
            </div>
          )}
          {res && (
            <div style={{ marginLeft: "45%", marginTop: "5%" }}>
              <p>{res}</p>
            </div>
          )}
          {data.map((d, i) => {
            const k = data[i][1];

            return (
              <div key={i} className="product">
                <div>
                  <img
                    src={`./images/${d[0]}.jpg`}
                    alt="shirt"
                    height={200}
                    onClick={() => fullscreen(`./images/${d[0]}.jpg`)}
                  />
                </div>
                <br />

                <p>
                  <b>
                    {d[2]} {d[6]}
                  </b>{" "}
                  <span className="b"> {d[7]}</span>
                </p>
                <p>
                  <b>
                    {" "}
                    ₹{tdata[i][3]}- {d[4]}{" "}
                  </b>
                </p>
                <p>{d[5]}</p>

                {sh1 && (
                  <div className="details">
                    <div className="qty ">
                      <p>Quantity </p>
                      <select
                        className="input form-control qbtn"
                        onChange={(e) => Qty(e, i)}
                      >
                        {Array.from({ length: k }, (_, index) => index + 1).map(
                          (i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <button className="bbtn" onClick={() => order_(tdata[i])}>
                      Add
                    </button>
                  </div>
                )}
                {sh2 && (
                  <div className="details">
                    <button
                      className="bbtn"
                      onClick={() => (setshd(true), setdelid(d[0]))}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default View_product;
