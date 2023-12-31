const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')
const Tweakpane = require('tweakpane')

const settings = {
  dimensions: [1080, 1080],
}
const params = {
  background: { r: 255, g: 0, b: 55 },
}

let manager, image

let text = 'A'
let fontSize = 1200
let fontFamily = 'serif'

const typeCanvas = document.createElement('canvas')
const typeContext = typeCanvas.getContext('2d')

const sketch = ({ context, width, height }) => {
  const cell = 20
  const cols = Math.floor(width / cell)
  const rows = Math.floor(height / cell)
  const numCells = cols * rows

  typeCanvas.width = cols
  typeCanvas.height = rows

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black'
    typeContext.fillRect(0, 0, cols, rows)

    typeContext.save()
    typeContext.drawImage(image, 0, 0, cols, rows) // draw image
    typeContext.restore()

    const typeData = typeContext.getImageData(0, 0, cols, rows).data

    const { r, g, b } = params.background;
    context.fillStyle = `rgb(${r}, ${g}, ${b})`;
    // context.fillStyle = 'black'
    context.fillRect(0, 0, width, height)

    context.textBaseline = 'middle'
    context.textAlign = 'center'

    for (let i = 0; i < numCells; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)

      const x = col * cell + random.range(-cell, cell) * 0.5
      const y = row * cell + random.range(-cell, cell) * 0.5

      const r = typeData[i * 4 + 0]
      const g = typeData[i * 4 + 1]
      const b = typeData[i * 4 + 2]
      const a = typeData[i * 4 + 3]

      const glyph = getGlyph(r)

      context.font = `${cell * 2}px ${fontFamily}`
      if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`

      context.fillStyle = 'pink'

      context.save()
      context.translate(x, y)
      context.translate(cell * 0.5, cell * 0.5)

      // context.fillRect(0, 0, cell, cell);

      context.fillText(glyph, 0, 0)

      context.restore()
    }

    context.drawImage(typeCanvas, 0, 0)
  }
}

const getGlyph = (v) => {
  if (v < 50) return ''
  if (v < 100) return '-'
  if (v < 150) return '—'
  if (v < 200) return '='

  const glyphs = '.+-*   '.split('')

  return random.pick(glyphs)
}

const onKeyUp = (e) => {
  // text = e.key.toUpperCase();
  // manager.render();
}

// document.addEventListener('keyup', onKeyUp);

const loadMeSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = url
  })
}

const start = async () => {
  const url = 'images/3.jpeg'
  image = await loadMeSomeImage(url)
  manager = await canvasSketch(sketch, settings)
}

const createPane = () => {
  const pane = new Tweakpane.Pane()
  let folder

  folder = pane.addFolder({ title: 'Colors' })
  folder.addInput(params.background, 'r', { min: 0, max: 255, step: 1 }).on('change', () => {
    params.background.r = Math.round(params.background.r)
    manager.render()
  })
  folder.addInput(params.background, 'g', { min: 0, max: 255, step: 1 }).on('change', () => {
    params.background.g = Math.round(params.background.g)
    manager.render()
  })
  folder.addInput(params.background, 'b', { min: 0, max: 255, step: 1 }).on('change', () => {
    params.background.b = Math.round(params.background.b)
    manager.render()
  })
}

createPane()
start()
