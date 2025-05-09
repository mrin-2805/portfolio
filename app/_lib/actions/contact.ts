"use server";

import { IFormState } from "../definations/form-definations";

export async function contact(formData: FormData): Promise<IFormState> {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(process.env.SCRIPT_URL || "/", {
                method: "POST",
                body: formData,
            });
            if (!res.ok) throw new Error();
            resolve({ success: true, pending: false, message: "Thank you for submitting the form!" });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong. Please try again!";

            reject({ success: false, pending: false, message });
        }
    });
}
