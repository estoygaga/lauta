export default async function
handler(req, res) {
  console.log("Llamada al backend:", req.body);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    // Llamada a la API gratuita de LLM
    const response = await fetch("https://apifreellm.com/api/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer apf_imfgux7ujzlj7ynylv824qjx`
      },
      body: JSON.stringify({ message: "Hola, como estas?",
        model: "apifreellm"

       })
    });

    const data = await response.json();
    console.log("Respuesta de ApiFreeLLM:", data);

    if (!data || !data.response) {ya
      return res.status(500).json({ error: "Respuesta inválida de ApiFreeLLM" });
    }

    // Devolvemos la respuesta al frontend
    res.status(200).json({ reply: data.response });

  } catch (error) {
    console.error("Error conectando con ApiFreeLLM:", error);
    res.status(500).json({ error: "Error conectando con ApiFreeLLM" });
  }
}