import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";

const Bottom = () => {
  return (
    <>
      {" "}
      <div className=" center">
        <div className="bottom">
          {" "}
          <hr className="hr" />
          <AiFillLinkedin size={40} color="#312e25" />
          <AiFillGithub size={40} color="#312e25" />
          <AiFillTwitterSquare size={40} color="#312e25" />
        </div>
      </div>
    </>
  );
};

export default Bottom;
