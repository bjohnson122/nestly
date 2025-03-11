// Import packages
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User");
const { ifError } = require("assert");

/* Configuration for Multer (for file upload) */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // <-- stores files in 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // <-- use the original filename
  },
});

const upload = multer({ storage });

router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    /* Take the information from the Register form */
    const { firstName, lastName, email, password } = req.body;

    /* The uploaded file is available as req.file */
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400, "No file uploaded");
    }
    /* path to the uploaded profile photo */
    const profileImagePath = profileImage.path;
    /* Check if user exists (i.e., if a user made an account previously based on their email*/
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    /* Hash the password */
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    /* Create a user based on the information entered in the form,
       the remaining props (i.e., wishList, tripList, etc. will be populated later) */
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    /* Save the new user */
    await newUser.save();

    /* Send a successful message */
    res
      .status(200)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
});

/* USER LOG-IN */
router.post("/login", async (req, res) => {
  try {
    /* take information from the form */
    const { email, password } = req.body;
    /* check if userExists */
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(409)
        .json({ message: "No accounts found with that email" });
    }
    /* Compare the password with the hashed password:
       user comes from line 61 --> where the new User constructor 
       password is set to the hashed password */
    const matchingPassword = await bcrypt.compare(password, user.password);
    /* ↑ bcrypt.compare() rehashes the plain text password using the same 
    hashing algorithm and salt that was used for user.password.*/
    if (!matchingPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    /* Generate JWT token */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user, message: "Success!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Server error: ${err}` });
  }
});

module.exports = router;
