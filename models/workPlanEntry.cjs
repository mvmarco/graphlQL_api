const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workPlanEntrySchema = new Schema(
	{
		_partitionKey: {
			type: String,
			required: true,
		},
		isAllDay: {
			type: Boolean,
			required: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: false,
		},
		duration: {
			type: Number,
			required: false,
		},
		quantity: {
			type: String,
			required: false,
		},
		quantityUnit: {
			type: String,
			required: false,
		},
		text1: {
			type: String,
			required: false,
		},
		text2: {
			type: String,
			required: false,
		},
		text3: {
			type: String,
			required: false,
		},
		type: {
			type: String,
			required: false,
		},
		subtype: {
			type: String,
			required: false,
		},
	},
	{ collection: "WorkPlanEntries" }
);

module.exports = mongoose.model("WorkPlanEntry", workPlanEntrySchema);
