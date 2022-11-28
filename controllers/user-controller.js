const {User} = require('../models');

// all CRUD operations will be placed into controller object, and this object will be passed to API routes
const userController = {

    // User.find method to correspond to GET all users request
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => {
                res.json(dbUserData);
            }).catch(err => {
                res.status(400).json(err);
            });
    },

    // User.findOne method to correspond to GET one user request
    getUserById({params}, res) {
        User.findOne({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'no user found with this id'});
                    return;
                }
                res.json(dbUserData);
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

    // User.findOneAndDelete method that corresponds to DELETE request
    deleteUser({params}, res) {
        User.findOneAndDelete({ _id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'no user found with this id'});
                return;
            }
            res.json({message: `user successfully deleted`});
        }).catch(err => {
            res.status(400).json(err);
        })
    }

};

module.exports = userController;