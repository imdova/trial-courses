export const getAuthHeaders = (token?: string) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "accept": "/",
    };
  
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;

    }
  
    return headers;
  };