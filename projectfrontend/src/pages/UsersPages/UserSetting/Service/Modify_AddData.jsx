import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { UserContext } from "../../../../UserContext.jsx";
import "./Modify_AddData.css";

const Modify_Add = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (type === "medicalhistory") {
      setTitle("Medical History");
    } else if (type === "allegriesrecord") {
      setTitle("Allergies Record");
    }
  }, [type]);

  return (
    <>
      <div className="MA-Section">
        <div className="MA-Header">
          <Link to={-1} className="MA-Return">
            {"< Back"}
          </Link>
          <h1 className="MA-Title">Modify {title}</h1>
          <button className="MA-Save_Button">Save</button>
        </div>

        <div className="MA-DataSection">
          <h2>History 1</h2>
          <div className="bg-white mx-8">
            <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                {/* Previous Illnesses Input */}
                <div className="MA-Container">
                  <dt className="MA-DataTitle">Previous Illnesses</dt>
                  <dd className="MA-Data-Container">
                    <input
                      type="text"
                      placeholder="Enter previous illnesses"
                      className="MA-Data-Input"
                    />
                  </dd>
                </div>

                {/* Surgeries Input */}
                <div className="MA-Container">
                  <dt className="MA-DataTitle">Surgeries</dt>
                  <dd className="MA-Data-Container">
                    <input
                      type="text"
                      placeholder="Enter surgeries"
                      className="MA-Data-Input"
                    />
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <h2>History 2</h2>
          <div className="bg-white mx-8">
            <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                {/* Previous Illnesses Input */}
                <div className="MA-Container">
                  <dt className="MA-DataTitle">Previous Illnesses</dt>
                  <dd className="MA-Data-Container">
                    <input
                      type="text"
                      placeholder="Enter previous illnesses"
                      className="MA-Data-Input"
                    />
                  </dd>
                </div>

                {/* Surgeries Input */}
                <div className="MA-Container">
                  <dt className="MA-DataTitle">Surgeries</dt>
                  <dd className="MA-Data-Container">
                    <input
                      type="text"
                      placeholder="Enter surgeries"
                      className="MA-Data-Input"
                    />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <span className="flex py-10 items-center">
          <span className="h-px flex-1 bg-gray-300"></span>
          <button className="text-gray-400 shrink-0 px-6">Click To Add</button>
          <span className="h-px flex-1 bg-gray-300"></span>
        </span>
      </div>
    </>
  );
};

export default Modify_Add;
