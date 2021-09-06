const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportingTemplateSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		referenceId: {
			type: String,
			required: false,
		},
		nextRootNode: {
			type: String,
			required: false,
		},
		tree: {
			type: String,
			required: true,
		},
		_partitionKey: {
			type: String,
			required: false,
		},
		hasQuota: {
			type: Boolean,
			required: true,
		},
		parent: {
			type: Schema.Types.ObjectId,
			required: false,
		},
		title: {
			type: String,
			required: true,
		},
	},
	{ collection: "ReportingTreeNodes" }
);

module.exports = mongoose.model("ReportingTreeNode", reportingTemplateSchema);
