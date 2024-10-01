import Link from "next/link";
import { getLoggedInUser, signOut } from "@/lib/server/appwrite";

export default async function Navigation() {
    const user = await getLoggedInUser();
    return (
        <nav>
            <ul className="w-full flex items-center justify-end h-8">
                <li className="w-2/12 flex justify-around">
                    {
                        user ? (
                            <form action={signOut}>
                                <button type="submit">Sign out</button>
                            </form>
                        ) : (
                            <>
                                <Link href="/login">
                                    <span className="px-4 py-2">Login</span>
                                </Link>
                                <Link href="/register">
                                    <span className="px-4 py-2">Sign up</span>
                                </Link>
                            </>
                        )
                    }
                </li>
            </ul>
        </nav>
    );
}