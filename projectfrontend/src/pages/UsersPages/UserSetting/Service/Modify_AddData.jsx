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

  const [allergyId, setAllergyId] = useState(null);
  const [medicationAllergies, setMedicationAllergies] = useState([]);
  const [foodAllergies, setFoodAllergies] = useState([]);
  const [environmentalAllergies, setEnvironmentalAllergies] = useState([]);

  const finalMedicationAllergies = medicationAllergies.sort().join(",");
  const finalFoodAllergies = foodAllergies.sort().join(",");
  const finalEnvironmentalAllergies = environmentalAllergies.sort().join(",");

  const medAllergiesOption = [
    "None",
    "Amoxicillin",
    "Anesthetics",
    "Anticonvulsants",
    "Aspirin",
    "Cephalosporins",
    "Chemotherapy drugs",
    "Penicillin",
    "Sulfa drugs",
  ];

  const foodAllergiesOption = [
    "None",
    "Celery",
    "Corn",
    "Eggs",
    "Fish",
    "Meat",
    "Milk",
    "Mustard",
    "Peanuts",
    "Sesame",
    "Shellfish",
    "Soy",
    "Wheat",
  ];

  const enviAllergiesOption = [
    "None",
    "Cockroach droppings",
    "Chemical fumes",
    "Dust mites",
    "Grass",
    "Latex",
    "Mold",
    "Pet dander",
    "Pollen",
    "Pollution",
    "Smoke",
    "Tree pollen",
    "Weeds",
  ];

  useEffect(() => {
    if (type === "medicalhistory") {
      setTitle("Medical History");
    } else if (type === "allergiesrecord") {
      setTitle("Allergies Record");
    } else if (type === "allergiesrecordupdate") {
      setTitle("Update Allergies Record");

      const fetchUserData = async () => {
        if (user?.id) {
          try {
            const responseAllergy = await axios.get(
              `http://localhost:8080/api/medical-allergies/${user.id}`
            );

            const allergyData = responseAllergy.data;

            // Check if data exists
            setAllergyId(allergyData.id);
            const fetchedMedAllergies = allergyData.medicationAllergies || "";
            const fetchedFoodAllergies = allergyData.foodAllergies || "";
            const fetchedEnvAllergies =
              allergyData.environmentalAllergies || "";

            // Split the strings into arrays or set empty arrays if no data
            setMedicationAllergies(fetchedMedAllergies.split(",") || []);
            setFoodAllergies(fetchedFoodAllergies.split(",") || []);
            setEnvironmentalAllergies(fetchedEnvAllergies.split(",") || []);

            console.log(fetchedMedAllergies);
            console.log(fetchedFoodAllergies);
            console.log(fetchedEnvAllergies);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      };

      fetchUserData();
    }
  }, [type, user?.id]);

  // =================================================   Handler   =================================================

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleMedicationChange = (event) => {
    const { value, checked } = event.target;

    if (value === "None" && checked) {
      setMedicationAllergies(["None"]);
    } else if (value === "None" && !checked) {
      setMedicationAllergies([]);
    } else {
      const updatedAllergies = checked
        ? [
            ...medicationAllergies.filter((allergy) => allergy !== "None"),
            value,
          ]
        : medicationAllergies.filter((allergy) => allergy !== value);
      setMedicationAllergies(updatedAllergies);
    }
  };

  const handleFoodChange = (event) => {
    const { value, checked } = event.target;

    if (value === "None" && checked) {
      setFoodAllergies(["None"]);
    } else if (value === "None" && !checked) {
      setFoodAllergies([]);
    } else {
      const updatedAllergies = checked
        ? [...foodAllergies.filter((allergy) => allergy !== "None"), value]
        : foodAllergies.filter((allergy) => allergy !== value);
      setFoodAllergies(updatedAllergies);
    }
  };

  const handleEnvironmentalChange = (event) => {
    const { value, checked } = event.target;

    if (value === "None" && checked) {
      setEnvironmentalAllergies(["None"]);
    } else if (value === "None" && !checked) {
      setEnvironmentalAllergies([]);
    } else {
      const updatedAllergies = checked
        ? [
            ...environmentalAllergies.filter((allergy) => allergy !== "None"),
            value,
          ]
        : environmentalAllergies.filter((allergy) => allergy !== value);
      setEnvironmentalAllergies(updatedAllergies);
    }
  };

  // =================================================   Save Forms   =================================================

  const saveForms = async () => {
    const elderlyUserId = user.id;
    if (type === "medicalhistory") {
      try {
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
          formToSave
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
    } else if (type === "allergiesrecord") {
      try {
        if (
          (Array.isArray(foodAllergies) && foodAllergies.length === 0) ||
          (Array.isArray(environmentalAllergies) &&
            environmentalAllergies.length === 0) ||
          (Array.isArray(medicationAllergies) &&
            medicationAllergies.length === 0)
        ) {
          alert("Please select at least a choice for each.");
          return;
        }

        const DataToSave = {
          elderlyUser: { id: elderlyUserId },
          medicationAllergies: finalMedicationAllergies,
          foodAllergies: finalFoodAllergies,
          environmentalAllergies: finalEnvironmentalAllergies,
        };

        const response = await axios.post(
          "http://localhost:8080/api/medical-allergies/create",
          DataToSave
        );

        console.log("Saved form data:", response.data);
        alert("Form saved!");

        setRefresh(true);
        navigate(-1);
        setMedicationAllergies([]);
        setFoodAllergies([]);
        setEnvironmentalAllergies([]);
      } catch (error) {
        console.error("Error saving form:", error);
        alert("There was an error saving the form.");
      }
    } else if (type === "allergiesrecordupdate") {
      try {
        // Validation: check if any of the allergy arrays are empty
        if (
          (Array.isArray(foodAllergies) && foodAllergies.length === 0) ||
          (Array.isArray(environmentalAllergies) &&
            environmentalAllergies.length === 0) ||
          (Array.isArray(medicationAllergies) &&
            medicationAllergies.length === 0)
        ) {
          alert("Please select at least a choice for each.");
          return;
        }

        // Prepare the data to save
        const DataToSave = {
          elderlyUser: { id: elderlyUserId },
          medicationAllergies: finalMedicationAllergies,
          foodAllergies: finalFoodAllergies,
          environmentalAllergies: finalEnvironmentalAllergies,
        };

        if (allergyId) {
          // Ensure you have the ID before making the request
          const response = await axios.put(
            `http://localhost:8080/api/medical-allergies/update/${allergyId}`,
            DataToSave
          );

          console.log("Saved form data:", response.data);
          alert("Form saved!");

          // Refresh and navigate back
          setRefresh(true);
          navigate(-1);
          setMedicationAllergies([]);
          setFoodAllergies([]);
          setEnvironmentalAllergies([]);
        } else {
          console.error("Allergy ID not found");
        }
      } catch (error) {
        console.error("Error saving form:", error);
        alert("There was an error saving the form.");
      }
    }
  };

  return (
    <>
      <div className="MA-Section">
        <div className="MA-Header">
          <Link to={-1} className="MA-Return">
            {"< Back"}
          </Link>
          <h1 className="MA-Title"> {title}</h1>

          <button className="MA-Save_Button" onClick={saveForms}>
            Save
          </button>
        </div>

        <div className="MA-DataSection">
          {type === "medicalhistory" && (
            <div className="bg-white mx-8">
              <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                  {/* Previous Illnesses Input */}
                  <div className="MH-Container">
                    <dt className="MH-DataTitle">Previous Illnesses</dt>
                    <dd className="MH-Data-Container">
                      <input
                        type="text"
                        name="illness"
                        placeholder="Enter previous illnesses"
                        className="MH-Data-Input"
                        value={form.illness}
                        onChange={handleInputChange}
                        autoComplete="off"
                      />
                    </dd>
                  </div>

                  {/* Surgeries Input */}
                  <div className="MH-Container">
                    <dt className="MH-DataTitle">Surgeries</dt>
                    <dd className="MH-Data-Container">
                      <input
                        type="text"
                        name="surgeries"
                        placeholder="Enter surgeries"
                        className="MH-Data-Input"
                        value={form.surgeries}
                        onChange={handleInputChange}
                        autoComplete="off"
                      />
                    </dd>
                  </div>

                  {/* Date Input */}
                  <div className="MH-Container">
                    <dt className="MH-DataTitle">Date</dt>
                    <dd className="MH-Data-Container">
                      <input
                        type="date"
                        name="date"
                        className="MH-Data-Input"
                        value={form.date}
                        onChange={handleInputChange}
                      />
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {(type === "allergiesrecord" || type === "allergiesrecordupdate") && (
            <div className="AR-Container">
              <div className="AR-Section">
                <h1>Medication Allergies</h1>
                <div className="AR-Option-Container">
                  {medAllergiesOption.map((option) => (
                    <div className="AR-Option-Item" key={option}>
                      <input
                        type="checkbox"
                        value={option}
                        checked={medicationAllergies.includes(option)} // Pre-select based on state
                        onChange={handleMedicationChange}
                        disabled={
                          medicationAllergies.includes("None") &&
                          option !== "None"
                        }
                      />
                      {option}
                    </div>
                  ))}
                </div>
              </div>

              <div className="AR-Section">
                <h1>Food Allergies</h1>
                <div className="AR-Option-Container">
                  {foodAllergiesOption.map((option) => (
                    <div className="AR-Option-Item" key={option}>
                      <input
                        type="checkbox"
                        value={option}
                        checked={foodAllergies.includes(option)} // Pre-select based on state
                        onChange={handleFoodChange}
                        disabled={
                          foodAllergies.includes("None") && option !== "None"
                        }
                      />
                      {option}
                    </div>
                  ))}
                </div>
              </div>

              <div className="AR-Section">
                <h1>Environmental Allergies</h1>
                <div className="AR-Option-Container">
                  {enviAllergiesOption.map((option) => (
                    <div className="AR-Option-Item" key={option}>
                      <input
                        type="checkbox"
                        value={option}
                        checked={environmentalAllergies.includes(option)} // Pre-select based on state
                        onChange={handleEnvironmentalChange}
                        disabled={
                          environmentalAllergies.includes("None") &&
                          option !== "None"
                        }
                      />
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modify_Add;
