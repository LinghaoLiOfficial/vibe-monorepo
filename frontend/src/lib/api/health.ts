export type HealthResponse = {
  status: string
}

const DEFAULT_BROWSER_BACKEND_URL = 'http://localhost:8000'
const DEFAULT_SERVER_BACKEND_URL = 'http://backend:8000'

function resolveBackendBaseUrl(): string {
  if (typeof window === 'undefined') {
    return process.env.BACKEND_BASE_URL ?? DEFAULT_SERVER_BACKEND_URL
  }

  return process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? DEFAULT_BROWSER_BACKEND_URL
}

export async function fetchBackendHealth(): Promise<HealthResponse> {
  const baseUrl = resolveBackendBaseUrl()
  const response = await fetch(`${baseUrl}/health`, {
    method: 'GET',
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error(`Health check failed: ${response.status}`)
  }

  return (await response.json()) as HealthResponse
}
