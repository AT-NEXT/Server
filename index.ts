import Logger from "./util/Logger";
import os from 'os';
import path from 'path';
const PocketBase = require('pocketbase/cjs');
import express from "express";
import dotenv from "dotenv";

import { createServer } from "https";
import { createServer as createServerHttp } from "http";
import ApiV1 from "./api/V1";

dotenv.config();

let ThreadCount = 1;
let app = express();
let server = createServerHttp(app);
let pb = new PocketBase(process.env.POCKETBASE_URL as string);
let adminUser: any;
let apiV1: any;

Logger.logClean(`
 ████████   ██████████    ███     ██  ██████████  ██      ██  ██████████
██      ██      ██        ████    ██  ██           ██    ██       ██
██      ██      ██        ██ ██   ██  ██            ██  ██        ██
██████████      ██        ██  ██  ██  █████████      ████         ██
██      ██      ██        ██   ██ ██  ██            ██  ██        ██
██      ██      ██        ██    ████  ██           ██    ██       ██
██      ██      ██        ██     ███  ██████████  ██      ██      ██
`);

Logger.logClean(`Cores: \x1b[36m${os.cpus().length}\x1b[0m (Using ${ThreadCount} Thread(s))\n`);

Logger.log('Path', `Running in ${path.resolve(__dirname)}`);

Logger.log('CPU', os.cpus()[0].model);

Logger.log('System', `${os.type()} ${os.release()}`);

server.listen(3000, () => {
    Logger.log('Server', 'Listening on port 3000');
});

(async () => {
    Logger.log('PocketBase', 'Loading admin user');

    adminUser = await pb.admins.authWithPassword(
        process.env.ADMIN_USER as string,
        process.env.ADMIN_PASSWORD as string
    );

    Logger.log('PocketBase', 'Admin user loaded');

    Logger.log('API', 'Loading API v1');

    apiV1 = new ApiV1(app, server, pb, adminUser);

    Logger.log('API', 'API v1 loaded');
})();