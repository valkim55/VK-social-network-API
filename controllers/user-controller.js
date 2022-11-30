const {User, Thought} = require('../models');

// all CRUD operations will be placed into controller object, and this object will be passed to API routes
const userController = {

    // User.find method to correspond to GET all users request
    getAllUsers(req, res) {
        User.find({})
            .populate(
                { path: 'thoughts', select: '-__v' }
            )
            .populate(
                { path: 'friends', select: '-__v'}
            )
            .select('-__v')
            .sort( {__id: -1} )
            .then(dbUserData => {
                res.json(dbUserData);
            }).catch(err => {
                res.status(400).json(err);
                console.log(err)
            });
    },

    // User.findOne method to correspond to GET one user request
    getUserById({params}, res) {
        User.findOne({ _id: params.id })
            .populate( {path: 'thoughts', select: '-__v'} )
            .populate( {path: 'friends', select: '-__v'} )
            .select('-__v')
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'no user found with this id'});
                    return;
                }
                res.json(dbUserData);
                //console.log(dbUserData.thoughts)
            }).catch(err => {
                res.status(400).json(err);
            });
    },

    // User.create method that corresponds to POST request
    createNewUser({body}, res) {
        User.create(body)
            .then(dbUserData =>  {
                return res.json(dbUserData);
            }).catch(err => {
                res.status(400).json(err);
            });
    },

    // User.findOneAndUpdate method to update existing user data, corresponds to PUT request
    updateUser({params, body}, res) {
        User.findOneAndUpdate(
            { _id: params.id }, body, { new: true }
        ).then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'no user found with this id'});
                return;
            }
            res.json(dbUserData);
            console.log(`user info successfully updated`);
        }).catch(err => {
            res.status(400).json(err);
        });
    },

    // User.findOneAndUpdate method to add a friend by id through PUT request, corresponding route will be /api/users/:userId/:friendId
    addFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId}, {$addToSet: {friends: {friendId: params.friendId} }}, {new: true}
        ).then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'no user found with requested id'});
                return;
            }
            res.json(dbUserData);
        }).catch(err => { res.status(400).json(err) });
    },

    // User.findOneAndUpdate method to remove a friend by id through DELETE request at /api/users/:userId/:friendId endpoint
    removeFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: {friends: {friendId: params.friendId} }}, 
            { new: true }
        ).then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'no user found with this id'});
                return;
            }
            res.json(dbUserData);
        }).catch(err => {
            res.status(400).json(err);
        });
    },

    // User.findOneAndDelete method that corresponds to DELETE request at /api/users/:userId endpoint
    deleteUser({params}, res) {
        User.findOneAndDelete(
            { _id: params.id}
        ).then(deletedUser => {
            if(!deletedUser) {
                res.status(404).json({message: 'no user found with this id'});
                return;
            }
            return Thought.deleteMany({userId: params.id}, { $pull: {thoughts: []}})
        }).then(result => {
            console.log(result);
            return res.json({message: 'user deleted'});
        }).catch(err => {
            res.status(400).json(err)
        })
    }

};

module.exports = userController;