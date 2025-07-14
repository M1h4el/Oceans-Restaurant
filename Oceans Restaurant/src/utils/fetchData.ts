type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody | null;
  headers?: Record<string, string>;
  credentials?: "include" | "omit" | "same-origin";
  mode?: "cors" | "no-cors" | "same-origin";
  cache?: RequestCache;
}

interface FetchResponse<TData = unknown> {
  data: TData;
  status: number;
  statusText: string;
  headers: Headers;
  ok: boolean;
}

// Variable para controlar el refresco del token
let isRefreshing = false;

export async function fetchData<TData = unknown, TBody = unknown>(
  endpoint: string,
  options: FetchOptions<TBody> = {}
): Promise<FetchResponse<TData>> {
  const {
    method = "GET",
    body = null,
    headers = {},
    credentials = "same-origin",
    mode = "cors",
    cache = "default",
  } = options;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Añade el token de autenticación si existe
  const token = localStorage.getItem('authToken');
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers: { ...defaultHeaders, ...headers },
    credentials,
    mode,
    cache,
  };

  if (body && !["GET", "HEAD"].includes(method)) {
    config.body = JSON.stringify(body);
  }

  try {
    const apiEndpoint = `${import.meta.env.VITE_API_BASE_URL || ''}/api${endpoint}`;
    const response = await fetch(apiEndpoint, config);

    // Manejo de token expirado
    if (response.status === 401 && !isRefreshing) {
      const errorData = await response.json().catch(() => ({}));
      if (errorData.code === 'TOKEN_EXPIRED') {
        isRefreshing = true;
        try {
          const newToken = await refreshToken();
          if (newToken) {
            localStorage.setItem('authToken', newToken);
            // Reintentar la petición original con el nuevo token
            config.headers = {
              ...config.headers,
              'Authorization': `Bearer ${newToken}`
            };
            const retryResponse = await fetch(apiEndpoint, config);
            if (!retryResponse.ok) throw new Error(`HTTP error! status: ${retryResponse.status}`);
            return processResponse(retryResponse);
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          throw new Error('SESSION_EXPIRED');
        } finally {
          isRefreshing = false;
        }
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return processResponse(response);
  } catch (error) {
    console.error("Fetch error:", error);
    if (typeof error === 'object' && error !== null && 'message' in error && (error as any).message === 'SESSION_EXPIRED') {
      localStorage.removeItem('authToken');
      window.dispatchEvent(new Event('session-expired'));
    }
    throw error;
  }
}

async function processResponse<TData>(response: Response): Promise<FetchResponse<TData>> {
  let data: TData;
  try {
    data = (await response.json()) as TData;
  } catch (error) {
    data = (await response.text()) as unknown as TData;
  }

  return {
    data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    ok: response.ok,
  };
}

async function refreshToken(): Promise<string | null> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return null;

    const { token } = await response.json();
    return token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}