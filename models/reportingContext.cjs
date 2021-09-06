const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportingContextSchema = new Schema(
	{
		templateKey: {
			type: String,
			required: true,
		},
		tree: {
			type: String,
			required: true,
		},
		_partitionKey: {
			type: String,
			required: true,
		},
		keyName: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		previousContext: {
			type: String,
			required: false,
		},
		readOnly: {
			type: Boolean,
			required: true,
		},
		required: {
			type: Boolean,
			required: true,
		},
		rootNode: {
			type: Schema.Types.ObjectId,
			required: false,
		},
		visible: {
			type: Boolean,
			required: true,
		},
		preselected: {
			type: Schema.Types.ObjectId,
			required: false,
		},
		sortingKey: {
			type: String,
			required: false,
		},
	},
	{ collection: "ReportingContexts" }
);

module.exports = mongoose.model("ReportingContext", reportingContextSchema);
