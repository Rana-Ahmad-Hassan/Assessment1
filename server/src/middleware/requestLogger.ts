import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

export default function requestLogger(req: Request, res: Response, next: NextFunction) {
    const id = typeof randomUUID === "function" ? randomUUID() : Math.random().toString(36).slice(2);
    // expose request id to clients and downstream handlers
    res.setHeader("X-Request-Id", id);
    ; (res as any).locals = (res as any).locals || {};
    (res as any).locals.requestId = id;

    const start = Date.now();
    console.log(`[${id}] → ${req.method} ${req.originalUrl} from ${req.ip}`);

    res.on("finish", () => {
        const ms = Date.now() - start;
        console.log(`[${id}] ← ${res.statusCode} ${req.method} ${req.originalUrl} ${ms}ms`);
    });

    next();
}
