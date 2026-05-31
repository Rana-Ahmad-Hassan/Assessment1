import { Request, Response, NextFunction } from "express";

export default function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
    const requestId = (res as any).locals?.requestId || req.headers["x-request-id"] || "unknown";
    console.error(`[${requestId}] Error processing ${req.method} ${req.originalUrl}:`, err);

    const status = err?.status && Number(err.status) >= 400 ? Number(err.status) : 500;
    res.status(status).json({ error: err?.message || "Internal Server Error", requestId });
}
