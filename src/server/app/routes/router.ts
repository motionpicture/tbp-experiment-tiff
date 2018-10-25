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

    app.post('/api/getDisplayStartDate', (_req, res) => {
        res.json({
            result: (process.env.DISPLAY_START_DATE === undefined)
                ? ''
                : process.env.DISPLAY_START_DATE
        });
    });

    app.get('*', (_req, res, _next) => {
        res.sendFile(path.resolve(`${__dirname}/../../../client/index.html`));
    });
};
