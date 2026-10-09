// server.js — enciende el servidor (listen). Playwright lo levanta solo (ver playwright.config.js).
import { app } from './app.js'

const PORT = process.env.PORT || 3010
app.listen(PORT, () => {
  console.log(`Reserva de labs en http://localhost:${PORT}`)
})
