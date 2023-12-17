import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Table from "react-bootstrap/Table";

const App = () => {
  const [ids, setIds] = useState(0);
  const [list, setList] = useState([]);
  const [inpVal, setInpVal] = useState("");
  const [EditValue, setEditVal] = useState("");
  const handelEdit = (id, value) => {
    setIds(id);
    setEditVal(value);
  };

  const handelDelete = (id) => {
    const url = `https://localhost:7051/api/List/Delete?reqId=${id}`;
    fetch(url, {
      method: "delete",
    })
      .then((res) => res.json)
      .then(() => getData());
  };
  const getData = () => {
    fetch("https://localhost:7051/api/List/get")
      .then((respo) => respo.json())
      .then((result) => {
        setList(result);
        console.log(result);
      });
  };
  const handelput = () => {
    const url = `https://localhost:7051/api/List/Patch?reqId=${ids}`;
    const data = {
      id: ids,
      tasks: EditValue,
    };
    fetch(url, {
      method: "patch",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json)
      .then(() => {
        getData();
        setIds(0);
      });
  };
  const handelAdd = () => {
    const url = "https://localhost:7051/api/List/post";
    const data = {
      tasks: inpVal,
    };

    fetch(url, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json)
      .then(() => getData());
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3 className="text-center">To-Do-List</h3>
        <div className="input_add">
          <input
            className="form-control w-75"
            placeholder="Enter Task Here..."
            onChange={(e) => setInpVal(e.target.value)}
            value={inpVal}
          />
          <button className="btn btn-primary w-20" onClick={handelAdd}>
            Add
          </button>
        </div>
        <Table striped bordered hover style={{ width: "900px" }}>
          <thead>
            <tr>
              <th className="table_row_sr_width">Sr.No</th>
              <th className="table_row_width">Task</th>
              <th className="table_row_width width_action">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.length < 0
              ? "loading"
              : list.map((items, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {items.id !== ids ? (
                        <td className="table_row_width">{items.tasks}</td>
                      ) : (
                        <td className="table_row_width">
                          <input
                            className="form-control w-75"
                            value={EditValue}
                            onChange={(e) => setEditVal(e.target.value)}
                          />
                        </td>
                      )}

                      <td className="action_div">
                        {items.id !== ids ? (
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => handelEdit(items.id, items.tasks)}
                            >
                              Edit
                            </button>
                          </td>
                        ) : (
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={handelput}
                            >
                              Save
                            </button>
                          </td>
                        )}
                        {items.id !== ids ? (
                          <button
                            className="btn btn-danger"
                            onClick={() => handelDelete(items.id)}
                          >
                            Delete
                          </button>
                        ) : (
                          <button
                            className="btn btn-danger"
                            onClick={() => setIds(0)}
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default App;
