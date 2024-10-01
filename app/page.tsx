import Navigation from "./components/nav";

export default async function Home() {
    return (
        <main className="h-screen">
            <Navigation />
            <section className="h-full grid place-content-center">
                <h1 className="text-5xl lowercase">Appwrite hackathon crypto dashboard project for businesses</h1>
            </section>
        </main>
    );
}
