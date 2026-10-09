# Starter E2E · Reserva de labs

Pruebas de **extremo a extremo (E2E)** con **Playwright** para la **Clase 20** (Programación Web · URL).
La cima de la pirámide: probar la app como un **usuario real** (navegador → front → back).

Un solo servidor (`src/app.js`) sirve el **frontend mínimo** (`public/index.html`: formulario + lista)
**y** la API `/reservas`. Así Playwright abre `http://localhost:3010`, usa la página y le pega a la API
sin dos procesos ni CORS. (En tu Proyecto 1 el front es React en `:5173`; el concepto de E2E es igual —
solo cambiás la `baseURL` y el `webServer`.)

## Correr

```bash
npm install
npx playwright install chromium   # baja el navegador (solo la 1ª vez)
npm run e2e                        # Playwright levanta el server y corre los E2E
npm run e2e:report                 # abre el reporte HTML
```

Playwright **levanta y apaga el server solo** (ver `webServer` en `playwright.config.js`).

### Verlo correr en el navegador

Por defecto corre **headless** (sin ventana, rápido). Para **ver** el navegador hacer el flujo:

```bash
npm run e2e:ui       # modo UI: panel + viaje en el tiempo por cada paso (el mejor para enseñar)
npm run e2e:slow     # abre Chromium en CÁMARA LENTA (1 s por acción) — demo en vivo
npm run e2e:headed   # abre Chromium y corre a velocidad normal
npm run e2e:debug    # Inspector: avanzás acción por acción
npm run e2e:report   # abre el reporte con el VIDEO y el TRACE de lo ya corrido
```

La cámara lenta se ajusta en `playwright.slow.config.js` (`slowMo`, en milisegundos). El config
normal graba **video + trace** de cada corrida (aunque sea headless), así que el reporte siempre
tiene algo para mirar.

Verificado: **2/2 E2E en verde (Node 26, Chromium)** — `npm run e2e`:
- *un usuario crea una reserva y la ve en la lista* (flujo feliz, del formulario a la lista).
- *el caso borde: una reserva inválida muestra el error y NO se agrega* (fin antes que inicio → 400).

## El reporte en CI (Clase 18 + 20)

`.github/workflows/ci.yml` corre los E2E en cada `push` y **sube el reporte HTML de Playwright como
artifact** (descargable desde la pestaña *Actions* de GitHub). En CI se instala el navegador con
`npx playwright install --with-deps chromium`.

## Selectores robustos

El frontend usa `data-testid` (`sala`, `inicio`, `fin`, `reservar`, `lista`, `error`) y las pruebas
usan `page.getByTestId(...)`. Así el test no se rompe si cambiás estilos o textos.
