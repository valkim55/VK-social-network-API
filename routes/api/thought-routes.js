// import router
const router  = require('express').Router();
const { getAllThoughts, createNewThought, getThoughtById } = require('../../controllers/thought-controller');

router 
    .route('/')
    .get(getAllThoughts);

router
    .route('/:thoughtId')
    .get(getThoughtById);


router
    .route('/:userId')
    .post(createNewThought);

module.exports = router;