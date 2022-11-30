// import router
const router  = require('express').Router();
const { getAllThoughts, createNewThought, getThoughtById, updateThought, deleteThought, addReaction, removeReaction } = require('../../controllers/thought-controller');

router 
    .route('/')
    .get(getAllThoughts);

router
    .route('/:id')
    .get(getThoughtById)
    
router
    .route('/:userId')
    .post(createNewThought);

router
    .route('/:userId/:thoughtId')
    .put(updateThought)
    .delete(deleteThought)

router
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

module.exports = router;