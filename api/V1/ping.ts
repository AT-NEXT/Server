import BaseApiRoute from './base';

export default class PingApiRoute extends BaseApiRoute {
    public name: string = 'ping';
    public path: string = '/ping';

    constructor(app: any, server: any, pb: any, adminUser: any) {
        super(app, server, pb, adminUser);
    }

    public exec(req: any, res: any) {
        res.send({
            message: 'pong',
            time: new Date().getTime()
        });
    }
}