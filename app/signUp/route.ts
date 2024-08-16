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

        await context.run("Send onboarding email", async () => {
            const { data, error } = await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: [req.email],
                subject: 'Welcome, happy to see you!',
                react: SignUpEmailTemplate({ firstName: req.name }),
              });
            
            if (error != null) {
                throw new RangeError("Couldn't send email.");
            }
        })

        context.sleep("wait one week for survey", 7 * 24 * 60 * 60)

        await context.run("Send onboarding email", async () => {
            const { data, error } = await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: [req.email],
                subject: 'How is your experience so far?',
                react: SignUpEmailTemplate({ firstName: req.name }),
              });
        })
    }
})