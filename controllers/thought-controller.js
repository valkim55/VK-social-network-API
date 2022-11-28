const { json } = require('body-parser');
const {Thought, User} = require('../models');

const thoughtController = {

    // Thought.find method to retrieve all thoughts on GET request at /api/thoughts endpoint
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                res.status(400).json(err);
                console.log(err);
            });
    },

    // Thought.findOne method to retrieve just one thought byt its id at /api/thoughts/:id endpoint
    getThoughtById({params}, res) {
        Thought.findById({ _id: params.thoughtId })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({message: 'no thought found with this id'});
                    return;
                }
                json(dbThoughtData);
            }).catch(err => res.json(err));
    },

    // Thought.create method to write a new thought on POST request at  /api/thoughts/:userId endpoint
    createNewThought({params, body}, res) {
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    { _id: params.userId},
                    {$addToSet: {thoughts: _id}},
                    { new: true}  
                );
            }).then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'no user found with this id'});
                    return;
                }
                res.json(dbUserData);
            }).catch(err => res.json(err));
    }
};

module.exports = thoughtController;