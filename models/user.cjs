const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		personnelNumber: {
			type: String,
			required: true,
		},
		_partitionKey: {
			type: String,
			required: true,
		},
		defaultTemplate: {
			type: Schema.Types.ObjectId,
			required: false,
		},
		email: {
			type: String,
			required: false,
		},
		reportingTemplates: {
			type: [Schema.Types.ObjectId],
			required: false,
		},
		role: {
			type: String,
			required: true,
		},
	},
	{ collection: "Users" }
);

module.exports = mongoose.model("User", userSchema);
