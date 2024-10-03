"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./action";
import { Button } from "@cn/button"
import { Label } from "@cn/label"
import { Input } from "@cn/input"
import Link from "next/link";

export default function LoginForm() {
    const [state, formAction] = useActionState(login, {
        message: "",
        errors: {}
    });

    return (
        <>
            <form action={formAction} className="w-full flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <Label className="text-base" htmlFor="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="bar@foo.com" />
                    <p className="text-red-500">{typeof state.errors.email !== "undefined" && state.errors.email[0]}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="text-base" htmlFor="password">Password</Label>
                    <Input name="password" id="password" type="password" />
                    {typeof state.errors.password !== "undefined" && (
                        <ul className="text-red-500">
                            {state.errors.password.map((e: string, i: number) => <li key={`error-${i}`}>{e}</li>)}
                        </ul>
                    )}
                </div>
                <SubmitButton />
                <p className="text-red-500">{typeof state.errors !== "undefined" && state.error}</p>
                <div className="flex items-center gap-2">
                    <p>Not registered yet?</p>
                    <Link className="text-base underline underline-offset-4 text-blue-700" href="/register">Register</Link>
                </div>
            </form>
        </>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="mt-4" disabled={pending} type="submit">Login</Button>
    );
}
