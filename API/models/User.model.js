const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { REQUIRED_FIELD, INVALID_EMAIL, INVALID_LENGTH } = require('../config/errorMessages');

const ROUNDS = 10;

const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, REQUIRED_FIELD]
        },
        lastName: {
            type: String,
            required: [true, REQUIRED_FIELD] 
        },
        restaurantName: {
            type: String
        },
         email: {
            type: String,
            required: [true, REQUIRED_FIELD],
            match: [EMAIL_PATTERN],
            unique: [true]
    },
         password: {
        type: String,
        required: [true],
        minlength: [8, INVALID_LENGTH]
         },
        },
        {
          timestamps: true,
          toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
              delete ret.__v;
              delete ret._id;
              delete ret.password;
            }
          }
        }
      )
      
      UserSchema.virtual('recipes', {
        ref: 'Recipe',
        foreignField: 'owner',
        localField: '_id',
        justOne: false
      })
      
      UserSchema.virtual('recipesCreated', {
        ref: 'Recipe',
        foreignField: 'createdBy',
        localField: '_id',
        justOne: false
      })
      

UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
      bcrypt.hash(this.password, ROUNDS)
        .then(hash => {
          this.password = hash
          next()
        })
        .catch(next)
    } else {
      next()
    }
  })

UserSchema.methods.checkPassword = function (passwordToCompare) {
    return bcrypt.compare(passwordToCompare, this.password);
  }
const User = mongoose.model('User', UserSchema);

module.exports = User;