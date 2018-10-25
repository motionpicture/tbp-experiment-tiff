"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.default = (app) => {
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
