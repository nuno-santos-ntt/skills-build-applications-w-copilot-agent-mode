export const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getEndpointUrl(resource) {
  return `${apiBaseUrl}/${resource}/`
}

export function normalizeCollection(response) {
  if (Array.isArray(response)) {
    return response
  }

  const candidates = [response?.results, response?.items, response?.data, response?.docs]
  return candidates.find(Array.isArray) ?? []
}

export async function fetchCollectionFromUrl(endpointUrl) {
  const response = await fetch(endpointUrl)

  if (!response.ok) {
    throw new Error(`Request failed for ${endpointUrl}: ${response.status}`)
  }

  return normalizeCollection(await response.json())
}

export async function fetchCollection(resource) {
  return fetchCollectionFromUrl(getEndpointUrl(resource))
}