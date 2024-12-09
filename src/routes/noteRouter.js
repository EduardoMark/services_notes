const { Router } = require('express');
const noteController = require('../controllers/noteController');
const validateJWT = require('../middlewares/validateJWT');
const { validateNotePostBody } = require('../middlewares/noteValidation');


const noteRouter = Router();

// Notes
noteRouter.get('/notes', validateJWT, noteController.getAllNotes);
noteRouter.post('/notes', validateJWT, validateNotePostBody, noteController.createNote);

module.exports = noteRouter