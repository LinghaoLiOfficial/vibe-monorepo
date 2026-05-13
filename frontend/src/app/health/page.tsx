import { fetchBackendHealth } from '@/lib/api/health'

export default async function HealthPage() {
  try {
    const result = await fetchBackendHealth()
    return (
      <main className='min-h-screen w-full'>
        <section className='mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 py-16'>
          <h1 className='text-3xl font-semibold'>Backend Health</h1>
          <p className='text-[var(--color-muted)]'>
            Fullstack integration baseline is reachable.
          </p>
          <div className='rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4'>
            <p className='text-sm text-[var(--color-muted)]'>Status</p>
            <p className='text-lg font-medium text-[var(--color-success)]'>
              {result.status}
            </p>
          </div>
        </section>
      </main>
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    return (
      <main className='min-h-screen w-full'>
        <section className='mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 py-16'>
          <h1 className='text-3xl font-semibold'>Backend Health</h1>
          <div className='rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4'>
            <p className='text-sm text-[var(--color-muted)]'>Status</p>
            <p className='text-lg font-medium text-[var(--color-error)]'>unavailable</p>
            <p className='mt-2 text-sm text-[var(--color-muted)]'>{message}</p>
          </div>
        </section>
      </main>
    )
  }
}
