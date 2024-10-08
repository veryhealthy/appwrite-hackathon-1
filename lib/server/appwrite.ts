"use server";
import { ID, Client, Account, Users, AppwriteException, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


function getClient(admin=false) {
    const client =  new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)

    if (admin) client.setKey(process.env.NEXT_APPWRITE_KEY as string);

    return client;
}

export async function signOut() {
    "use server";

    const { account } = await createSessionClient();

    cookies().delete("session");
    await account.deleteSession("current");

    redirect("/register");
}

export async function getSession() {
    const client = getClient();

    const account = new Account(client);
    const result = await account.getSession("current");
    return result;
}

export async function createSessionClient() {
    const client = getClient();

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
    const client = getClient(true);

    return {
        get account() {
            return new Account(client);
        },


        async getUserFromEmail(userEmail: string) {
            const users = new Users(client);

            const userList = await users.list([
                Query.equal("email", userEmail),
            ])

            return userList
        }
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

export async function getUsers() {
    const client = getClient();
    const users = new Users(client);
    return await users.list();
}
