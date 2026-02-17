const BASE_URL = "http://127.0.0.1:8000";

/* LOGIN */
export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",   // ⭐ REQUIRED FOR DJANGO SESSIONS
    body: JSON.stringify(data),
  });

  return await res.json();
}

/* SIGNUP */
export async function signupUser(data) {
  const res = await fetch(`${BASE_URL}/auth/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",   // ⭐ REQUIRED
    body: JSON.stringify(data),
  });

  return await res.json();
}

/* TRANSLATION */
export async function translateText(payload) {
  const res = await fetch(`${BASE_URL}/api/translator/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",   // ⭐ keeps session alive
    body: JSON.stringify(payload),
  });

  return await res.json();
}
