import axios from "axios";
import { useEffect, useState } from "react";

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"];
const cloth_types = [
  "Cotton",
  "Polyester",

  "Denim",
  "Jersey",
  "Rayon",
  "Linen",
  "Nylon",
  "Spandex",
  "Modal",
  "Viscose",
  "Bamboo",
  "Tencel",
];
export function getsizes() {
  return sizes;
}

export function getbrands() {
  const [brands, setbrands] = useState([]);
  useEffect(() => {
    axios
      .post("http://127.0.0.1:5000/Assist/Admin_brand")
      .then((res) => {
        setbrands(res.data["brand"]);
      })
      .catch((e) => {
        alert("error");
      });
  }, []);
  return brands;
}
export function getcloth() {
  return cloth_types;
}
