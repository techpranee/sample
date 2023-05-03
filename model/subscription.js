/**
 * subscription.js
 * @description :: model of a database collection subscription
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
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

    isDeleted:{ type:Boolean },

    isActive:{ type:Boolean },

    validFrom:{ type:Date },

    validTill:{ type:Date },

    totalPayment:{ type:Number },

    user:{
      ref:'user',
      type:Schema.Types.ObjectId
    },

    hub:{
      ref:'hub',
      type:Schema.Types.ObjectId
    },

    car:{
      ref:'car',
      type:Schema.Types.ObjectId
    },

    status:{ type:String },

    addons:[{
      _id:false,
      addonId:{ type:String },
      count:{ type:Number },
      paymentId:{ type:String }
    }],

    package:{
      ref:'package',
      type:Schema.Types.ObjectId
    },

    completion:{ type:Number },

    paymentId:{
      type:Schema.Types.ObjectId,
      ref:'payment'
    }
  }
);
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
    }
  }
  next();
});

schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals:true });
  object.id = _id;
     
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
const subscription = mongoose.model('subscription',schema);
module.exports = subscription;