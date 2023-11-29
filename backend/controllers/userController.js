// const User = require('../models/user');


// // Defining the useController object
// const userController = {
//     // Defining the createUser method
//   createUser: async (req, res) => {
//     try {
//         console.log('Creating user...');
//       const newUser = new User(req.body);
//       await newUser.save();
//       res.status(200).json(newUser);
//       console.log("Connected");
//     } catch (error) {
//       console.log(error,555);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },

//   getAllUsers: async (req, res) => {
//     try{
//         console.log('Fetching all users...');
//       const users = await User.find();
//       res.status(200).json(users);
//       console.log("Connected");
//     }
//   catch(error){
//     console.log(error, 555);
//     res.status(500).json({error: "Internal Server Error"});
//   }
//   }
// };

// module.exports = userController;

// Import necessary modules and dependencies
const User = require('../models/user'); // Import the User model
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for handling JSON Web Tokens
const { generateSecretKey, secretKeys } = require('../utils/secretKeyGenerator'); // Import utility functions

// Define the userController object
const userController = {
    // Define the createUser method
    createUser: async (req, res) => {
        try {
            console.log('Creating user...'); // Log that user creation is in progress

            // Extracting user details from the request body
            const { name, email, password, phone } = req.body;

            // Validating request data - checking if all required fields are present
            if (!name || !email || !password || !phone) {
                return res.status(400).json({ error: 'Please fill in all the fields' });
            }

            // Checking if email already exists in the database
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ error: 'The email address already exists' });
            }

            // Hashing the password for security before storing it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Creating a new user document with the provided details
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                phone,
            });

            // Saving the new user document to the MongoDB database
            await newUser.save();

            // Generate a dynamic secret key for the user's email
            const dynamicSecretkey = generateSecretKey();
            secretKeys[email] = dynamicSecretkey;

            // Creating and signing a JWT token with the user's ID and dynamic secret key
            const token = jwt.sign({ userId: newUser._id }, dynamicSecretkey);

            // Returning a success response with a JWT token
            return res.status(201).json({ msg: 'Registered successfully', token });
            console.log("Successfully registered");
        } catch (error) {
            console.error(error); // Logging any errors that occur during user creation
            return res.status(500).json({ error: 'Internal Server Error' }); // Return a 500 Internal Server Error response
                console.log("Internal server error");
        }
    },

    // Define the getAllUsers method
    getAllUsers: async (req, res) => {
        try {
            console.log('Fetching all users...'); // Log that fetching all users is in progress

            // Find all users in the MongoDB database
            const users = await User.find();

            // Return a success response with the array of users
            return res.status(200).json(users);
        } catch (error) {
            console.error(error); // Log any errors that occur during fetching
            return res.status(500).json({ error: 'Internal Server Error' }); // Return a 500 Internal Server Error response
        }
    },

   
};

// Export the userController object
module.exports = userController;

