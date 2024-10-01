import {
    signOut,
    getLoggedInUser,
} from "@/lib/server/appwrite";
import { redirect } from "next/navigation";

export default async function HomePage() {
    const user = await getLoggedInUser();
    if (!user) redirect("/register");

    return (
        <>
            <ul>
                <li>
                    <strong>Email:</strong> {user.email}
                </li>
                <li>
                    <strong>Name:</strong> {user.name}
                </li>
                <li>
                    <strong>ID: </strong> {user.$id}
                </li>
            </ul>

            <form action={signOut}>
                <button type="submit">Sign out</button>
            </form>
        </>
    );
}
