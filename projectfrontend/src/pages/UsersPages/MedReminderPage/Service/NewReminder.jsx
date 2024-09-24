import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../../../UserContext.jsx";
import { RefreshContext } from "../../MedReminderPage/Med_ReminderPage.jsx";
import ErrorPage from "../../../../component/Error/ErrorPage.jsx";
import axios from "axios";

import "../../MedicalRecordPage/Service/Modify_AddData.css";

const Creating_Reminder = () => {
  const { user } = useContext(UserContext);
  const { setRefresh } = useContext(RefreshContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    reminderType: "",
    date: "",
    time: "",
    desc: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};

    if (!form.reminderType) {
      formErrors.reminderType = "Reminder type is required.";
    }

    if (!form.date) {
      formErrors.date = "Reminder date is required.";
    }

    if (!form.time) {
      formErrors.time = "Reminder time is required.";
    }

    return formErrors;
  };

  const saveForms = async () => {
    const elderlyUserId = user.id;

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      alert(
        `Please fill out the following fields:\n${Object.keys(formErrors)
          .map((key) => formErrors[key])
          .join("\n")}`
      );
      return;
    }

    try {
      const formToSave = {
        elderlyUser: { id: elderlyUserId },
        reminderType: form.reminderType,
        reminderDate: form.date,
        time: form.time,
        notes: form.desc,
      };

      const response = await axios.post(
        "http://localhost:8080/api/reminders/create",
        formToSave
      );

      console.log("Saved form data:", response.data);
      alert("Form saved!");
      setForm({ reminderType: "", date: "", time: "", desc: "" });

      setRefresh(true);
      navigate(-1);
    } catch (error) {
      console.error("Error saving form:", error);
      alert("There was an error saving the form.");
    }
  };

  return (
    <>
      {user ? (
        <div className="MA-Section">
          <div className="MA-Header">
            <Link to={-1} className="MA-Return">
              {"< Back"}
            </Link>
            <h1 className="MA-Title"> Creating New Reminder</h1>

            <button className="MA-Save_Button" onClick={saveForms}>
              Save
            </button>
          </div>

          <div className="MA-DataSection">
            <div className="bg-white mx-8">
              <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                  {/* Type Input */}
                  <div className="MH-Container">
                    <dt className="MH-DataTitle">Type</dt>
                    <dd className="MH-Data-Container">
                      <select
                        name="reminderType"
                        className="MH-Data-Input"
                        value={form.reminderType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="" disabled={form.reminderType !== ""}>
                          Select Reminder Type
                        </option>
                        <option value="appointment">
                          Appointment Reminder
                        </option>
                        <option value="medicine">Medicine Reminder</option>
                      </select>
                    </dd>
                  </div>

                  {/* Date Input */}
                  <div className="MH-Container">
                    <dt className="MH-DataTitle">Reminder Date</dt>
                    <dd className="MH-Data-Container">
                      <input
                        type="date"
                        name="date"
                        className="MH-Data-Input"
                        value={form.date}
                        onChange={handleInputChange}
                        required
                      />
                    </dd>
                  </div>

                  {/* Time Input */}
                  <div className="MH-Container">
                    <dt className="MH-DataTitle">Time</dt>
                    <dd className="MH-Data-Container">
                      <input
                        type="time"
                        name="time"
                        className="MH-Data-Input"
                        value={form.time}
                        onChange={handleInputChange}
                        autoComplete="off"
                        required
                      />
                    </dd>
                  </div>

                  {/* Detail Input */}
                  <div className="MH-Container">
                    <dt className="MH-DataTitle">Notes</dt>
                    <dd className="MH-Data-Container">
                      <textarea
                        name="desc"
                        placeholder="Enter notes or details here"
                        className="MH-Data-Input"
                        rows="3"
                        value={form.desc}
                        onChange={handleInputChange}
                        autoComplete="off"
                      />
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ErrorPage
          errorCode="401"
          title="Unauthorized Access!"
          message="Invalid Authentication Credentials to Access Reminder"
          buttonText="Return to Home"
          redirectTo="/"
        />
      )}
    </>
  );
};

export default Creating_Reminder;
