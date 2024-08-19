import { Redis } from '@upstash/redis';
import { Resend } from 'resend';

export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL ||  "",
    token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export const resend = new Resend(process.env.RESEND_API_KEY || "");