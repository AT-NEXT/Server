import Logger from "./util/Logger";
import os from 'os';
import path from 'path';
const PocketBase = require('pocketbase/cjs');
import express from "express";
import dotenv from "dotenv";

import { createServer } from "https";
import { createServer as createServerHttp } from "http";

dotenv.config();

let ThreadCount = 1;
let app = express();
let server = createServerHttp(app);
let pb = new PocketBase('http://dedi.btx.systems:9090');
let adminUser: any;

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
})();