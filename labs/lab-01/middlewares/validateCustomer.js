const validateCustomer = (req, res, next) => {
  const user = req.body;
  if (!user.name || user.name.trim().length < 3) {
    console.log("Validation for name in middleware");

    return res.status(400).json({
      message: "Name cannot be blank or less than 3 characters",
    });
  }
  if (!user.email) {
    console.log("Validation for email in middleware");

    return res.status(400).json({
      message: "Email cannot be blank",
    });
  }

  const validator = require("validator");

  if (!validator.isEmail(user.email)) {
    return res.status(400).json({
      message: "Email is not in correct format",
    });
  }

  if (!user.phone || !validator.isMobilePhone(user.phone, "en-IN")) {
    return res.status(400).json({
      message: "Invalid mobile number",
    });
  }

  const age = user.age;
  if (age === undefined || !Number.isInteger(age) || age < 18 || age > 100) {
    return res.status(400).json({
      message: "Age should be a number between 18 to 100",
    });
  }

  dob = user.dob;
  if (!dob || !validator.isDate(dob)) {
    return res.status(400).json({
      message: "Invalid Date of Birth",
    });
  }

  gst = user.gst;
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (!gst || !gstRegex.test(gst)) {
    return res.status(400).json({
      message: "Invalid GST Number",
    });
  }

  next();
};

module.exports = validateCustomer;
