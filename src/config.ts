// Reads the backend API base URL injected at runtime via public/config.js.
// Falls back to Vite env vars for local development, then to empty string.
// Empty string triggers the Vite dev-server proxy (/api -> localhost:3002).
export function getApiBaseUrl(): string {
  const runtime = (window as any).__API_BASE_URL__ as string | undefined;
  if (runtime && runtime.trim() && !runtime.includes('your-backend-url')) {
    return runtime.replace(/\/$/, '');
  }
  const vite = (import.meta as any).env?.VITE_API_BASE_URL as string | undefined;
  if (vite && vite.trim()) {
    return vite.replace(/\/$/, '');
  }
  return '';
}