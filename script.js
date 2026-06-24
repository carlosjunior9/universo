const chain = document.getElementById('chain')
const glow = document.getElementById('glow')
const music = document.getElementById('music')

let started = false

chain.addEventListener('click', startLamp)
chain.addEventListener('touchstart', startLamp)

function startLamp() {
  if (started) return

  started = true

  document.getElementById('instruction').innerHTML = '✨ TU ILUMINAS MI UNIVERSO MI VIDA...'

  glow.classList.add('light-on')

  setTimeout(() => {
    glow.classList.add('blink')

    setTimeout(() => {
      glow.classList.remove('light-on')

      music.play()

      document.body.style.background = 'black'

      setTimeout(() => {
        document.getElementById('scene').style.display = 'none'

        document.getElementById('universe').style.display = 'block'

        startUniverse()
      }, 1000)
    }, 1000)
  }, 3000)
}

/*
PARTE 2

Aquí construiremos:
- estrellas animadas
- planetas
- viaje espacial
*/

function startUniverse() {
  const canvas = document.getElementById('universe')
  const ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  let stars = []

  class Star {
    constructor() {
      this.reset()
    }

    reset() {
      this.x = (Math.random() - 0.8) * canvas.width

      this.y = (Math.random() - 0.8) * canvas.height

      this.z = Math.random() * canvas.width
    }

    update() {
      this.z -= 8

      if (this.z <= 1) {
        this.reset()
        this.z = canvas.width
      }
    }

    draw() {
      let sx = (this.x / this.z) * canvas.width + canvas.width / 2

      let sy = (this.y / this.z) * canvas.width + canvas.height / 2

      let radius = (1 - this.z / canvas.width) * 3

      ctx.beginPath()

      ctx.fillStyle = 'white'

      ctx.arc(sx, sy, radius, 0, Math.PI * 2)

      ctx.fill()
    }
  }

  for (let i = 0; i < 1000; i++) {
    stars.push(new Star())
  }

  let animationId

  function animate() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    stars.forEach((star) => {
      star.update()
      star.draw()
    })

    animationId = requestAnimationFrame(animate)
  }

  animate()

  // Después de 10 segundos
  // comienza la secuencia romántica

  setTimeout(() => {
    cancelAnimationFrame(animationId)

    startHeartScene(canvas, ctx)
  }, 10000)
}

window.addEventListener('resize', () => {
  const canvas = document.getElementById('universe')

  canvas.width = window.innerWidth

  canvas.height = window.innerHeight
})

function startHeartScene(canvas, ctx) {
  const messages = ['❤', 'TE AMO MUCHISIMO', 'ESTOY MUY ORGULLOSO DE TI MI NIÑA']

  let current = 0

  showMessage()

  function showMessage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'black'

    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const offCanvas = document.createElement('canvas')

    const offCtx = offCanvas.getContext('2d')

    offCanvas.width = canvas.width

    offCanvas.height = canvas.height

    offCtx.fillStyle = 'white'

    const isMobile = window.innerWidth < 768

    if (current === 0) {
      offCtx.font = isMobile ? 'bold 150px Arial' : 'bold 300px Arial'
    } else if (current === 1) {
      offCtx.font = isMobile ? `bold ${Math.floor(canvas.width * 0.09)}px Arial` : 'bold 90px Arial'
    } else {
      offCtx.font = isMobile ? `bold ${Math.floor(canvas.width * 0.06)}px Arial` : 'bold 55px Arial'
    }

    offCtx.textAlign = 'center'

    offCtx.textBaseline = 'middle'

    if (current === 0) {
      offCtx.fillText('❤', offCanvas.width / 2, offCanvas.height / 2)
    } else if (current === 1) {
      if (isMobile) {
        offCtx.fillText('TE AMO', offCanvas.width / 2, offCanvas.height / 2 - 30)

        offCtx.fillText('MUCHISIMO', offCanvas.width / 2, offCanvas.height / 2 + 30)
      } else {
        offCtx.fillText('TE AMO MUCHISIMO', offCanvas.width / 2, offCanvas.height / 2)
      }
    } else {
      if (isMobile) {
        offCtx.fillText('ESTOY', offCanvas.width / 2, offCanvas.height / 2 - 90)

        offCtx.fillText('MUY ORGULLOSO', offCanvas.width / 2, offCanvas.height / 2 - 20)

        offCtx.fillText('DE TI', offCanvas.width / 2, offCanvas.height / 2 + 50)

        offCtx.fillText('MI NIÑA', offCanvas.width / 2, offCanvas.height / 2 + 120)
      } else {
        offCtx.fillText('ESTOY MUY ORGULLOSO', offCanvas.width / 2, offCanvas.height / 2 - 35)

        offCtx.fillText('DE TI MI NIÑA', offCanvas.width / 2, offCanvas.height / 2 + 35)
      }
    }

    const imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height)

    let particles = []

    const density = window.innerWidth < 768 ? 4 : 5

    for (let y = 0; y < imgData.height; y += density) {
      for (let x = 0; x < imgData.width; x += density) {
        const index = (y * imgData.width + x) * 4

        if (imgData.data[index + 3] > 128) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            tx: x,
            ty: y
          })
        }
      }
    }

    console.log('Partículas:', particles.length)

    let frame = 0

    function animate() {
      ctx.fillStyle = 'black'

      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += (p.tx - p.x) * 0.05

        p.y += (p.ty - p.y) * 0.05

        ctx.beginPath()

        ctx.fillStyle = 'white'

        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)

        ctx.fill()
      })

      frame++

      if (frame < 480) {
        requestAnimationFrame(animate)
      }
    }

    animate()

    setTimeout(() => {
      current++

      if (current < messages.length) {
        showMessage()
      } else {
        returnToLamp()
      }
    }, 8000)
  }

  function returnToLamp() {
    const canvas = document.getElementById('universe')

    const ctx = canvas.getContext('2d')

    let stars = []

    for (let i = 0; i < 1200; i++) {
      stars.push({
        x: Math.random() * canvas.width,

        y: Math.random() * canvas.height,

        size: Math.random() * 2
      })
    }

    let frame = 0

    function animate() {
      ctx.fillStyle = 'rgba(0,0,0,0.15)'

      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        star.x += (canvas.width / 2 - star.x) * 0.002

        star.y += (canvas.height / 2 - star.y) * 0.002

        ctx.beginPath()

        ctx.fillStyle = 'white'

        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)

        ctx.fill()
      })

      frame++

      if (frame < 500) {
        requestAnimationFrame(animate)
      } else {
        fadeToLamp()
      }
    }

    animate()
  }

  function fadeToLamp() {
    const canvas = document.getElementById('universe')

    const ctx = canvas.getContext('2d')

    let opacity = 0

    function fade() {
      ctx.fillStyle = `rgba(0,0,0,${opacity})`

      ctx.fillRect(0, 0, canvas.width, canvas.height)

      opacity += 0.01

      if (opacity < 1) {
        requestAnimationFrame(fade)
      } else {
        finishExperience()
      }
    }

    fade()
  }

  function finishExperience() {
    document.getElementById('universe').style.display = 'none'

    document.getElementById('scene').style.display = 'flex'

    const glow = document.getElementById('glow')

    glow.classList.remove('light-on')

    const music = document.getElementById('music')

    music.pause()

    music.currentTime = 0

    started = false

    document.getElementById('instruction').innerHTML = 'Toca la cadena ❤️'
  }
}
