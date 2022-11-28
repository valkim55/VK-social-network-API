const router = require('express').Router();

// import user controllers
const { getAllUsers, getUserById, createNewUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createNewUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/:friendId')
    .put(addFriend)
    .delete(removeFriend);

module.exports = router;