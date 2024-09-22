import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../../../UserContext.jsx";
import { RefreshContext } from "../User-Setting.jsx";
import axios from "axios";

import "./Modify_AddData.css";

const Modify_Add = () => {
  const { user } = useContext(UserContext);
  const { setRefresh } = useContext(RefreshContext);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const [title, setTitle] = useState("");
  const [form, setForm] = useState([
    { illness: "", surgeries: "", date: "" }, // initialized 1 form
  ]);

  useEffect(() => {
    if (type === "medicalhistory") {
      setTitle("Medical History");
    } else if (type === "allegriesrecord") {
      setTitle("Allergies Record");
    }
  }, [type]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const saveForms = async () => {
    if (type === "medicalhistory") {
      try {
        const elderlyUserId = user.id;

        // Validate that both fields are not empty
        if (!form.illness.trim() || !form.surgeries.trim()) {
          alert("Please fill in both Previous Illnesses and Surgeries.");
          return; // Exit
        }

        // Prepare the data to include the elderly user ID
        const formToSave = {
          elderlyUser: { id: elderlyUserId },
          illness: form.illness,
          surgeries: form.surgeries,
          date: form.date,
        };

        // Send a POST request to the backend API
        const response = await axios.post(
          "http://localhost:8080/api/medical-history/create",
          formToSave // Send the single object
        );

        console.log("Saved form data:", response.data);
        alert("Form saved!");
        setForm({ illness: "", surgeries: "", date: "" });

        setRefresh(true);
        navigate(-1);
      } catch (error) {
        console.error("Error saving form:", error);
        alert("There was an error saving the form.");
      }
    } else if (type === "allegriesrecord") {
    }
  };

  return (
    <>
      <div className="MA-Section">
        <div className="MA-Header">
          <Link to={-1} className="MA-Return">
            {"< Back"}
          </Link>
          <h1 className="MA-Title"> Add/Modify</h1>

          <button className="MA-Save_Button" onClick={saveForms}>
            Save
          </button>
        </div>

        <div className="MA-DataSection">
          <div className="MA-Section-Title">
            <h1 className="MA-Title"> {title}</h1>
          </div>
          {type === "medicalhistory" && (
            <div className="bg-white mx-8 mb-4">
              <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                  {/* Previous Illnesses Input */}
                  <div className="MA-Container">
                    <dt className="MA-DataTitle">Previous Illnesses</dt>
                    <dd className="MA-Data-Container">
                      <input
                        type="text"
                        name="illness"
                        placeholder="Enter previous illnesses"
                        className="MA-Data-Input"
                        value={form.illness}
                        onChange={handleInputChange}
                        autoComplete="off"
                      />
                    </dd>
                  </div>

                  {/* Surgeries Input */}
                  <div className="MA-Container">
                    <dt className="MA-DataTitle">Surgeries</dt>
                    <dd className="MA-Data-Container">
                      <input
                        type="text"
                        name="surgeries"
                        placeholder="Enter surgeries"
                        className="MA-Data-Input"
                        value={form.surgeries}
                        onChange={handleInputChange}
                        autoComplete="off"
                      />
                    </dd>
                  </div>

                  {/* Date Input */}
                  <div className="MA-Container">
                    <dt className="MA-DataTitle">Date</dt>
                    <dd className="MA-Data-Container">
                      <input
                        type="date"
                        name="date"
                        className="MA-Data-Input"
                        value={form.date}
                        onChange={handleInputChange}
                      />
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modify_Add;
