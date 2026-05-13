export default function HomePage() {
  return (
    <main className='min-h-screen w-full'>
      <section className='mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-16'>
        <p className='text-sm uppercase tracking-[0.2em] text-[var(--color-muted)]'>
          Vibe Monorepo
        </p>
        <h1 className='text-4xl font-semibold leading-tight'>
          Frontend Minimal Skeleton Ready
        </h1>
        <p className='max-w-2xl text-base text-[var(--color-muted)]'>
          This workspace now contains a runnable Next.js baseline with a shared
          theme entrypoint and a backend health integration page.
        </p>
        <div className='flex gap-3'>
          <a
            className='rounded-md border border-[var(--color-primary)] bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-contrast)]'
            href='/health'
          >
            Open Health Check
          </a>
        </div>
      </section>
    </main>
  )
}
