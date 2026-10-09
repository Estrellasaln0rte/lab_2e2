// reserva.spec.js — prueba E2E: Playwright maneja un navegador como un usuario real.
// Flujo completo: abrir la página → llenar el formulario → reservar → ver la reserva en la lista.
import { test, expect } from '@playwright/test'

test('un usuario crea una reserva y la ve en la lista', async ({ page }) => {
  // Arrange — abrir la app (baseURL = http://localhost:3010, ver playwright.config.js)
  await page.goto('/')

  // Act — llenar el formulario y reservar, igual que una persona
  await page.getByTestId('sala').fill('Lab 3')
  await page.getByTestId('inicio').fill('2030-10-01T08:00')
  await page.getByTestId('fin').fill('2030-10-01T10:00')
  await page.getByTestId('reservar').click()

  // Assert — la nueva reserva aparece en la lista
  await expect(page.getByTestId('lista')).toContainText('Lab 3')
})

test('el caso borde: una reserva inválida muestra el error y NO se agrega', async ({ page }) => {
  await page.goto('/')

  // fin antes que inicio → el server la rechaza (400) y el front muestra el mensaje
  await page.getByTestId('sala').fill('Lab 9')
  await page.getByTestId('inicio').fill('2030-10-01T10:00')
  await page.getByTestId('fin').fill('2030-10-01T08:00')
  await page.getByTestId('reservar').click()

  await expect(page.getByTestId('error')).toContainText('no es válida')
  await expect(page.getByTestId('lista')).not.toContainText('Lab 9')
})


test('horario ocupado: reservar una sala que ya está tomada muestra el error y NO se agrega', async ({ page }) => { // FALLA
  await page.goto('/')

  // Lab 1 ya viene reservado de 08:00 a 10:00 (dato semilla en src/app.js).
  // Intentamos reservarlo de 09:00 a 11:00 → se traslapa con la reserva existente.
  await expect(page.getByTestId('lista')).toContainText('Lab 1')
  await page.getByTestId('sala').fill('Lab 1')
  await page.getByTestId('inicio').fill('2030-10-01T09:00')
  await page.getByTestId('fin').fill('2030-10-01T11:00')
  await page.getByTestId('reservar').click()

  await expect(page.getByTestId('error')).toContainText('no es válida')
  await expect(page.getByTestId('lista')).not.toContainText('2030-10-01T09:00')
})
