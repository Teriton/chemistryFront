export async function submitPracticeXpToServer(correctCount: number): Promise<{ ok: boolean; xpAdded: number }> {
	try {
		const body = JSON.stringify({ correct_count: correctCount });
		const request = new Request('http://localhost:8080/user/practice-xp', {
			method: 'POST',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			credentials: 'include',
			body
		});
		const response = await fetch(request);
		if (!response.ok) return { ok: false, xpAdded: 0 };
		const data = (await response.json()) as { xp_added?: number };
		return { ok: true, xpAdded: Number(data.xp_added ?? 0) };
	} catch {
		return { ok: false, xpAdded: 0 };
	}
}
