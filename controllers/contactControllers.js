    const Contact = require('../models/contact.model')
    
    // get all the contact

    const getContacts = async (req, res)=>{
        try {
            const contacts = await Contact.find({user_id:req.user.id});
            if(!contacts){
                res.status(404).json({message : "contact does not found", success: false })
            }
            res.status(200).json({
                message: contacts,
                success: true
            })
        } catch (error) {
            res.status(500).json({message:"internal server error"});
            console.log(error)
        }
    }

    // create contact 

   const createContact =  async (req, res)=>{
        try {
            // console.log("the request body is", req.body);
            const {name, email,phone} = req.body;
            if(!name || !email || !phone){
                res.status(400).json({
                    message : "All fields are necessary",
                    success: false 
                })
            }
            else{
                const contact = await Contact.create({
                    name,
                    email,
                    phone,
                    user_id : req.user.id
                })
                const data = await contact.save()
                // console.log(data)
                res.status(201).json({
                    message: data,
                    success: true
                })
            }
        } catch (error) {
            res.status(500).json({message:"internal server error"});
            console.log(error)
        }
    }

    //get contact 

    const getContact = async (req, res)=>{
        try {
            const contact = await Contact.findById(req.params.id);
            if(!contact){
                res.status(404).json({message : "contact does not found", success: false })
            }
            res.status(200).json({message:contact, success:true});
            // console.log(contact)
        } catch (error) {
            res.status(500).json({message:"internal server error"});
            console.log(error)
        }
    } 

    // update contact 

    const updateContact = async (req, res)=>{
        try {
            const contact = await Contact.findById(req.params.id);
            if(!contact){
                res.status(404).json({message : "contact does not found", success: false })
            }
            if(contact.user_id.toString() !== req.user.id){
                res.status(403).json({
                    message:"user don't have permission to update other user contact",
                    success:false
                })
            }
            const updateContact = await Contact.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new:true}
            )
            res.status(200).json({
                message:updateContact,
                success: true
            })
        } catch (error) {
            res.status(500).json({message:"internal server error"});
            console.log(error)
        }
    }

    //delete contact 

    const deleteContact = async (req, res)=>{
        try {
            const contact = await Contact.findByIdAndDelete(req.params.id);
            if(!contact){
                res.status(404).json({message : "contact does not found", success: false })
            }
            if(contact.user_id.toString() !== req.user.id){
                res.status(403).json({
                    message:"user don't have permission to delete other user contact",
                    success:false
                })

            await Contact.deleteOne({_id:req.params.id})
            res.status(200).json(contact)
            }
        } catch (error) {
            res.status(500).json({message:"internal server error"});
            console.log(error)
        }
    }

module.exports = {getContacts, deleteContact, updateContact,getContact,createContact }