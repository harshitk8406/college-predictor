const BASE_URL = "/api";

async function handle(res) {
  const data = await res.json();
  if (!res.ok) {
    const message = (data.errors && data.errors.join(" ")) || "Request failed.";
    const err = new Error(message);
    err.fieldErrors = data.errors;
    throw err;
  }
  return data;
}

export async function fetchMeta() {
  const res = await fetch(`${BASE_URL}/meta`);
  return handle(res);
}

export async function fetchPrediction(payload) {
  const res = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return handle(res);
}
