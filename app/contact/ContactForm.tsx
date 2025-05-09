"use client";
import { useState } from "react";
import MyInput from "../_components/UI/FormFields/MyInput";
import MyTextArea from "../_components/UI/FormFields/MyTextArea";
import { contact } from "../_lib/actions/contact";
import { IFormState } from "../_lib/definations/form-definations";

const initFormState = { success: false, pending: false };
interface IContactForm {
    name: string;
    email: string;
    message: string;
}
const IContactFormInit = { name: "", email: "", message: "" };

export default function ContactForm() {
    const [formState, setFormState] = useState<IFormState>(initFormState);
    const [formFields, setFormFields] = useState<IContactForm>(IContactFormInit);

    async function formSubmitHandler(evt: React.FormEvent): Promise<void> {
        evt.preventDefault();
        if (formState.pending) return;
        setFormState({ success: false, pending: true });
        try {
            const formData = new FormData(evt.currentTarget as HTMLFormElement);
            const data: Record<string, string> = {};

            for (const [key, value] of formData.entries()) {
                data[key] = value.toString();
            }

            if (data.name.length < 3) {
                setFormState({ ...initFormState, errors: { name: "Name is too short" } });
                return;
            }
            formData.set("Name", data.name);

            const res: IFormState = await contact(formData);
            setFormState(res);
            setFormFields(IContactFormInit);
            return;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong. Please try again!";

            setFormState({ ...initFormState, message });
            return;
        }
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <MyInput
                inputAttr={{
                    name: "name",
                    type: "text",
                    required: true,
                    disabled: formState.pending,
                    error: formState?.errors?.name,
                    value: formFields.name,
                    onChange: (value) =>
                        setFormFields((prev) => {
                            return { ...prev, name: value };
                        }),
                }}
                label={"Full Name *"}
                iconName={"Person"}
            />
            <MyInput
                inputAttr={{
                    name: "Email",
                    type: "email",
                    required: true,
                    disabled: formState.pending,
                    value: formFields.email,
                    onChange: (value) =>
                        setFormFields((prev) => {
                            return { ...prev, email: value };
                        }),
                }}
                label={"Email *"}
                iconName={"Email"}
            />
            <MyTextArea
                inputAttr={{
                    name: "Message",
                    type: "text",
                    disabled: formState.pending,
                    value: formFields.message,
                    onChange: (value) =>
                        setFormFields((prev) => {
                            return { ...prev, message: value };
                        }),
                }}
                label={"Message"}
                iconName={"Message"}
            />
            <button disabled={formState.pending} type="submit" name="button" className="mainBtn mx-auto block cursor-pointer disabled:cursor-not-allowed disabled:opacity-80">
                <span className="flex items-center justify-center">{formState.pending ? "Loading..." : "Confirm"}</span>
                <span className="flex items-center justify-center">{formState.pending ? "Loading..." : "Confirm"}</span>
            </button>
            {formState.message && <p className={formState.success ? "submission-success" : "submission-fail"}>{formState.message}</p>}
        </form>
    );
}
