import { useDispatch, useSelector } from "react-redux";
import "../style/logout.css";
import { logout } from "../features/addUsers";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const usersData = useSelector((state) => state.userRecords.usersDetail);

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    const wantToLogout = usersData?.filter(
      (record) => record.isLogedin === true
    );
    if (wantToLogout.length > 0) {
      dispatch(logout(wantToLogout));
      navigate("/login");
    }
  };

  const handleCancle = (e) => {
    navigate("/add-records");
    return;
  };

  return (
    <div className="logout-container">
      <div className="logout-main">
        <div className="msg-div">
          <div className="conform">
            <span className="conform-msg">Are you sure,</span>
          </div>
          <div className="conform">
            <span className="conform-msg">you want to logout?</span>
          </div>
        </div>
        <div className="conform-btns">
          <button
            className="cancle-btn"
            onClick={(e) => {
              handleCancle(e);
            }}
          >
            cancel
          </button>
          <button
            className="logout-btn"
            onClick={(e) => {
              handleLogout(e);
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
