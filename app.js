const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const apiV1 = require("./v1");

const app = express();

const API_V1_ROUTE = "/api/v1";
app.locals.API_V1_ROUTE = API_V1_ROUTE;

/* Entries */
// let entries = [];
// app.locals.entries = entries;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* API Version 1 */
app.use(app.locals.API_V1_ROUTE, apiV1);

app.get("/", (req, res, next) => {
	res.redirect(app.locals.API_V1_ROUTE);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500).json({ message: "Not found." });
});

module.exports = app;
