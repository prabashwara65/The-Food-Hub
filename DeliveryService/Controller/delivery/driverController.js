const Driver = require('../../Model/delivery/Driver');
const nodemailer = require('nodemailer');

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (e.g., Gmail, Outlook, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Your email address from the .env file
    pass: process.env.EMAIL_PASS  // Your email password or app-specific password
  }
});

const addDriver = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log the incoming request body for debugging

    // Create a new driver using the request body
    const driver = new Driver(req.body);

    // Save the driver to the database
    await driver.save();

    // Send an email to the driver
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: driver.email, // Driver's email from the request body
      subject: 'Welcome to The Food Hub',
      text: `Hello ${driver.name},\n\nWelcome to The Food Hub! You have been successfully added as a driver.\n\nYour details:\nName: ${driver.name}\nPhone: ${driver.phone}\nVehicle Type: ${driver.vehicleType}\n\nThank you for joining us!\n\nBest regards,\nThe Food Hub Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error.message);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    // Respond with success
    res.status(201).json({ message: 'Driver added successfully', driver });
  } catch (error) {
    console.error('Error:', error); // Log the error for debugging
    res.status(400).json({ error: 'Failed to add driver', details: error.message });
  }
};

const getAvailableDrivers = async (req, res) => {
  try {
    // Fetch all available drivers
    const drivers = await Driver.find({ available: true });
    res.status(200).json(drivers);
  } catch (error) {
    console.error('Error:', error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to fetch available drivers', details: error.message });
  }
};

module.exports = {
  addDriver,
  getAvailableDrivers,
};