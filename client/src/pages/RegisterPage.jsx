import React, { useState } from "react";
import "../styles/Register.scss";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  console.log(formData)

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form">
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
          <input
            id="profileImage"
            type="file"
            value={formData.profileImage}
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <label htmlFor="profileImage">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img src="/assets/addImage.png" alt="Add a profile photo" />
            <p>Upload Your Profile Photo</p>
          </label>
          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile icon"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit">REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log-in Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
