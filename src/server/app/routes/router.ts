/**
 * ルーティング
 */
import * as express from 'express';
import * as path from 'path';

export default (app: express.Application) => {
    app.use((_req, res, next) => {
        res.locals.NODE_ENV = process.env.NODE_ENV;
        next();
    });

    app.get('*', (_req, res, _next) => {
        res.sendFile(path.resolve(`${__dirname}/../../../client/index.html`));
    });
};
