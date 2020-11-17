const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const invoiceSchema = new Schema(
  {

    title: String,
    description: String,
    client: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    paymentLink: String,
    dateAdded: {
      type: Date,
      default: Date.now()
    },
    status: {
      type: String,
      default: "Unpaid"
    }
  },
  {
    timestamps: true
  }
);

// const Author = model('Author', authorSchema);
// module.exports = Author;

module.exports = model('Invoice', invoiceSchema);