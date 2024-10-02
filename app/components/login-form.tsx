"use client";

import { useActionState } from "react";
import { login } from "@/lib/server/appwrite";
import { useFormStatus } from "react-dom";

export default function LoginForm() {
    const [state, formAction] = useActionState(login, { message: "", error: { message: "" } });

    return (
        <form action={formAction} className="w-full grid place-content-stretch space-y-2">
            <input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                className="border border-black rounded px-4 py-2"
            />
            <input
                id="password"
                name="password"
                placeholder="Password"
                minLength={8}
                type="password"
                className="border border-black rounded px-4 py-2"
            />
            <SubmitButton />
            <p className="text-red-500" aria-live="polite">{state?.error?.message}</p>
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} type="submit" className="border border-black rounded px-4 py-2 disabled:opacity-30">Login</button>
    );
}