const { Schema, model } = require('mongoose');

const userSchema = new Schema(
	{
		username: {
			type: String,
			trim: true,
			required: false,
			unique: false
		},
		email: {
			type: String,
			required: [true, 'Email is required.'],
			match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
			unique: true,
			lowercase: true,
			trim: true
		},
		passwordHash: {
			type: String,
			required: [true, 'Password is required.']
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		firstName: String,
		lastName: String,
		company: String
	},
	{
		timestamps: true
	}
);

module.exports = model('User', userSchema);
