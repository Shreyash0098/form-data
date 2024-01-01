import { useNavigate } from "react-router-dom";
import "../style/404.css";

function Error404() {
  const navigate = useNavigate();

  return (
    <div className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  ">
              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h3">Look like you're lost</h3>
                <p className="error-msg">
                  the page you are looking for not avaible!
                </p>
                <button
                  className="link_404"
                  onClick={(e) => {
                    navigate("/");
                  }}
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error404;
