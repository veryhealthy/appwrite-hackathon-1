
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import RegisterForm from "@/app/components/register-form";
import Link from "next/link";

export default async function SignUpPage() {
    const user = await getLoggedInUser();
    if (user) redirect("/account");

    return (
        <div className="w-11/12 md:w-4/12 m-auto">
            <nav>
                <Link href="/login">
                    <span>
                        Login
                    </span>
                </Link>
            </nav>
            <RegisterForm />
        </div>
    );
}

