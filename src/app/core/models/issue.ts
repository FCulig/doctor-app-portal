import { User } from "./user";

export interface Issue {
    id: string,
    type: string,
    description: string,
    created: string,
    isResolved: boolean,
    reporter: User
}
