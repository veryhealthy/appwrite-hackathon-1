import Link from "next/link";
import { getLoggedInUser, signOut } from "@/lib/server/appwrite";
import { Button } from "@cn/button";

export default async function Navigation() {
    const user = await getLoggedInUser();
    return (
            <nav className="w-full flex gap-1 pr-8 py-8 items-center justify-end h-8">
                {
                    user ? (
                        <form action={signOut}>
                            <button type="submit">Sign out</button>
                        </form>
                    ) : (
                        <>
                            <Button variant={"link"}>
                                <Link href="/register">
                                Sign up
                                </Link>
                            </Button>
                            <Button variant={"default"}>
                                <Link className="" href="/login">
                                    Login
                                </Link>
                            </Button>
                        </>
                    )
                }
            </nav>
    );
}
