const router = require('express').Router();

// import user controllers
const { getAllUsers, getUserById, createNewUser, updateUser, deleteUser } = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createNewUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


module.exports = router;