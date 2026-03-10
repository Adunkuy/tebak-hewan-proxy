// server.js
// Deploy ke Railway: https://railway.app
// Proxy antara Roblox dan Anthropic API

const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY; // set di Railway environment variables
const ROBLOX_SECRET = process.env.ROBLOX_SECRET || "ganti_secret_ini"; // kunci rahasia biar cuma Roblox kamu yang bisa akses

// ============================================
//   ENDPOINT: Validasi apakah jawaban adalah hewan
// ============================================
app.post("/validate-animal", async (req, res) => {
	const { secret, letter, answer } = req.body;

	// Cek secret key
	if (secret !== ROBLOX_SECRET) {
		return res.status(403).json({ valid: false, reason: "Unauthorized" });
	}

	if (!letter || !answer) {
		return res.status(400).json({ valid: false, reason: "Missing parameters" });
	}

	try {
		const response = await fetch("https://api.anthropic.com/v1/messages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": ANTHROPIC_API_KEY,
				"anthropic-version": "2023-06-01",
			},
			body: JSON.stringify({
				model: "claude-haiku-4-5-20251001",
				max_tokens: 10,
				system: `Kamu adalah validator game tebak hewan berbahasa Indonesia.
Tugasmu HANYA menjawab "true" atau "false". Tidak ada kata lain sama sekali.

Jawab "true" jika:
- Kata tersebut adalah nama hewan dalam bahasa Indonesia
- Huruf pertama kata sesuai dengan huruf yang diminta (tidak case-sensitive)
- Typo ringan tetap dianggap valid (contoh: "orang utan" = "orangutan")

Jawab "false" jika:
- Bukan nama hewan
- Nama hewan dalam bahasa Inggris atau bahasa lain
- Huruf pertama tidak sesuai

Contoh:
Huruf O, jawaban "orangutan" → true
Huruf U, jawaban "ular" → true
Huruf B, jawaban "beruang" → true
Huruf H, jawaban "harimau" → true
Huruf A, jawaban "apel" → false (bukan hewan)
Huruf B, jawaban "bear" → false (bahasa Inggris)`,
				messages: [
					{
						role: "user",
						content: `Huruf: ${letter.toUpperCase()}\nJawaban: ${answer}\nApakah "${answer}" adalah hewan yang berawalan huruf "${letter.toUpperCase()}"?`,
					},
				],
			}),
		});

		const data = await response.json();
		const result = data.content?.[0]?.text?.trim().toLowerCase();
		const isValid = result === "true";

		return res.json({ valid: isValid });
	} catch (err) {
		console.error("Error:", err);
		return res.status(500).json({ valid: false, reason: "Server error" });
	}
});

// Health check
app.get("/", (req, res) => {
	res.json({ status: "ok", message: "Tebak Hewan Proxy Server" });
});

app.listen(PORT, () => {
	console.log(`Server berjalan di port ${PORT}`);
});
