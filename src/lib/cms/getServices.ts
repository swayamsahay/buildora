export async function getServices() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/services`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch services:", res.status);
      return [];
    }

    const data = await res.json();
    return data ?? [];
  } catch (error) {
    console.error("Service fetch error:", error);
    return [];
  }
}
