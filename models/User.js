const { Schema, model, Types } = require('mongoose');


const UserSchema = new Schema(
    {    
        username: {
            type: String,
            unique: true,
            required: true, 
            trim: true 
        },
        email: {
            type: String,
            required: true, 
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
            
        },
        throughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    } 
);

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//create the Pizza model using PizzaSchema
const User = model('User', UserSchema);

//export the Pizza model 
module.exports = User;