
import { getLoggedInUser, createAdminClient } from "@/lib/server/appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signUpWithDiscord } from "@/lib/server/oauth";

async function signUpWithEmail(formData: FormData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    const { account } = await createAdminClient();
    await account.create(ID.unique(), email as string, password as string, name as string);
    const session = await account.createEmailPasswordSession(email as string, password as string);

    cookies().set("session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });

    redirect("/account");
}

export default async function SignUpPage() {
    const user = await getLoggedInUser();
    if (user) redirect("/account");

    return (
        <main className="h-screen w-screen grid place-content-center items-stretch space-y-2">
            <form action={signUpWithEmail} className="grid space-y-2">
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
            </form>
            <form action={signUpWithDiscord} className="grid">
                <button
                    type="submit"
                    className="border border-black rounded px-4 py-2"
                >Sign up with Discord</button>
            </form>
        </main>
    );
}

