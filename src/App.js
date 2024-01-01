import Modes from "./components/Modes";
import Form from "./components/Form";
import Table from "./components/Table";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Logout from "./components/Logout";
import Login from "./components/Login";
import Error404 from "./components/404";
import { useSelector } from "react-redux";

function App() {
  const currentUser = useSelector((state) => state.userRecords.currentUser);
  return (
    <>
      <BrowserRouter>
        <div className="nav-div">
          <Navbar />
        </div>
        <Routes>
          {currentUser.length > 0 ? (
            <>
              <Route path="/view-records" element={<Table />} />
              <Route path="/add-records" element={<Form />}>
                <Route path=":userId" element={<Form />} />
              </Route>
              <Route path="/home" element={<Home />} />
              <Route path="/logout" element={<Logout />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
            </>
          )}
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
