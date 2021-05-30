export class Alert {
    public type: string;
    public message: string;
    public strong?: string;
    public icon?: string;

    constructor(type: string, message: string, strong?: string, icon?: string) {
        this.type = type;
        this.message = message;
        this.strong = strong;
        this.icon = icon;
    }
}
