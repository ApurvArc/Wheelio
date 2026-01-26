import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        await resend.emails.send({
            from: "Wheelio <onboarding@resend.dev>",
            to: [email],
            subject: "Welcome to Wheelio Newsletter 🚗",
            html: `
                <h2>Welcome to Wheelio!</h2>
                <p>Thanks for subscribing.</p>
                <p>You’ll now receive latest offers and deals.</p>
                <br/>
                <p>– Team Wheelio</p>
            `
        });

        res.json({
            success: true,
            message: "Subscribed successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};
