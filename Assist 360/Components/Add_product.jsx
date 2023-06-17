import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getbrands, getcloth, getsizes } from "../data";
import Alert_ from "./alert";

const Add = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState();
  const [tproduct, settproduct] = useState();
  const [file, setFile] = useState("");
  const [size, setsize] = useState("XS");
  const [gender, setgender] = useState("Male");
  const [cloth, setcloth] = useState("Cotton");
  const [brand, setbrand] = useState("");
  const brands = getbrands();
  const sizes = getsizes();
  const [alt, setalt] = useState();
  const [malt, setmalt] = useState();
  const cloth_types = getcloth();
  const nav = useNavigate();

  const add = () => {
    console.log(name, file, price, tproduct, size, brand, cloth, gender);
    if (
      name !== "" &&
      file !== "" &&
      price !== "" &&
      tproduct !== "" &&
      brand !== "" &&
      size !== "" &&
      gender !== "" &&
      cloth !== ""
    ) {
      const formData = new FormData();

      formData.append("file", file);

      formData.append("name", name);
      formData.append("price", price);
      formData.append("tproduct", tproduct);
      formData.append("gender", gender);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("cloth", cloth);

      axios
        .post("http://127.0.0.1:5000/Assist/store_product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setmalt("Add successfully");
          setFile("");
          setname("");
          setprice("");
          settproduct("");
        });
    } else {
      setalt("Please fill out all the field");
    }
  };
  const in_ = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <>
      <div>
        {alt && (
          <div onClick={() => setalt()}>
            <Alert_ msg={alt} />
          </div>
        )}
        {malt && (
          <div onClick={() => (setmalt(), nav("/admin"))}>
            <Alert_ msg={malt} />
          </div>
        )}
      </div>
      <div className="center ">
        <div className="adb p-4">
          <h4 className="text-center ">Add Product</h4>
          <hr />
          <div className="input-group input-group-lg form-group">
            <input
              type="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="form-control input"
              placeholder="Product Name"
            />
          </div>
          <div className="input-group input-group-lg form-group">
            <input
              type="text"
              list="brand"
              name="size"
              className="form-control input"
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
          <div className="input-group input-group-lg form-group">
            <input
              type="number"
              value={tproduct}
              onChange={(e) => settproduct(e.target.value)}
              className="form-control input"
              placeholder="How many product"
            />
          </div>{" "}
          <div className="input-group input-group-lg form-group">
            <select
              value={size}
              onChange={(e) => setsize(e.target.value)}
              className="form-control input"
              placeholder="Size like S-Small Enter 36"
            >
              {sizes.map((s) => {
                return <option value={s}>{s}</option>;
              })}
            </select>
          </div>
          <div className="input-group input-group-lg form-group">
            <select
              value={cloth}
              onChange={(e) => setcloth(e.target.value)}
              className="form-control input"
              placeholder="cloth"
            >
              {cloth_types.map((c) => {
                return <option value={c}>{c}</option>;
              })}
            </select>
          </div>{" "}
          <div className="input-group input-group-lg form-group">
            <select
              value={gender}
              onChange={(e) => setgender(e.target.value)}
              className="form-control input"
              placeholder="Gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="input-group input-group-lg form-group">
            <input
              type="number"
              value={price}
              onChange={(e) => setprice(e.target.value)}
              className="form-control input"
              placeholder="price"
            />
            <div className="input-group input-group-lg form-group ">
              <div className="form-control input">
                <label htmlFor="fileInput" className="  ">
                  Select thumbnail Image :
                </label>
                <input
                  type="file"
                  id="fileInput"
                  accept=".jpg,.png,.jpeg,.webp"
                  onChange={in_}
                  className=" form-control input  btn btn-dark "
                  placeholder="Add thumbnail pic"
                />
              </div>
            </div>

            <hr />
            <div className=" p-2">
              <button className=" combtn " onClick={add}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
