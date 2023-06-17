import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Head from "../Components/Head";
import View_product from "../Components/View_product";
import { AiOutlineLogout } from "react-icons/ai";
import Bottom from "../Components/Bottom";
const Home = () => {
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
        <div>
          <View_product />
        </div>
        <Bottom />
      </div>
    </>
  );
};

export default Home;
