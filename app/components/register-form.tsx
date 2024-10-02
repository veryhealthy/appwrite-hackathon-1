"use client";

import { useActionState } from "react";
import { register } from "@/lib/server/appwrite";

export default function RegisterForm() {
    const [state, formAction] = useActionState(register, { message: "", error: { message: "" } });

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
            <input
                id="name"
                name="name"
                placeholder="Name"
                type="text"
                className="border border-black rounded px-4 py-2"
            />
            <button
                type="submit"
                className="border border-black rounded px-4 py-2"
            >
                Sign up
            </button>
            <p className="text-red-500" aria-live="polite">{state?.message}</p>
        </form>
    );
}
