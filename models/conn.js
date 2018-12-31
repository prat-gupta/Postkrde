var mysql = require("mysql")
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "flipcard"
})
con.connect(function (error) {
    if (error)
        console.log(error)
    else
        console.log("connection established")
})
module.exports = con