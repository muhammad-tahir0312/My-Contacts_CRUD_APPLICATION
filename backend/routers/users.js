const express= require("express")
const routers= express.Router();
const {register, login, current} = require("../controllers/usersController")
const validateToken = require("../middleware/validateTokenHandler")

routers.route("/register").post(register)

routers.route("/login").post(login)

routers.route("/current").get(validateToken, current)

module.exports = routers;