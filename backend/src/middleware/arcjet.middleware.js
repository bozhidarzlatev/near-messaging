import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {

    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            console.log(decision.reason);
            
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Rate limit exceeder. Please try again later" });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ message: "Bot access denied!" });
            } else {
                return res.status(403).json({ message: "Access denied by security policy!" });
            }
        }

            if(decision.results.some(isSpoofedBot)) {
                return res.status(403).json({
                    error: "Spoofed bot detected!",
                    message: "Malicious bot activity detected!"
                })
            }

            next();
    } catch (error) {
        console.log("Arcjet Protection error:", error);
        next()
    }
}