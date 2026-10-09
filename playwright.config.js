// playwright.config.js — la configuración de las pruebas E2E.
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  reporter: 'html', // genera el reporte en playwright-report/
  use: {
    baseURL: 'http://localhost:3010', // page.goto('/') apunta acá
    trace: 'on', // graba un "trace" navegable de cada corrida (lo ves en el reporte)
    video: 'on', // graba un video del navegador, aunque corra headless
    screenshot: 'only-on-failure',
  },
  // Playwright LEVANTA el server solo antes de las pruebas, y lo apaga al terminar.
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3010',
    reuseExistingServer: !process.env.CI, // en tu máquina reusa el que ya tengas; en CI arranca uno limpio
  },
})
