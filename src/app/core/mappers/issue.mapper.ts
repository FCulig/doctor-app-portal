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
}
