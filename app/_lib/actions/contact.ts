"use server";

import { IFormState } from "../definations/form-definations";
import transporter from "../helpers/nodemailer";

export async function contact(formData: FormData): Promise<IFormState> {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(process.env.SCRIPT_URL || "/", {
                method: "POST",
                body: formData,
            });
            if (!res.ok) throw new Error();

            const formDataObject: Record<string, FormDataEntryValue> = {};
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });

            await transporter.sendMail({
                from: `"${formDataObject.name}" <${formDataObject.Email}>`,
                to: process.env.RECEIVER_EMAIL?.split(","),
                subject: "New Contact Form Message",
                html: `
                    <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; font-family: sans-serif;">
                    <tr>
                        <th align="left">Name</th>
                        <td>${formDataObject.name}</td>
                    </tr>
                    <tr>
                        <th align="left">Email</th>
                        <td>${formDataObject.Email}</td>
                    </tr>
                    <tr>
                        <th align="left">Message</th>
                        <td><pre style="white-space: pre-wrap; font-family: sans-serif;">${formDataObject.Message}</pre></td>
                    </tr>
                    </table>
                `,
            });

            resolve({ success: true, pending: false, message: "Thank you for submitting the form!" });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong. Please try again!";

            reject({ success: false, pending: false, message });
        }
    });
}
