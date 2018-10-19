"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.default = (app) => {
    app.use((_req, res, next) => {
        res.locals.NODE_ENV = process.env.NODE_ENV;
        next();
    });
    app.get('*', (_req, res, _next) => {
        res.sendFile(path.resolve(`${__dirname}/../../../client/index.html`));
    });
};
