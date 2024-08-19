import { serve } from "@upstash/qstash/nextjs";
import { SignUpEmailTemplate } from "@/components/sign-up-email-template";
import { redis, resend } from "@/app/client";


interface SignUpRequest {
    username: string;
    email: string;
    name: string;
    surname: string;
}

export const POST = serve<SignUpRequest>({
    routeFunction: async context => {
        const req = context.requestPayload;

        await context.run("Save user to Redis DB", async () => {
            redis.set(req.username, req.name)

            throw new Error('this step should retried');
        })

        context.sleep("wait", 2 * 60)
    }
})