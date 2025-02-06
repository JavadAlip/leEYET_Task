const express = require("express");
const Book = require("../model/book");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/",authMiddleware, async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: "Failed to create book" });
    }
});

router.get("/", async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

router.put("/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: "Failed to update book" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete book" });
    }
});

module.exports = router;
