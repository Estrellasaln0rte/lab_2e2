// app.js — un solo servidor que sirve el frontend (public/) Y la API /reservas.
// Para la clase de E2E lo dejamos en UN server a propósito: Playwright abre
// http://localhost:3010, usa la página y le pega a la API sin líos de CORS ni dos procesos.
// (En tu Proyecto 1 el front es React en :5173; el concepto de E2E es idéntico.)
import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { z } from 'zod'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const app = express()
app.use(express.json())
app.use(express.static(join(__dirname, '..', 'public'))) // sirve index.html

const reservas = [
  { id: 1, sala: 'Lab 1', inicio: '2030-10-01T08:00', fin: '2030-10-01T10:00' },
]
let siguienteId = 2

const reservaSchema = z
  .object({
    sala: z.string().min(1, 'la sala es obligatoria'),
    inicio: z.string().min(1, 'inicio es obligatorio'),
    fin: z.string().min(1, 'fin es obligatorio'),
  })
  .refine((d) => new Date(d.fin) > new Date(d.inicio), {
    message: 'el fin debe ser posterior al inicio',
    path: ['fin'],
  })

app.get('/reservas', (req, res) => {
  res.status(200).json(reservas)
})

app.post('/reservas', (req, res) => {
  const r = reservaSchema.safeParse(req.body)
  if (!r.success) {
    return res.status(400).json({ error: r.error.flatten().fieldErrors })
  }
  const nueva = { id: siguienteId++, ...r.data }
  reservas.push(nueva)
  res.status(201).json(nueva)
})
