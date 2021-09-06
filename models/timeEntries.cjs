const mongoose = require("mongoose");
const ReportingTemplate = require("../models/reportingTemplate.cjs");

const Schema = mongoose.Schema;

const statusLogSchema = new Schema(
	{
		status: {
			type: String,
			required: false,
		},
		when: {
			type: Date,
			required: false,
		},
		messages: {
			type: [String],
			required: false,
		},
	},
	{ _id: false }
);

const reportingSchema = new Schema(
	{
		context: {
			type: Schema.Types.ObjectId,
			required: false,
		},
		custom: {
			type: String,
			required: false,
		},
		selection: {
			type: Schema.Types.ObjectId,
			required: false,
		},
	},
	{ _id: false }
);

const timeEntriesSchema = new Schema(
	{
		_partitionKey: {
			type: String,
			required: true,
		},
		backendId: {
			type: String,
			required: false,
		},
		createdDate: {
			type: Date,
			required: true,
		},
		editedDate: {
			type: Date,
			required: false,
		},
		endDate: {
			type: Date,
			required: false,
		},
		isAllDay: {
			type: Boolean,
			required: true,
		},
		isPreviousDay: {
			type: Boolean,
			required: true,
		},
		quantityUnit: {
			type: String,
			required: false,
		},
		reportingTemplate: {
			type: Schema.Types.ObjectId,
			required: false,
		},
		startDate: {
			type: Date,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		suggestionSource: {
			type: String,
			required: false,
		},
		text: {
			type: String,
			required: false,
		},
		timeType: {
			type: String,
			required: false,
		},
		duration: {
			type: Number,
			required: false,
		},

		statusLog: [statusLogSchema],

		reporting: [reportingSchema],

		ignoreThisChange: {
			type: Boolean,
			required: false,
		},
	},
	{ collection: "TimeEntries" }
);

module.exports = mongoose.model("TimeEntry", timeEntriesSchema);
