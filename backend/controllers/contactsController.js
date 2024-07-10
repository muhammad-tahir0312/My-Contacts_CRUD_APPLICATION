const asyncHandler = require("express-async-handler")
const Contact = require("../modals/contactModels");

//get all contacts
const getAllContacts = asyncHandler( async (req,res)=>{
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts)
});

const createContact = asyncHandler( async (req,res)=>{
    const {name,email,phone} = req.body;   
    console.log(name, email, phone)
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All Fields are manditory");
    }

    const contacts = await Contact.create({user_id:req.user.id ,name:name, email:email, phone:phone});
    res.status(200).json({message: "contacts created successfully", contacts});
});

const getcontact = asyncHandler( async (req,res)=>{
    const oneContacts = await Contact.findById(req.params.id);

    if(!oneContacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(oneContacts)
});

const updateContact = asyncHandler( async (req,res)=>{
    const oneContacts = await Contact.findById(req.params.id);

    if(oneContacts.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Unauthorized to update this contact");
    }

    if(!oneContacts){
        res.status(404);
        throw new Error("Contact not found");
    }

    const updateCon = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updateCon)
});

const deleteContact = asyncHandler( async (req,res)=>{
    const oneContacts = await Contact.findById(req.params.id);

    if(oneContacts.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Unauthorized to delete this contact");
    }

    if(!oneContacts){
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json( {message: `This contact is removed`, information:oneContacts})
});




module.exports = {getAllContacts, getcontact, updateContact, createContact,deleteContact}