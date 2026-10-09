// playwright.slow.config.js — SOLO para la demo en clase: navegador visible + cámara lenta.
// Reusa todo tu config normal y le agrega una pausa entre cada acción, para que se vea bien.
// Se corre con:  npm run e2e:slow
import { defineConfig } from '@playwright/test'
import base from './playwright.config.js'

export default defineConfig({
  ...base,
  use: {
    ...base.use,
    headless: false, // abre la ventana del navegador
    launchOptions: {
      slowMo: 1000, // 1 segundo entre cada acción (subilo/bajalo a gusto)
    },
  },
})
