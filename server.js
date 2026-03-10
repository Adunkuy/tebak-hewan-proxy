// server.js
const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ROBLOX_SECRET = process.env.ROBLOX_SECRET || "ganti_secret_ini";

app.post("/validate-animal", async (req, res) => {
	const { secret, letter, answer } = req.body;

	if (secret !== ROBLOX_SECRET) {
		return res.status(403).json({ valid: false, reason: "Unauthorized" });
	}
	if (!letter || !answer) {
		return res.status(400).json({ valid: false, reason: "Missing parameters" });
	}

	// Cek huruf pertama dulu sebelum tanya AI
	const firstChar = answer.trim()[0]?.toLowerCase();
	const expectedChar = letter.toLowerCase();
	if (firstChar !== expectedChar) {
		console.log(`Huruf pertama salah: "${answer}" bukan berawalan "${letter}"`);
		return res.json({ valid: false });
	}

	try {
		console.log(`Mengecek - Huruf: ${letter}, Jawaban: ${answer}`);

		const response = await fetch("https://api.anthropic.com/v1/messages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": ANTHROPIC_API_KEY,
				"anthropic-version": "2023-06-01",
			},
			body: JSON.stringify({
				model: "claude-opus-4-6",
				max_tokens: 5,
				messages: [
					{
						role: "user",
						content: `Apakah kata "${answer}" adalah nama hewan dalam bahasa Indonesia? Jawab hanya dengan kata "true" atau "false".`,
					},
				],
			}),
		});

		const data = await response.json();
		console.log("Response AI:", JSON.stringify(data));

		const result = data.content?.[0]?.text?.trim().toLowerCase();
		console.log("Hasil AI:", result);

		const isValid = result === "true";
		return res.json({ valid: isValid });

	} catch (err) {
		console.error("Error:", err);
		return res.status(500).json({ valid: false, reason: "Server error" });
	}
});

app.get("/", (req, res) => {
	res.json({ status: "ok", message: "Tebak Hewan Proxy Server" });
});

app.listen(PORT, () => {
	console.log(`Server berjalan di port ${PORT}`);
});
