import { useState, useEffect } from 'react';
import axiosInstance from './../axios'; 
import { useNavigate } from 'react-router-dom'; 

const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        isbn: '',
        publishedYear: '',
        availableCopies: ''
    });
    const [selectedBook, setSelectedBook] = useState(null);  
    const [showModal, setShowModal] = useState(false); 
    const [currentPage, setCurrentPage] = useState(1);  
    const [perPage] = useState(3);  
    const [searchQuery, setSearchQuery] = useState('');  
    const navigate = useNavigate(); 
    
    const isLoggedIn = !!localStorage.getItem('authToken'); 
    // If not logged in, redirect to login page
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    // Fetch books data using the axiosInstance
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axiosInstance.get('/books');  
                console.log('API Response:', response);  
                const booksData = response.data || [];  
                setBooks(booksData);
            } catch (error) {
                console.error('Error fetching books:', error);
                setBooks([]); 
            }
        };

        fetchBooks();
    }, []);  

    // Handle book creation
    const handleCreateBook = async () => {
        if (!newBook.title || !newBook.author || !newBook.isbn || !newBook.publishedYear || !newBook.availableCopies) {
            alert("Please fill in all the fields!");
            return;
        }

        try {
            const response = await axiosInstance.post('/books', newBook);
            setBooks([...books, response.data]); 
            setNewBook({ title: '', author: '', isbn: '', publishedYear: '', availableCopies: '' });  
            setShowModal(false);  
            alert('Book added successfully!');  
        } catch (error) {
            console.error('Error creating book:', error);
            alert('Error adding book!');
        }
    };

    // Handle book update
    const handleUpdateBook = async () => {
        try {
            const updatedBookData = {
                title: selectedBook.title,
                author: selectedBook.author,
                isbn: selectedBook.isbn,
                publishedYear: selectedBook.publishedYear,
                availableCopies: selectedBook.availableCopies
            };

            const response = await axiosInstance.put(`/books/${selectedBook._id}`, updatedBookData);

            // After successful update, reflect the changes in the books state
            const updatedBooks = books.map((book) =>
                book._id === selectedBook._id ? { ...book, ...updatedBookData } : book
            );
            setBooks(updatedBooks);  
            setShowModal(false);  
            setSelectedBook(null); 
            alert('Book updated successfully!');  
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    // Handle book deletion
    const handleDeleteBook = async (bookId) => {
        try {
            await axiosInstance.delete(`/books/${bookId}`);
            setBooks(books.filter((book) => book._id !== bookId));  
            alert('Book deleted successfully!'); 
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('authToken');  
        navigate('/'); 
    };

    // Filter books based on the search query
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate books to display for the current page
    const indexOfLastBook = currentPage * perPage;
    const indexOfFirstBook = indexOfLastBook - perPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Pagination controls
    const totalPages = Math.ceil(filteredBooks.length / perPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-3xl font-semibold mb-6">Dashboard - Book Listings</h2>

            {/* Search bar */}
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, or ISBN"
                className="p-2 border mb-4 w-1/3"
            />

            {/* Add new book button */}
            {isLoggedIn && (
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 absolute top-4 right-4"
                >
                    Add Book
                </button>
            )}

            {/* Logout button */}
            {isLoggedIn && (
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 absolute top-4 left-4"
                >
                    Logout
                </button>
            )}

            {/* Modal for adding/updating a book */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">
                            {selectedBook ? 'Update Book' : 'Add New Book'}
                        </h3>
                        <input
                            type="text"
                            value={selectedBook ? selectedBook.title : newBook.title}
                            onChange={(e) => selectedBook ? setSelectedBook({ ...selectedBook, title: e.target.value }) : setNewBook({ ...newBook, title: e.target.value })}
                            placeholder="Title"
                            className="p-2 border mb-2 w-full"
                        />
                        <input
                            type="text"
                            value={selectedBook ? selectedBook.author : newBook.author}
                            onChange={(e) => selectedBook ? setSelectedBook({ ...selectedBook, author: e.target.value }) : setNewBook({ ...newBook, author: e.target.value })}
                            placeholder="Author"
                            className="p-2 border mb-2 w-full"
                        />
                        <input
                            type="text"
                            value={selectedBook ? selectedBook.isbn : newBook.isbn}
                            onChange={(e) => selectedBook ? setSelectedBook({ ...selectedBook, isbn: e.target.value }) : setNewBook({ ...newBook, isbn: e.target.value })}
                            placeholder="ISBN"
                            className="p-2 border mb-2 w-full"
                        />
                        <input
                            type="number"
                            value={selectedBook ? selectedBook.publishedYear : newBook.publishedYear}
                            onChange={(e) => selectedBook ? setSelectedBook({ ...selectedBook, publishedYear: e.target.value }) : setNewBook({ ...newBook, publishedYear: e.target.value })}
                            placeholder="Publish Year"
                            className="p-2 border mb-2 w-full"
                        />
                        <input
                            type="number"
                            value={selectedBook ? selectedBook.availableCopies : newBook.availableCopies}
                            onChange={(e) => selectedBook ? setSelectedBook({ ...selectedBook, availableCopies: e.target.value }) : setNewBook({ ...newBook, availableCopies: e.target.value })}
                            placeholder="Available Copies"
                            className="p-2 border mb-2 w-full"
                        />
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={selectedBook ? handleUpdateBook : handleCreateBook}
                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mr-2"
                            >
                                {selectedBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectedBook(null);
                                }}
                                className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full max-w-3xl bg-white p-4 rounded-lg shadow-lg mt-6">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="p-2">Book Title</th>
                            <th className="p-2">Author</th>
                            <th className="p-2">ISBN</th>
                            <th className="p-2">Publish Year</th>
                            <th className="p-2">Available Copies</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBooks.length > 0 ? (
                            currentBooks.map((book) => (
                                <tr key={book._id}>
                                    <td className="p-2">{book.title}</td>
                                    <td className="p-2">{book.author}</td>
                                    <td className="p-2">{book.isbn}</td>
                                    <td className="p-2">{book.publishedYear}</td>
                                    <td className="p-2">{book.availableCopies}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => {
                                                setSelectedBook(book); 
                                                setShowModal(true); 
                                            }}
                                            className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                                        >
                                            Update
                                        </button>
                                        {isLoggedIn && (
                                            <button
                                                onClick={() => handleDeleteBook(book._id)}
                                                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4">No books available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4">
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`px-4 py-2 mx-1 rounded-md ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
