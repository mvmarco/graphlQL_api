const ReportingTemplate = require("../../models/reportingTemplate.cjs");
const ReportingContext = require("../../models/reportingContext.cjs");
const ReportingTreeNode = require("../../models/reportingTreeNode.cjs");
const TimeEntry = require("../../models/timeEntries.cjs");
const User = require("../../models/user.cjs");
const WorkPlanEntry = require("../../models/workPlanEntry.cjs");

module.exports = {
	////// Queries //////
	reportingTemplates: async () => {
		try {
			const reportingTemplate = await ReportingTemplate.find().populate(
				"reportingContexts"
			);
			console.log(reportingTemplate);
			return reportingTemplate.map((reportingTemplate) => {
				return { ...reportingTemplate._doc };
			});
		} catch (err) {
			throw err;
		}
	},
	findOneReportingTemplate: async (id) => {
		try {
			const reportingTemplate = await ReportingTemplate.findOne({ _id: id.id });
			return { ...reportingTemplate._doc };
		} catch (err) {
			throw err;
		}
	},
	reportingContexts: async () => {
		try {
			const ReportingContexts = await ReportingContext.find();
			return ReportingContexts.map((reportingContext) => {
				return { ...reportingContext._doc };
			});
		} catch (err) {
			throw err;
		}
	},
	findOneReportingContext: async (id) => {
		try {
			const ReportingContexts = await ReportingContext.findOne({ _id: id.id });
			return { ...ReportingContexts._doc };
		} catch (err) {
			throw err;
		}
	},
	findOneReportingTreeNode: async (id) => {
		try {
			const ReportingTreeNodes = await ReportingTreeNode.findOne({
				_id: id.id,
			});
			return { ...ReportingTreeNodes._doc };
		} catch (err) {
			throw err;
		}
	},
	findTreeNodesByTree: async (tree) => {
		try {
			const reportingTreeNode = await ReportingTreeNode.find({
				tree: tree.tree,
			});
			return reportingTreeNode.map((ReportingTreeNodes) => {
				return { ...ReportingTreeNodes._doc };
			});
		} catch (err) {
			throw err;
		}
	},
	findAllTreeNodes: async () => {
		try {
			const reportingTreeNode = await ReportingTreeNode.find();
			return reportingTreeNode.map((reportingTreeNodes) => {
				return { ...reportingTreeNodes._doc };
			});
		} catch (err) {
			throw err;
		}
	},
	TimeEntries: async () => {
		try {
			const TimeEntries = await TimeEntry.find();
			return TimeEntries.map((TimeEntry) => {
				return { ...TimeEntry._doc };
			});
		} catch (err) {
			throw err;
		}
	},
	findOneTimeEntry: async (id) => {
		try {
			const TimeEntries = await TimeEntry.findOne({ _id: id.id }).populate(
				"reportingTemplate"
			);
			return { ...TimeEntries._doc };
		} catch (err) {
			throw err;
		}
	},
	findAllTimeEntriesForUser: async (id) => {
		const UserExists = await User.findOne({ _id: id.id });
		if (!UserExists) {
			throw new Error("User not found");
		}
		try {
			const TimeEntries = await TimeEntry.find({
				_partitionKey: { $in: [UserExists._partitionKey] },
			}).populate("reportingTemplate");
			return TimeEntries.map((TimeEntry) => {
				return { ...TimeEntry._doc };
			});
		} catch (err) {
			throw err;
		}
	},
	findOneUser: async (id) => {
		try {
			const Users = await User.findOne({ _id: id.id });
			return { ...Users._doc };
		} catch (err) {
			throw err;
		}
	},
	findOneUserByKey: async (key) => {
		try {
			const Users = await User.findOne({ _partitionKey: key.key });
			return { ...Users._doc };
		} catch (err) {
			throw err;
		}
	},
	findAllUsers: async () => {
		try {
			const Users = await User.find();
			return Users.map((users) => {
				return { ...users._doc };
			});
		} catch (err) {
			throw err;
		}
	},
	findOneWorkPlanEntry: async (id) => {
		try {
			const findOneWorkPlanEntries = await WorkPlanEntry.findOne({
				_id: id.id,
			});
			return { ...findOneWorkPlanEntries._doc };
		} catch (err) {
			throw err;
		}
	},
	findAllWorkPlanEntriesForUser: async (id) => {
		const UserExists = await User.findOne({ _id: id.id });
		if (!UserExists) {
			throw new Error("User not found");
		}
		try {
			const WorkPlanEntries = await WorkPlanEntry.find({
				_partitionKey: { $in: [UserExists._partitionKey] },
			});
			return WorkPlanEntries.map((WorkPlanEntry) => {
				return { ...WorkPlanEntry._doc };
			});
		} catch (err) {
			throw err;
		}
	},

	////// Mutations //////
	createTimeEntries: async (args) => {
		const reportingTemplate = await ReportingTemplate.findOne({
			_id: args.timeEntriesInput.reportingTemplate,
		});
		if (!reportingTemplate) {
			throw new Error("Reporting Template not found");
		}
		const user = await User.findOne({
			_partitionKey: args.timeEntriesInput._partitionKey,
		});
		if (!user) {
			throw new Error("User not found");
		}

		const timeEntry = new TimeEntry({
			_partitionKey: args.timeEntriesInput._partitionKey,
			backendId: args.timeEntriesInput.backendId,
			createdDate: args.timeEntriesInput.createdDate,
			endDate: args.timeEntriesInput.endDate,
			isAllDay: args.timeEntriesInput.isAllDay,
			isPreviousDay: args.timeEntriesInput.isPreviousDay,
			quantityUnit: args.timeEntriesInput.quantityUnit,
			reportingTemplate: args.timeEntriesInput.reportingTemplate,
			startDate: args.timeEntriesInput.startDate,
			status: args.timeEntriesInput.status,
			suggestionSource: args.timeEntriesInput.suggestionSource,
			text: args.timeEntriesInput.text,
			timeType: args.timeEntriesInput.timeType,
			duration: args.timeEntriesInput.duration,
			statusLog: args.timeEntriesInput.statusLog,
			reporting: args.timeEntriesInput.reporting,
			ignoreThisChange: args.timeEntriesInput.ignoreThisChange,
		});
		try {
			const result = await timeEntry.save();
			return { ...result._doc };
		} catch (err) {
			throw err;
		}
	},
	createWorkPlanEntry: async (args) => {
		const user = await User.findOne({
			_partitionKey: args.workPlanEntryInput._partitionKey,
		});
		if (!user) {
			throw new Error("User not found");
		}
		const workPlanEntry = new WorkPlanEntry({
			_partitionKey: args.workPlanEntryInput._partitionKey,
			isAllDay: args.workPlanEntryInput.isAllDay,
			startDate: args.workPlanEntryInput.startDate,
			endDate: args.workPlanEntryInput.endDate,
			duration: args.workPlanEntryInput.duration,
			quantity: args.workPlanEntryInput.quantity,
			quantityUnit: args.workPlanEntryInput.quantityUnit,
			text1: args.workPlanEntryInput.text1,
			text2: args.workPlanEntryInput.text2,
			text3: args.workPlanEntryInput.text3,
			type: args.workPlanEntryInput.type,
			subtype: args.workPlanEntryInput.subtype,
		});
		try {
			const result = await workPlanEntry.save();
			return { ...result._doc };
		} catch (err) {
			throw err;
		}
	},
};
