const { json } = require('body-parser');
const {Thought, User} = require('../models');

const thoughtController = {

    // Thought.find method to retrieve all thoughts on GET request at /api/thoughts endpoint
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({path: 'reactions', select: '-__v'})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                res.status(400).json(err);
                console.log(err);
            });
    },

    // Thought.findOne method to retrieve just one thought byt its id at /api/thoughts/:id endpoint
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
            .populate({path: 'reactions', select: '-__v'})
            .select('-__v')
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({message: 'no thought found with this id'});
                    return;
                }
                res.json(dbThoughtData);
            }).catch(err => res.json(err));
    },

    // Thought.create method to write a new thought on POST request at  /api/thoughts/:userId endpoint
    createNewThought({params, body}, res) {
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    { _id: params.userId},
                    {$addToSet: {thoughts: _id}},
                    { new: true, runValidators: true}  
                );
            }).then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'no user found with this id'});
                    return;
                }
                res.json(dbUserData);
            }).catch(err => res.json(err));
    },

    // Thought.fundOneAndUpdate method to add the reaction to the thought on POST request at /api/thoughts/:thoughtId/reactions endpoint
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            {$addToSet: {reactions: body}},
            {new: true, runValidators: true}
        ).then(dbUserData => {
            if(!dbUserData) {
                res.status(400).json({message: 'no user found with this id'});
                return;
            } 
            res.json(dbUserData);
        }).catch(err => res.json(err));
    },

    // Thought.findOneAndUpdate method to update an existing thought by its id on PUT request at /api/thoughts/userId/:thoughtId endpoint, 
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            body,
            { new: true, runValidators: true}
        ).then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'no user found with this id'});
                return;
            }
            res.json(dbUserData);
        }).catch(err => res.json(err));
    },

    // Thought.findOneAndDelete method to delete a thought by its id on DELETE thought request at /api/thoughts/:userId/:thoughtId endpoint
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
            .then(deletedThought => {
                if(!deletedThought) {
                    res.status(404).json({message: 'no thought found with this id'});
                    return;
                }
                return User.findOneAndUpdate(
                    {_id: params.userId},
                    {$pull: { thoughts: params.thoughtId} },
                    { new: true }
                )
            }).then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'no user found with this id'});
                    return;
                }
                res.json({message: 'thought successfully deleted'});
            }).catch(err => res.json(err));
    },

    // Thought.findOneAndUpdate method to delete a reaction from reactions array on DELETE request at api/thoughts/:thoughtId/reactions/:reactionId endpoint
    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: {reactions: {_id: params.reactionId} } },
            {new: true}
        ).then(dbCommentData => res.json(dbCommentData))
        .catch(err => res.json(err));
    }

    
};

module.exports = thoughtController;