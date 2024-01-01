import "../style/modes.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Modes = () => {
  const naviget = useNavigate();
  return (
    <>
      {/* <Navbar /> */}
      <div className="outer-container">
        <div className="mod-container">
          <div>
            <button
              className="first-div"
              onClick={() => naviget("add-records")}
            >
              Add records
            </button>
          </div>
          <div>
            <button
              className="second-div"
              onClick={() => naviget("view-records")}
            >
              Only records
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modes;
