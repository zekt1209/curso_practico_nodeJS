const response = require("./response");

function errors(err, req, res, next) {
    console.error("[Custom Error]: " + err);

    const message = err.message || "Custom Intern Error, Please contact Developer for more info ...";
    const status = err.statusCode || 500;

    response.error(req, res, message, status);
}

module.exports = {
    errors,
};
