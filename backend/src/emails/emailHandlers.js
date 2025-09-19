import { resendClient, sender } from "../lib/resend"
import { createWelcomeEmailTemplate } from "./emailTemplate"

export const sendWelcomeEmails = async (email, name, clientURL) => {
    const {data, error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        html: createWelcomeEmailTemplate(name, clientURL)
    })
    

    if (error) {
        console.log("Error sending welcome email:" , error);
        throw new Error("Failed to send welcome email!");      
    }

    console.log("Welcome Email sent successfully", data);
    
}