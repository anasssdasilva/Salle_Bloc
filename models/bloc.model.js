const mongoose = require('mongoose');

var blocSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    libelle: {
        type: String
    },

});
/*
// Custom validation for email
employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');*/

mongoose.model('Bloc', blocSchema);