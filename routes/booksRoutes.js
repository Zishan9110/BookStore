const router = require("express").Router();
const bookModel = require("../models/booksModels");

router.post('/add', async (req, res) => {
    try {
        const data = req.body;
        const newbook = new bookModel(data);
        await newbook.save();
        res.status(200).json({ message: "Book added successfully" }); 
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "An error occurred while adding the book." }); 
    }
});

//get request
router.get('/getBooks', async (req, res) => {
    let books;
    try {
        books = await bookModel.find();
        res.status(200).json({ books });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to retrieve books", details: error.message });
    }
});

//get request by id
router.get('/getBooks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await bookModel.findById(id);
        
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to retrieve book", details: error.message });
    }
});

//update book by id

router.put('/updateBook/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, author, bookname, image, price } = req.body;

    const updatedData = {
        name,
        description,
        author,
        bookname,
        image,
        price
    };

    try {
        const updatedBook = await bookModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: "Failed to update book", details: error.message });
    }
});


// Route to delete a book by ID
router.delete('/deleteBook/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await bookModel.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully", book: deletedBook });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete book", details: error.message });
    }
});

module.exports = router;
