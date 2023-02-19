require('dotenv').config();
const express = require("express");
const indexRouter = require("./routes/index");
const app = express();
const logger = require("morgan");

app.use(logger("dev"));
app.use(function (req, res, next) {
    req.setTimeout(120000, function () {
        console.log('timeout')
    });
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`🚀 App listening on port ${process.env.APP_PORT}`)
})
