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
        const input = context.requestPayload;
        const a = await context.run("step1", async () => {
          return { res: "result of step 1" };
        });
    
        context.sleep("sleep before loop", 10);
        // test
        for (let i = 0; i < 5; i++) {
          const b = await context.run("b", async () => {
            return "result of step 2 ";
          });
        }
    }
})