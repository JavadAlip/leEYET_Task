const mongoose = require("mongoose");

const BorrowSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    borrowedDate: { type: Date, default: Date.now },
    returnDate: { type: Date, default: () => Date.now() + 14*24*60*60*1000 } // 14 days
});

module.exports = mongoose.model("Borrow", BorrowSchema);
