const express = require('express');
const router = express.Router();

// ********* require Author and Invoice models in order to use them *********
const Client = require('../models/User.model');
const Invoice = require('../models/Invoice.model');

// ****************************************************************************************
// POST - create an invoice
// ****************************************************************************************

// <form action="/books" method="POST">
router.post('/api/invoices', (req, res, next) => {
	console.log(req.body);
	Invoice.create(req.body)
		.then(invoice => res.status(200).json({ invoice }))
		.catch(err => next(err));
});

// ****************************************************************************************
// GET route to get all the invoices
// ****************************************************************************************

router.get('/api/invoices', (req, res) => {
	Invoice.find()
		.then(invoicesFromDb => res.status(200).json({ invoices: invoicesFromDb }))
		.catch(err => next(err));
});

// ****************************************************************************************
// POST route to delete the invoice
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
		.then(updatedInvoice => res.status(200).json({ invoice: updatedInvoice }))
		.catch(err => next(err));
});

// ****************************************************************************************
// GET route for getting the invoice details
// ****************************************************************************************

router.get('/api/invoices/:someInvoiceId', (req, res) => {
	Invoice.findById(req.params.someInvoiceId)
		.populate('client')
		.then(foundInvoice => res.status(200).json({ invoice: foundInvoice }))
		.catch(err => next(err));
});

module.exports = router;
