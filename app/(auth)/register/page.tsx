
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import RegisterForm from "./register-form";

export default async function Register() {
    const user = await getLoggedInUser();
    if (user) redirect("/account");

    return (
        <div className="flex flex-col w-11/12 md:w-4/12 m-auto">
            <h1 className="text-4xl text-center mb-8">Register</h1>
            <RegisterForm />
        </div>
    );
}
