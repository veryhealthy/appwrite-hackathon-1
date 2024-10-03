"use server"

import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z, type ZodError } from "zod";

const formSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    }).email(),
    password: z.string()
        .min(8, "must contain at least 8 characters")
        .regex(/(?=.*[A-Z])/, "must contain at least one capital letter")
        .regex(/(?=.*[0-9])/, "must contain at least one number")
        .regex(/(?=.*[!@#$%^&*])/, "must contain at least one special character")
})

type FormErrors = ZodError<z.infer<typeof formSchema>>["formErrors"]["fieldErrors"]
export type FormState = {
    message: string;
    errors: FormErrors
}

export async function login(prevState: any, formData: FormData) {

    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const res = formSchema.safeParse({ email, password })

    if (!res.success) {
        return { ...prevState, errors: res.error?.formErrors.fieldErrors }
    }

    const { account, getUserFromEmail } = await createAdminClient();
    try {

        const user = await getUserFromEmail(email);
        if (user.total == 0) {
            return { ...prevState, error: "Email not found" };
        }

        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        redirect("/account")
    } catch (error: any) {
        return { ...prevState, error: error?.message };
    }

}
