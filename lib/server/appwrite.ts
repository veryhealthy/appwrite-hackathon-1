"use server";
import { ID, Client, Account, Users, AppwriteException } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


function getClient() {
    return new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
        .setKey(process.env.NEXT_APPWRITE_KEY as string);
}

export async function signOut() {
    "use server";

    const { account } = await createSessionClient();

    cookies().delete("session");
    await account.deleteSession("current");

    redirect("/register");
}

export async function getSession() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

    const account = new Account(client);
    const result = await account.getSession("current");
    return result;
}

export async function createSessionClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

    const session = cookies().get("session");
    if (!session || !session.value) {
        throw new Error("No session");
    }

    client.setSession(session.value);

    return {
        get account() {
            return new Account(client);
        },
    };
}

export async function createAdminClient() {
    const client = getClient();

    return {
        get account() {
            return new Account(client);
        },
    };
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        return await account.get();
    } catch (error) {
        return null;
    }
}

export async function register(prevState: any, formData: FormData) {

    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    const { account } = await createAdminClient();
    try {
        await account.create(ID.unique(), email as string, password as string, name as string);
    } catch (error: any) {
        return { ...prevState, error: { message: error?.message } };
    }
    const session = await account.createEmailPasswordSession(email as string, password as string);

    cookies().set("session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });

    redirect("/account");
}

export async function login(prevState: any, formData: FormData) {

    const email = formData.get("email");
    const password = formData.get("password");
    const { account } = await createAdminClient();
    try {
        const session = await account.createEmailPasswordSession(email as string, password as string);
        return { ...prevState, session, message: "Connected with success." };
    } catch (error: any) {
        return { ...prevState, error: { message: error?.message } };
    }

}

export async function getUsers() {
    const client = getClient();
    const users = new Users(client);
    return await users.list();
}
