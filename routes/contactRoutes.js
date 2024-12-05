const express = require('express');
const router = express.Router();
const {getContacts, deleteContact, updateContact,getContact,createContact } = require('../controllers/contactControllers');
const validateToken = require('../middlewares/jwtTokenValidater');

router.use(validateToken)

router.route('/').get(getContacts)
router.route('/').post(createContact)
router.route('/:id').get(getContact)
router.route('/:id').put(updateContact)
router.route('/:id').delete(deleteContact)

module.exports = router;