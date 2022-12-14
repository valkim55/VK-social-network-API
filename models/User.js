// import Schema and model constructors from  mongoose

const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
    {
        username: 
            {type: String, 
            required: 'Please enter your username', 
            unique: true, 
            trim: true},

        email: 
            {type: String, 
            required: true, 
            unique: true, 
            match: /.+\@.+\..+/ },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [ this, console.log(this, module.exports === this) ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },

        id: false 

    }
);

// add a virtual to count friends
UserSchema.virtual('friendsCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);
module.exports = User;