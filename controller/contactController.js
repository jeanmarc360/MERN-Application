// Import contact model
import Contact from '../model/contactModel';

// Handle index actions
const index = (req, res) => {
    Contact.find((err, contacts) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: contacts
        });
    });
};
// Handle create contact actions
const newContact = (req, res) => {
    var contact = new Contact();
    const {name,gender,email,phone} = req.body;
    contact.name = name;
    contact.gender = gender;
    contact.email = email;
    contact.phone = phone;
// save the contact and check for errors
    contact.save((err) => {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New contact created!',
            data: contact
        });
    });
};
// Handle view contact info
const view = (req, res) => {
    const {contact_id} = req.params;
    Contact.findById(contact_id, (err, contact) => {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};
// Handle update contact info
const update = (req, res) => {
    const {contact_id} = req.params;
    const {name,gender,email,phone} = req.body;
    Contact.findById(contact_id, (err, contact) => {
        if (err)
            res.send(err);
        contact.name = name;
        contact.gender = gender;
        contact.email = email;
        contact.phone = phone;
        // save the contact and check for errors
        contact.save((err) => {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};
// Handle delete contact
const deleteContact = (req, res) => {
    Contact.remove({
        _id: req.params.contact_id
    }, (err, contact) => {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};

export default {
    index,
    newContact,
    view,
    update,
    deleteContact
};
