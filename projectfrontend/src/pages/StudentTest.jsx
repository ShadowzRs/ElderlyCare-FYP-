import React, { useEffect, useState } from "react";

const Student = () => {
  const [name, setName] = useState("");
  const [address, setAdress] = useState("");

  const [student, setStudents] = useState([]);

  const handleRegister = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);

    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("NEW STUDENT HAS BEEN ADDED!");
    });
  };

  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);

  return (
    <>
      <div style={styles.container}>
        <label
          htmlFor="StudentName"
          className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="name"
            id="StudentName"
            placeholder="Name"
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
            Name
          </span>
        </label>

        <label
          htmlFor="StudentAddress"
          className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="address"
            id="StudentAddress"
            placeholder="Address"
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            value={address}
            onChange={(e) => setAdress(e.target.value)}
          />

          <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
            Address
          </span>
        </label>
        <button type="submit" onClick={handleRegister}>
          Register
        </button>

        <div>
          {student.map((student) => (
            <p>
              Id:{student.id}
              <br />
              Name:{student.name}
              <br />
              Address:{student.address}
            </p>
          ))}
        </div>
      </div>

      {/* <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Register</button>
      </form> */}
    </>
  );
};

const styles = {
  container: {
    display: "grid",
    margin: "200px 500px 100px 500px",
    gridRowGap: "7px",
  },
};

export default Student;
