import "../style/table.css";
import Search from "./Search";
import Pagination from "./Pagination";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecords, sortRecords } from "../features/submitRecords";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const formRecords = useSelector((state) => state.tableRecords.records);
  const dispatch = useDispatch();
  const [searchWord, setSearchWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  const style = { cursor: "pointer" };

  function handleSearchChange(e) {
    const word = e?.target.value;
    setSearchWord(word);
  }

  const TO = currentPage * itemsPerPage;
  const FROM = TO - itemsPerPage;
  const currentItems = formRecords?.slice(FROM, TO);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const searchFilter = currentItems?.filter(
    (el) =>
      el.lname?.toLowerCase().includes(searchWord) ||
      el.desc?.toLowerCase().includes(searchWord) ||
      el.country?.toLowerCase().includes(searchWord)
  );

  return (
    <>
      <Search
        onHandleSearchChange={(e) => handleSearchChange(e)}
        searchWord={searchWord}
      />
      <table className="table-list">
        <thead>
          <tr>
            <th>Location Name</th>
            <th>Location Description</th>
            <th onClick={() => dispatch(sortRecords())} style={style}>
              Country<i className="fa-solid fa-sort"></i>
            </th>
            <th>More</th>
          </tr>
        </thead>

        <tbody>
          {searchFilter?.length > 0 ? (
            searchFilter?.map((row) => {
              return (
                <tr key={row.id}>
                  <td>{row.lname}</td>
                  <td>{row.desc}</td>
                  <td>{row.country}</td>
                  <td id="btn-td">
                    <button
                      className="edit-record-btn"
                      onClick={() => {
                        navigate(`/add-records/${row.id}`);
                      }}
                    >
                      Edit <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="delete-record-btn"
                      onClick={() => dispatch(deleteRecords(row.id))}
                    >
                      Delete
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tbody>
              <p className="no-records-msg">No records found.</p>
            </tbody>
          )}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={formRecords?.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default Table;
