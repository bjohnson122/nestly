import React from "react";

const RegisterPage = () => {
  return (
    <div className="register">
      <div className="register_content">
        <form>
          <input
            placeholder="First Name"
            name="firstName"
            type="text"
            required
          />
          <input placeholder="Last Name" name="lastName" type="text" required />
          <input placeholder="Email" name="email" type="email" required />
          <input
            placeholder="Password"
            name="password"
            type="password"
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            required
          />
          <input
            id="profileImage"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
          />
          <label htmlFor="profileImage">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img src="/assets/addImage.png" alt="Add a profile photo" />
            <p>Upload Your Profile Photo</p>
          </label>
          <button type="submit">REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log-in Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
