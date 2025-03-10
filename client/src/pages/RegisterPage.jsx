import React, { useEffect, useState } from "react";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const register_form = new FormData(); // <-- utilizes the FormData constructor provided by the browser: https://developer.mozilla.org/en-US/docs/Web/API/FormData

      for (let key in formData) {
        register_form.append(key, formData[key]); // assigns the key:value in the FormData() constructor
      }

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form,
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.log("Registration failed", err.message);
    }
  };

  /* useEffect to track whether the passwords match & 
     will hold the state that affects warnings & button disabling */
  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        (formData.password !== "" && formData.confirmPassword === "")
    );
  }, [formData.password, formData.confirmPassword]);

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            type="text"
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            value={formData.email}
            type="email"
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            type="password"
            onChange={handleChange}
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            type="password"
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}

          <input
            id="profileImage"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="profileImage">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img src="/assets/addImage.png" alt="Add a profile photo" />
            <p>Upload Your Profile Photo</p>
          </label>
            <p>Upload Your Profile Photo</p>

          {formData.profileImage && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch}>
            REGISTER
          </button>
        </form>
        <a href="/login">Already have an account? Log-in Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
