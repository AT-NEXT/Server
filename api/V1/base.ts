export default abstract class ApiV1Route {
    public name: string;
    public path: string;
    public httpServer: any;
    public pb: any;
    public adminUser: any;
    public app: any;
    public abstract exec(req: any, res: any): void;

    constructor(app: any, server: any, pb: any, adminUser: any) {
        this.app = app;
        this.httpServer = server;
        this.pb = pb;
        this.adminUser = adminUser;
    }
}