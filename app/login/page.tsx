
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";

async function login(formData: FormData) {
    "use server";

}

export default async function Login() {
    const user = await getLoggedInUser();
    if (user) redirect("/");

    return (
        <form action={login} className="h-screen w-screen grid place-content-center space-y-2">
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
            <button type="submit" className="border border-black rounded px-4 py-2">Login</button>
        </form>
    );
}
