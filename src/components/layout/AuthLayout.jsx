
export default function AuthLayout({ brandPanel, children }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dressed-pink-light px-5 py-12">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-dressed-pink-soft opacity-60 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-dressed-lilac opacity-70 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-dressed-border bg-white shadow-[0_24px_80px_rgba(150,90,120,0.12)] md:grid-cols-2">
        {brandPanel}

        <section className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
          {children}
        </section>
      </div>
    </main>
  );
}
