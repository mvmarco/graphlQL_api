const mongoose = require("mongoose");
const ReportingContext = require("../models/reportingContext.cjs");

const Schema = mongoose.Schema;

const timeTypeConfigForRolesSchema = new mongoose.Schema(
	{
		role: {
			type: String,
			required: false,
		},
		timeTypes: {
			type: [String],
			required: false,
		},
	},
	{ _id: false }
);

const reportingTemplateSchema = new Schema(
	{
		type: {
			type: String,
			required: false,
		},
		_partitionKey: {
			type: String,
			required: false,
		},
		colorScheme: {
			type: Number,
			required: false,
		},
		name: {
			type: String,
			required: false,
		},
		quantityUnit: {
			type: Number,
			required: false,
		},
		reportingContexts: {
			type: [Schema.Types.ObjectId],
			ref: "ReportingContext",
			required: true,
		},

		roles: {
			type: [String],
			required: false,
		},

		timeTypeConfigForRoles: [timeTypeConfigForRolesSchema],

		timeTypes: {
			type: [String],
			required: false,
		},
		sortOrder: {
			type: Number,
			required: false,
		},
	},
	{ collection: "ReportingTemplates" }
);

module.exports = mongoose.model("ReportingTemplate", reportingTemplateSchema);
