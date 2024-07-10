const express= require("express")
const router= express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const {getAllContacts, updateContact, createContact, deleteContact, getcontact} = require("../controllers/contactsController")

router.use(validateToken)
router.route('/').get(getAllContacts).post(createContact);
router.route("/:id").put(updateContact).delete(deleteContact).get(getcontact);

module.exports = router;