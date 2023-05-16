import { Express, Router } from "express";
import path from "path";
import fs from "fs";

export default class ApiV1 {
    public router: Router = Router();

    constructor(app: Express, server: any, pb: any, adminUser: any) {
        app.use("/api/v1", this.router);

        const apiPath = path.resolve(__dirname, "V1");
        const apiFiles = fs.readdirSync(apiPath).filter((file) => file.endsWith(".ts"));
        apiFiles.splice(apiFiles.indexOf("base.ts"), 1);

        for (const file of apiFiles) {
            const ApiRoute = require(path.resolve(apiPath, file)).default;

            const apiRoute = new ApiRoute(app, server, pb, adminUser);

            this.router.get(apiRoute.path, (req, res) => {
                apiRoute.exec(req, res);
            });
        }
    }
}