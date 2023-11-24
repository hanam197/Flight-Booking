const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  idTransactionVNPay: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  bankCode: {
    type: String,
    required: true,
  },
  thoiGianThanhToan: {
    type: Date,
    required: true,
  },
  transactionStatus: {
    type: String,
    required: true,
  },
});

const transactionModel = mongoose.model(
  "Transaction",
  transactionSchema,
  "Transactions"
);

module.exports = {
  create: (data) => {
    return transactionModel.create(data);
  },
  find: (query) => {
    return transactionModel.find(query);
  },
  findById: (_id) => {
    return transactionModel.findById(_id);
  },
  update: async (_id, update) => {
    let transaction = await transactionModel.findOne({ _id: _id });
    Object.assign(transaction, update);
    return transaction.save();
  },
  delete: (_id) => {
    return transactionModel.findByIdAndDelete(_id);
  },
  list: (perPage, page) => {
    return transactionModel
      .find()
      .limit(perPage)
      .skip(perPage * page)
      .lean();
  },
};
