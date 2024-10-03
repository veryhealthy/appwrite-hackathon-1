"use server"

import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";
import { z, type ZodError } from "zod";

const formSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }).email("Invalid Email"),
    password: z.string()
        .min(8, "must contain at least 8 characters")
        .regex(/(?=.*[A-Z])/, "must contain at least one capital letter")
        .regex(/(?=.*[0-9])/, "must contain at least one number")
        .regex(/(?=.*[!@#$%^&*])/, "must contain at least one special character"),
    confirmPassword: z.string({ required_error: "Confirm password is required" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This will highlight the `confirmPassword` field if passwords don't match
});

type FormErrors = ZodError<z.infer<typeof formSchema>>["formErrors"]["fieldErrors"]
export type FormState = {
    message: string;
    errors: FormErrors
}

export async function register(prevState: any, formData: FormData) {
    try {
        const name = formData.get("name")?.toString() || "";
        const email = formData.get("email")?.toString() || "";
        const password = formData.get("password")?.toString() || "";
        const confirmPassword = formData.get("confirm-password")?.toString() || ""

        const res = formSchema.safeParse({ name, email, password, confirmPassword })
        console.log(name, email, password, confirmPassword)

        if (!res.success) {
            console.log(res.error.formErrors.fieldErrors)
            return { ...prevState, errors: res.error?.formErrors.fieldErrors }
        }

        const { account, getUserFromEmail } = await createAdminClient();

        const user = await getUserFromEmail(email);
        if (user.total != 0) {
            return { ...prevState, error: "Email already in use" };
        }

        await account.create(ID.unique(), email as string, password as string, name as string);
        console.log("creaetd user")
        const session = await account.createEmailPasswordSession(email as string, password as string);

        cookies().set("session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        redirect("/account");
    } catch (error: any) {
        console.log(error)
        return { ...prevState, error: error?.message };
    }
}
