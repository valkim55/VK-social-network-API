const {Schema, model, Types} = require('mongoose');
const formatDate = require('../utils/convert-date');


const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },

        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },

        username: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => formatDate(createdAtVal)
        }
    },
    {
        toJSON: {
            // adding getters to use date converting function
            getters: true
        },
        id: false
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true, 
            maxLength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => formatDate(createdAtVal) 
        },

        username: {
            type: String,
            required: true,
            trim: true
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        reactions: [ ReactionSchema ]
    },
    {
        toJSON: {
            // adding virtuals to count reactions per comment, and getters to convert date into a readable format
            virtuals: true,
            getters: true 
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionsCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;