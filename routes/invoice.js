// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE,
// THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const router = express.Router();

// ********* require Author and Book models in order to use them *********
const Author = require('../models/User.model');
const Invoice = require('../models/Invoice.model');

// ****************************************************************************************
// POST - create a book
// ****************************************************************************************

// <form action="/books" method="POST">
router.post('/api/invoices', (req, res, next) => {
	console.log(req.body);
	Invoice.create(req.body)
		.then(bookDoc => res.status(200).json({ book: bookDoc }))
		.catch(err => next(err));
});

// ****************************************************************************************
// GET route to get all the books
// ****************************************************************************************

router.get('/api/invoices', (req, res) => {
	Invoice.find()
		.then(booksFromDB => res.status(200).json({ books: booksFromDB }))
		.catch(err => next(err));
});

// ****************************************************************************************
// POST route to delete the book
// ****************************************************************************************

// <form action="/books/{{this._id}}/delete" method="post">
router.post('/api/invoices/:invoiceId/delete', (req, res) => {
	Invoice.findByIdAndRemove(req.params.invoiceId)
		.then(() => res.json({ message: 'Successfully removed!' }))
		.catch(err => next(err));
});

// ****************************************************************************************
// POST route to save the updates
// ****************************************************************************************

// <form action="/books/{{foundBook._id}}/update" method="POST">
router.post('/api/invoices/:id/update', (req, res) => {
	Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then(updatedInvoice => res.status(200).json({ book: updatedInvoice }))
		.catch(err => next(err));
});

// ****************************************************************************************
// GET route for getting the book details
// ****************************************************************************************

router.get('/api/invoices/:someInvoiceId', (req, res) => {
	Invoice.findById(req.params.someInvoiceId)
		.populate('author')
		.then(foundInvoice => res.status(200).json({ book: foundInvoice }))
		.catch(err => next(err));
});

module.exports = router;
