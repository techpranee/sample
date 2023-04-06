/**
 * user.js
 * @description :: model of a database collection user
 */

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const { USER_TYPES } = require('../constants/authConstant');
const { convertObjectToEnum } = require('../utils/common');
const authConstantEnum = require('../constants/authConstant');
        
const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema(
  {

    password:{ type:String },

    email:{ type:String },

    name:{ type:String },

    userType:{
      type:Number,
      enum:convertObjectToEnum(USER_TYPES),
      required:true
    },

    isActive:{ type:Boolean },

    isDeleted:{ type:Boolean },

    createdAt:{ type:Date },

    updatedAt:{ type:Date },

    contact:{
      country_code:{ type:Number },
      phone:{
        type:Number,
        min:10,
        max:10,
        required:false,
        unique:true
      }
    },

    address:{
      locality:{ type:String },
      city:{ type:String },
      state:{ type:String }
    },

    zipcode:{ type:Number },

    hub:{
      ref:'hub',
      type:Schema.Types.ObjectId
    },

    mobileNo:{ type:String },

    loginOTP:{
      code:String,
      expireTime:Date
    },

    resetPasswordLink:{
      code:String,
      expireTime:Date
    },

    loginRetryLimit:{
      type:Number,
      default:0
    },

    loginReactiveTime:{ type:Date },

    ssoAuth:{ googleId:{ type:String } }
  }
);
schema.pre('save', async function (next) {
  this.isDeleted = false;
  if (this.password){
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
    }
  }
  next();
});

schema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};
schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals:true });
  object.id = _id;
  delete object.password;
     
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
schema.plugin(uniqueValidator,{ message: 'Error, expected {VALUE} to be unique.' });
const user = mongoose.model('user',schema);
module.exports = user;