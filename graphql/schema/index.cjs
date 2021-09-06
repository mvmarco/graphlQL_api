const { buildSchema } = require("graphql");
const { GraphQLDateTime } = require("graphql-iso-date");

module.exports = buildSchema(`

        scalar GraphQLDateTime

        type reportingTemplate{
            _id: ID!
            type: String
            _partitionKey: String
            colorScheme: Int
            name: String
            quantityUnit: Int
            reportingContexts: [reportingContext]
            roles: [String]
            timeTypeConfigForRoles: [timeTypeConfigForRolesType]
            timeTypes: [String]
            sortOrder: Int
        }

        type timeTypeConfigForRolesType{
            role: String
            timeTypes: [String]
        }

        input timeTypeConfigForRolesInput{
            role: String
            timeTypes: [String]
        }

        type reportingTemplatePartial{
            _id: ID!
            type: String!
            _partitionKey: String!
            colorScheme: Int! 
            name: String!
            quantityUnit: Int
            reportingContext: [ID!]!
        }

        input reportingTemplateInput{
            type: String!
            _partitionKey: String!
            colorScheme: Int! 
            name: String!
            quantityUnit: Int
            reportingContext: [ID!]!
            roles: [String!]!
            timeTypeConfigForRoles: [timeTypeConfigForRolesInput]!
            timeTypes: [String!]!
            sortOrder: Int!
        }

        type reportingContext{
            _id:ID!
            templateKey: String!
            tree: String!
            _partitionKey: String!
            keyName: String!
            name: String!
            previousContext: String
            readOnly: Boolean!
            required: Boolean!
            rootNode: ID
            visible: Boolean!
            preselected: ID
            sortingKey: String
        }

        input reportingContextInput{
            templateKey: String!
            tree: String!
            _partitionKey: String!
            keyName: String!
            name: String!
            previousContext: String
            readOnly: Boolean!
            required: Boolean!
            rootNode: ID
            visible: Boolean!
            preselected: ID
            sortingKey: String
        }

        type reportingTreeNode{
            _id:ID
            name: String!
            referenceId: String
            nextRootNode: String
            tree: String!
            _partitionKey: String
            hasQuota: Boolean!
            parent: ID
            title: String
        }

        input reportingTreeNodeInput{
            name: String!
            referenceId: String
            nextRootNode: String
            tree: String!
            _partitionKey: String
            hasQuota: Boolean!
            parent: ID
            title: String
        }

        type timeEntries{
            _id: ID!
            _partitionKey: String!
            backendId: String
            createdDate: GraphQLDateTime
            editedDate: GraphQLDateTime
            endDate: GraphQLDateTime
            isAllDay: Boolean!
            isPreviousDay: Boolean!
            quantityUnit: String
            reportingTemplate: reportingTemplate
            startDate: GraphQLDateTime!
            status: String!
            suggestionSource: String
            text: String
            timeType: String
            duration: Int
            statusLog:[statusLogType]!
            reporting:[reportingType]!
            ignoreThisChange: Boolean
        }

        input timeEntriesInput{
            _partitionKey: String!
            backendId: String
            createdDate: String!
            editedDate: String!
            endDate: String!
            isAllDay: Boolean!
            isPreviousDay: Boolean!
            quantityUnit: String
            reportingTemplate: ID
            startDate: String!
            status: String!
            suggestionSource: String
            text: String
            timeType: String
            duration: Int
            statusLog:[statusLogInput]!
            reporting:[reportingInput]!
            ignoreThisChange: Boolean

        }

        type reportingType{
            context: ID
            custom: String
            selection: ID
        }

        input reportingInput{
            context: ID
            custom: String
            selection: ID
        }

        type statusLogType{
            status: String
            when: GraphQLDateTime
            messages:[String]
        }
        input statusLogInput{
            status: String
            when: String
            messages:[String]
        }

        type user{
            _id: ID!
            personnelNumber: String!
            _partitionKey: String!
            defaultTemplate: ID
            email: String!
            reportingTemplates: [ID]
            role: String!
        }

        input userInput {
            personnelNumber: String!
            _partitionKey: String!
            defaultTemplate: ID
            email: String!
            reportingTemplates: [ID]
            role: String!
        }

        type workPlanEntry{
            _id: ID!
            _partitionKey: String!
            isAllDay: Boolean!
            startDate: GraphQLDateTime!
            endDate: GraphQLDateTime
            duration: Int
            quantity: String
            quantityUnit: String
            text1: String
            text2: String
            text3: String
            type: String
            subtype: String
        }
        
        input workPlanEntryInput{
            _partitionKey: String!
            isAllDay: Boolean!
            startDate: GraphQLDateTime!
            endDate: GraphQLDateTime
            duration: Int
            quantity: String
            quantityUnit: String
            text1: String
            text2: String
            text3: String
            type: String
            subtype: String
        }

        type RootQuery {

            reportingTemplates: [reportingTemplate!]!

            reportingTemplatePartials: [reportingTemplatePartial!]!

            findOneReportingTemplate(id : String): reportingTemplate!

            reportingContexts: [reportingContext!]!

            findOneReportingContext(id: String): reportingContext!

            findOneReportingTreeNode(id: String): reportingTreeNode!

            findTreeNodesByTree(tree: String): [reportingTreeNode]
            
            findAllTreeNodes: [reportingTreeNode]

            TimeEntries: [timeEntries]!

            findOneTimeEntry(id: String): timeEntries!

            findAllTimeEntriesForUser(id: String): [timeEntries]!

            findOneUser(id: String): user!

            findOneUserByKey(key : String) : user!

            findAllUsers: [user]!

            findOneWorkPlanEntry(id: String): workPlanEntry!

            findAllWorkPlanEntriesForUser(id: String): [workPlanEntry]!

        }

        type RootMutation{

            createTimeEntries(timeEntriesInput: timeEntriesInput): timeEntries

            createWorkPlanEntry(workPlanEntryInput: workPlanEntryInput): workPlanEntry
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    
    `);
