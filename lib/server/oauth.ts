"use server";

import { createAdminClient } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

export async function signUpWithDiscord() {
    const { account } = await createAdminClient();

    const origin = headers().get("origin");

    const redirectUrl = await account.createOAuth2Token(
        OAuthProvider.Discord,
        `${origin}/oauth`,
        `${origin}/register`,
    );

    return redirect(redirectUrl);
};
