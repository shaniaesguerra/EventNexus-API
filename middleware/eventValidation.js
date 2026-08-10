const mongoose = require('mongoose');

const validateEventStatus = function (value) {
    return ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'].includes(value);
};

module.exports = {
    validateEventStatus
};