const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let HorrorModel = {};

// Data that comes with the horrors
const HorrorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  poem: {
    type: Array,
    required: true,
  },
});

HorrorSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  poem: doc.poem,
});

// Grabs three random horrors
HorrorSchema.statics.returnThreeRandomHorrors = (callback) => {
  HorrorModel.aggregate([{ $sample: { size: 3 } }]).exec(callback);
};

// Grabs all of the horrors
HorrorSchema.statics.getHorrors = (callback) => HorrorModel.find().exec(callback);

HorrorModel = mongoose.model('Horror', HorrorSchema);

module.exports.HorrorModel = HorrorModel;
module.exports.HorrorSchema = HorrorSchema;
