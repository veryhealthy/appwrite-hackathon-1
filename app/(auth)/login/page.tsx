
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import LoginForm from "@/app/components/login-form";
import Link from "next/link";

export default async function Login() {
    const user = await getLoggedInUser();
    if (user) redirect("/");

    return (
        <div className="w-11/12 md:w-4/12 m-auto">
            <nav>
                <Link href="/register">
                    <span>
                        Register
                    </span>
                </Link>
            </nav>
            <LoginForm />
        </div>
    );
}
