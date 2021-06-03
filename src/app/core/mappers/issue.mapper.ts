import { Issue } from "../models/issue";
import { UserMapper } from "./user.mapper";

export class IssueMapper {
    mapArrayResponseToIssueArray(issuesResponse): Issue[] {
        let issues = [];
        const userMapper = new UserMapper();

        issuesResponse.forEach(issue => {
            issues.push({
                id: issue.id,
                type: issue.type,
                description: issue.description,
                created: issue.created,
                isResolved: issue.isResolved,
                reporter: userMapper.mapUserResponseToUser(issue.reporter)
            })
        });

        return issues;
    }

    mapIssueResponseToIssue(issuesResponse): Issue {
        const userMapper = new UserMapper();

        return {
            id: issuesResponse.id,
            type: issuesResponse.type,
            description: issuesResponse.description,
            created: issuesResponse.created,
            isResolved: issuesResponse.isResolved,
            reporter: userMapper.mapUserResponseToUser(issuesResponse.reporter)
        };
    }
}
