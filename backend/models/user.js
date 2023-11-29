const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { 
        type: String,
},
email: {
    type: String,
    required: true,
},
phone: {
    type: String,
    required: true,
    
},
password: {
    type: String,
    required: true,
  },
});

// const User = mongoose.models.User || mongoose.Schema("User", userSchema);

module.exports = mongoose.model('User', userSchema);