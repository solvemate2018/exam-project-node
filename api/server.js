const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.locals.title = "AIRexam";
app.listen(PORT, console.log(`Server started on port ${PORT}`));

exports.app = app;
