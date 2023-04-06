/**
 * cleaner.js
 * @description :: model of a database collection cleaner
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

    isActive:{
      type:Boolean,
      default:false
    },

    createdAt:{ type:Date },

    updatedAt:{ type:Date },

    addedBy:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },

    updatedBy:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },

    hub:{
      ref:'hub',
      type:Schema.Types.ObjectId
    },

    user:{
      ref:'user',
      type:Schema.Types.ObjectId
    },

    work_preference:{ type:Array },

    current_location:{
      type:{
        type:String,
        default:'Point'
      },
      coordinates:{ type:Array }
    },

    wash_count:{ type:Number }
  }
);
schema.index({ 'current_location':'2dsphere' },{
  'unique':false,
  'name':'current_location_default'
});
schema.pre('save', async function (next) {
  this.isDeleted = false;
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

schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals:true });
  object.id = _id;
     
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
const cleaner = mongoose.model('cleaner',schema);
module.exports = cleaner;