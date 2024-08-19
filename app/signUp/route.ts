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

        const res1 = await context.run("Save user to Redis DB", async () => {
            return await redis.set(req.username, req.name)
        })

        const res = await context.run("Send email", async () => {
            try {
                const { data, error } = await resend.emails.send({
                    from: 'Mehmet <mehmet@tokgoz.dev>',
                    to: ['mehmet.tokgoz@upstash.com'],
                    subject: 'Hello world',
                    react: SignUpEmailTemplate({ firstName: 'Mehmet' }),
                });

                if (error) {
                    console.log(error.message)
                    return -1
                }
                return 0
            } catch (error) {
                console.log(error)
                return -1
            }
        })
    }
})