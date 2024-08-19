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
        })

        const res = context.run("Send email", async () => {
            try {
                const { data, error } = await resend.emails.send({
                    from: 'Mehmet <mehmet.tokgoz@upstash.com>',
                    to: ['mehmet.tokgoz@upstash.com'],
                    subject: 'Hello world',
                    react: SignUpEmailTemplate({ firstName: 'Mehmet' }),
                });
                if (error) {
                    return -1
                }
                return 0
            } catch (error) {
                return -1
            }
        })
    }
})