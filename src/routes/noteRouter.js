const { Router } = require('express');
const noteController = require('../controllers/noteController');
const validateJWT = require('../middlewares/validateJWT');
const { validateNotePostBody, validateNotePutBody } = require('../middlewares/noteValidation');
const validateNoteNumber = require('../middlewares/validateNoteNumber');

const noteRouter = Router();

// Notes
noteRouter.get('/notes', validateJWT, noteController.getAllNotes);
noteRouter.post('/notes', validateJWT, validateNotePostBody, noteController.createNote);
noteRouter.put('/notes/:noteNumber', validateJWT, validateNoteNumber, validateNotePutBody, noteController.updateNote);
noteRouter.delete('/notes/:noteNumber', validateJWT, validateNoteNumber, noteController.deleteNote);

module.exports = noteRouter