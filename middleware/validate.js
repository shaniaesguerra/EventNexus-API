const mongoose = require('mongoose');

const isValidObjectId = function (id) {
    return mongoose.Types.ObjectId.isValid(id);
};

const validateVenueServices = function (array) {
    const allowed = ["food", "parking", "WIFI"];
    const unique = new Set(array);
    
    // Conditions for checking if the services section
    // has the allowed values:
    const noDuplicates = array.length === unique.size;
    const allValid = array.every(item => allowed.includes(item));

    return noDuplicates && allValid;
}

module.exports = {
    isValidObjectId,
    validateVenueServices
};
