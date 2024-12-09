const { Router } = require('express');
const noteController = require('../controllers/noteController');
const validateJWT = require('../middlewares/validateJWT');
const { validateNotePostBody, validateNotePutBody } = require('../middlewares/noteValidation');
const validateId = require('../middlewares/validateId');

const noteRouter = Router();

// Notes
noteRouter.get('/notes', validateJWT, noteController.getAllNotes);
noteRouter.post('/notes', validateJWT, validateNotePostBody, noteController.createNote);
noteRouter.put('/notes/:id', validateJWT, validateId, validateNotePutBody, noteController.updateNote);

module.exports = noteRouter