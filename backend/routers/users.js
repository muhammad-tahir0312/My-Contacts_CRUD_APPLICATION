const express= require("express")
const routers= express.Router();
const {register, login, current, okie} = require("../controllers/usersController")
const validateToken = require("../middleware/validateTokenHandler");
const { route } = require("./contacts");

routers.route("/register").post(register)

routers.route("/login").post(login)

routers.route("/current").get(validateToken, current)

module.exports = routers;