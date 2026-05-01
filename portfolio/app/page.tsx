export default function Home() {
  return (
    <main className="min-h-screen bg-yellow-100 p-8 text-zinc-950">
      <section className="mx-auto max-w-xl border-4 border-zinc-950 bg-white p-6 shadow-[8px_8px_0_#18181b]">
        <p className="font-mono text-sm uppercase">scrappy web page</p>
        <h1 className="mt-3 text-5xl font-black">Built in a hurry.</h1>
        <p className="mt-4 text-lg">A rough little homepage with sharp edges, loud color, and no extra ceremony.</p>
        <a className="mt-8 inline-block bg-zinc-950 px-5 py-3 font-bold text-white" href="mailto:hello@example.com">Say hi</a>
      </section>
    </main>
  );
}
