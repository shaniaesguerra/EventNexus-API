const mongoose = require('mongoose');

const validateObjectId = (id) => mongoose.isValidObjectId(id);

const validateEventStatus = function (value) {
    return ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'].includes(value);
};

module.exports = {
    validateEventStatus,
    validateObjectId
};