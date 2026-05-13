export type HealthResponse = {
  status: string
}

const DEFAULT_BACKEND_URL = 'http://localhost:8000'

export async function fetchBackendHealth(): Promise<HealthResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? DEFAULT_BACKEND_URL
  const response = await fetch(`${baseUrl}/health`, {
    method: 'GET',
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error(`Health check failed: ${response.status}`)
  }

  return (await response.json()) as HealthResponse
}
