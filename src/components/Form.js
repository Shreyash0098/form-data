import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../style/form.css";
import Table from "./Table";
import { addRecords, submitEditedRecords } from "../features/submitRecords";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate, useParams } from "react-router-dom";

const Form = () => {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    lname: "",
    desc: "",
    country: "",
  });
  const clearform = { lname: "", desc: "", country: "" };
  const dispatch = useDispatch();
  const formRecords = useSelector((state) => state.tableRecords.records);
  const navigate = useNavigate();

  function handleSubmitRecords(e) {
    e.preventDefault();
    if (edit) {
      // method call from record slice //
      dispatch(submitEditedRecords(formData));
      setEdit(false);
      setFormData(clearform);
      navigate("/add-records");
    } else {
      dispatch(addRecords(formData));
      setFormData(clearform);
    }
  }

  const { userId } = useParams();
  useEffect(() => {
    if (userId !== undefined) {
      handleEditRecords(userId);
    }
  }, [userId]);

  function handleEditRecords(id) {
    const index = formRecords.findIndex((el) => el.id === id);
    setFormData(formRecords[index]);
    setEdit(true);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="main-container">
        <div className="main-div">
          <div className="heading-div">
            {edit === true ? (
              <h1 className="heading">Edit records</h1>
            ) : (
              <h1 className="heading">Add records</h1>
            )}
          </div>
          <div className="form-container">
            <form
              className="form"
              onSubmit={(e) => {
                handleSubmitRecords(e);
              }}
            >
              <label for="location-name">Location name *</label>
              <input
                type="text"
                id="location-name"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
              />
              <label for="location-name">Country *</label>
              <input
                type="text"
                id="location-name"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
              <label for="location-desc">Location description *</label>
              <textarea
                name="desc"
                id="location-desc"
                cols="20"
                rows="10"
                value={formData.desc}
                onChange={handleChange}
              ></textarea>
            </form>
          </div>
          <div className="add-btn-div">
            {edit === true ? (
              <button className="add-btn" onClick={handleSubmitRecords}>
                Edit
              </button>
            ) : (
              <button className="add-btn" onClick={handleSubmitRecords}>
                Add
              </button>
            )}
          </div>
        </div>
        <div className="rigth-container">
          <Table handleEditRecords={(id) => handleEditRecords(id)} />
        </div>
      </div>
    </>
  );
};

export default Form;
