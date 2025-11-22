gsap.registerPlugin(ScrollTrigger)

const finalMessageText = "Avec toi, tout paraît plus beau. Que ce jour t’apporte douceur, joie et mille sourires. Joyeux anniversaire, Blessing."

document.getElementById("final-message").innerHTML = ""
  .concat(...finalMessageText.split(""))
  .replace(/./g, c => `<span class="char">${c}</span>`)

gsap.from("#hero .hero-inner", { duration: 1.4, opacity: 0, scale: 0.92, ease: "elastic.out(1, 0.6)" })
gsap.from("#cake", { duration: 1.2, y: -180, opacity: 0, ease: "bounce.out" })
gsap.to("#cake", { y: -3, duration: 2.6, yoyo: true, repeat: -1, ease: "sine.inOut" })
gsap.to("#icingTop", { duration: 3.2, yoyo: true, repeat: -1, opacity: 0.96 })
const flames = ["#flame1", "#flame2", "#flame3"]
gsap.to(flames, { duration: 0.6, scale: () => 1 + Math.random() * 0.18, opacity: () => 0.85 + Math.random() * 0.15, transformOrigin: "50% 50%", repeat: -1, yoyo: true, stagger: 0.12, ease: "sine.inOut", repeatRefresh: true })

document.querySelectorAll(".fade-section .glass, .fade-section .container").forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 85%" },
    duration: 0.9,
    opacity: 0,
    y: 30,
    scale: 0.98,
    ease: "power2.out"
  })
})

gsap.from("#memories .memory-card", {
  scrollTrigger: { trigger: "#memories", start: "top 75%" },
  duration: 0.6,
  opacity: 0,
  y: 24,
  stagger: 0.08,
  ease: "power2.out"
})
document.querySelectorAll('#memories .memory-card').forEach(mc => {
  const rot = (Math.random() * 4 - 2)
  gsap.set(mc, { rotate: rot })
})

gsap.from("#qualities .chip", {
  scrollTrigger: { trigger: "#qualities", start: "top 75%" },
  duration: 0.5,
  opacity: 0,
  y: 16,
  stagger: 0.06,
  ease: "power2.out"
})

gsap.from("#final .char", {
  scrollTrigger: { trigger: "#final", start: "top 80%" },
  duration: 0.6,
  opacity: 0,
  y: 12,
  stagger: 0.02,
  ease: "power2.out"
})

const carouselSlides = [
  { text: "Ta lumière rend chaque jour plus doux.", lyrics: "Dans tes yeux, le matin danse, et nos rêves se tiennent la main." },
  { text: "Avec toi, tout devient plus beau.", lyrics: "Chaque souffle murmure ton nom, comme une poésie qui ne finit jamais." },
  { text: "Ton sourire est ma plus belle habitude.", lyrics: "Il éclaire les heures, et apaise les jours trop longs." },
  { text: "Chaque instant à tes côtés est un cadeau.", lyrics: "Un battement de cœur à partager, une douceur à préserver." },
  { text: "Aujourd’hui, nous célébrons la merveille que tu es.", lyrics: "Que cette lumière te porte, et que l’amour te couvre." },
  { text: "Ta voix apaise et rassure.", lyrics: "Comme une brise tendre qui berce le cœur." },
  { text: "Tu es mon miracle quotidien.", lyrics: "Une douce évidence, un soleil qui ne s’éteint pas." },
  { text: "Ta présence rend tout plus léger.", lyrics: "Même le silence fleurit quand tu souris." },
  { text: "Ton élégance est une poésie.", lyrics: "Chaque geste dessine un vers, chaque regard raconte." },
  { text: "Bénie soit ta lumière.", lyrics: "Qu’elle guide nos pas vers des jours encore plus beaux." }
]

const track = document.getElementById("carousel-track")
const dotsEl = document.getElementById("dots")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")

let currentIndex = 0
let autoTimer = null

function renderSlides() {
  track.innerHTML = carouselSlides.map(s => `
    <div class="slide">
      <div class="slide-card glass">
        <div class="caption-card">
          <h3>${s.text}</h3>
          <p class="lyrics">${s.lyrics}</p>
        </div>
      </div>
    </div>
  `).join("")
  dotsEl.innerHTML = carouselSlides.map((_, i) => `<button class="dot" data-index="${i}"></button>`).join("")
}

function updateDots() {
  dotsEl.querySelectorAll(".dot").forEach((d, i) => {
    if (i === currentIndex) d.classList.add("active")
    else d.classList.remove("active")
  })
}

function goToSlide(index) {
  const max = carouselSlides.length - 1
  currentIndex = index < 0 ? max : index > max ? 0 : index
  const offset = -currentIndex * track.parentElement.clientWidth
  track.style.transform = `translate3d(${offset}px,0,0)`
  updateDots()
  const cards = track.querySelectorAll('.slide-card')
  cards.forEach((c, i) => {
    if (i === currentIndex) {
      gsap.to(c, { scale: 1, opacity: 1, boxShadow: '0 12px 32px rgba(201,167,71,0.16)', duration: 0.5, ease: 'power2.out' })
    } else {
      gsap.to(c, { scale: 0.98, opacity: 0.92, boxShadow: '0 6px 20px rgba(0,0,0,0.12)', duration: 0.5, ease: 'power2.out' })
    }
  })
}

function nextSlide() {
  goToSlide(currentIndex + 1)
}

function prevSlide() {
  goToSlide(currentIndex - 1)
}

function startAuto() {
  stopAuto()
  autoTimer = setInterval(nextSlide, 4000)
}

function stopAuto() {
  if (autoTimer) clearInterval(autoTimer)
}

renderSlides()
goToSlide(0)
startAuto()

prevBtn.addEventListener("click", () => { prevSlide() })
nextBtn.addEventListener("click", () => { nextSlide() })

dotsEl.addEventListener("click", e => {
  const t = e.target
  if (t.classList.contains("dot")) {
    const i = parseInt(t.getAttribute("data-index"), 10)
    goToSlide(i)
  }
})

window.addEventListener("resize", () => { goToSlide(currentIndex) })

const music = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3")
music.preload = "auto"
music.loop = true
music.volume = 0.6
music.load()

function tryPlayMusic() {
  const p = music.play()
  if (p && typeof p.then === "function") p.catch(() => {})
}

let carouselTrigger = ScrollTrigger.create({
  trigger: "#carousel-section",
  start: "top center",
  end: "bottom center",
  onEnter: () => tryPlayMusic(),
  onLeave: () => music.pause(),
  onEnterBack: () => tryPlayMusic(),
  onLeaveBack: () => music.pause()
})

document.addEventListener("visibilitychange", () => {
  if (document.hidden) music.pause()
  else if (carouselTrigger && carouselTrigger.isActive) tryPlayMusic()
})

let interacted = false
function ensureAudioOnInteraction() {
  if (interacted) return
  interacted = true
  if (carouselTrigger && carouselTrigger.isActive) tryPlayMusic()
  window.removeEventListener('pointerdown', ensureAudioOnInteraction)
  window.removeEventListener('touchstart', ensureAudioOnInteraction)
  window.removeEventListener('click', ensureAudioOnInteraction)
}
window.addEventListener('pointerdown', ensureAudioOnInteraction, { passive: true })
window.addEventListener('touchstart', ensureAudioOnInteraction, { passive: true })
window.addEventListener('click', ensureAudioOnInteraction, { passive: true })

function rand(min, max) { return Math.random() * (max - min) + min }

function spawnHearts(n = 30) {
  const container = document.getElementById("heart-container")
  for (let i = 0; i < n; i++) {
    const h = document.createElement("div")
    h.className = "heart"
    const size = rand(12, 26)
    h.style.width = `${size}px`
    h.style.height = `${size}px`
    h.style.left = `${rand(0, 100)}%`
    h.style.top = `${rand(70, 100)}%`
    h.style.opacity = String(rand(0.4, 0.85))
    container.appendChild(h)
    const yEnd = -rand(10, 40)
    gsap.to(h, { yPercent: yEnd, duration: rand(8, 18), ease: "sine.inOut", repeat: -1, delay: rand(0, 6) })
    gsap.to(h, { xPercent: rand(-20, 20), duration: rand(4, 8), yoyo: true, repeat: -1, ease: "sine.inOut" })
    gsap.to(h, { rotation: rand(-22, 22), duration: rand(5, 9), yoyo: true, repeat: -1, ease: "sine.inOut" })
  }
}

spawnHearts(48)

const blowBtn = document.getElementById('blow-btn')
const smokeGroup = document.querySelector('#smoke')

function createSmoke(x, y) {
  const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  c.setAttribute('cx', x)
  c.setAttribute('cy', y)
  c.setAttribute('r', 3)
  c.setAttribute('fill', '#bfbfbf')
  smokeGroup.appendChild(c)
  gsap.to(c, { duration: 2.4, y: -40, x: (Math.random() * 14) - 7, opacity: 0, scale: 1.8, ease: 'sine.out', onComplete: () => c.remove() })
}

function confettiRain(n = 120) {
  const colors = ['#f7c5d0', '#ffd9e3', '#e3c36f', '#ffffff']
  for (let i = 0; i < n; i++) {
    const d = document.createElement('div')
    d.style.position = 'fixed'
    d.style.top = '-20px'
    d.style.left = `${Math.random() * 100}%`
    d.style.width = `${Math.random() * 6 + 6}px`
    d.style.height = `${Math.random() * 8 + 8}px`
    d.style.background = colors[Math.floor(Math.random() * colors.length)]
    d.style.transform = `rotate(${Math.random() * 180}deg)`
    d.style.borderRadius = '4px'
    d.style.zIndex = '1000'
    document.body.appendChild(d)
    gsap.to(d, { y: window.innerHeight + 40, rotation: Math.random() * 360, duration: Math.random() * 2 + 3.2, ease: 'sine.in', onComplete: () => d.remove() })
  }
}

function blowCandles() {
  gsap.to(flames, { duration: 0.4, scale: 0, opacity: 0, ease: 'power1.inOut' })
  smokeGroup.setAttribute('opacity', '1')
  createSmoke(100, 58)
  createSmoke(150, 58)
  createSmoke(200, 58)
  confettiRain(160)
}

blowBtn.addEventListener('click', blowCandles)

document.getElementById('night-toggle').addEventListener('click', () => {
  document.body.classList.toggle('night')
})

ScrollTrigger.create({
  trigger: '#final',
  start: 'top 70%',
  once: true,
  onEnter: () => confettiRain(120)
})

const viewport = document.querySelector('.carousel-viewport')
let startX = 0
let dragging = false

function onPointerDown(e) {
  dragging = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
  stopAuto()
}

function onPointerMove(e) {
  if (!dragging) return
}

function onPointerUp(e) {
  if (!dragging) return
  const endX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || 0
  const delta = endX - startX
  if (Math.abs(delta) > 40) {
    if (delta < 0) nextSlide()
    else prevSlide()
  }
  dragging = false
  startAuto()
}

viewport.addEventListener('pointerdown', onPointerDown, { passive: true })
viewport.addEventListener('pointermove', onPointerMove, { passive: true })
viewport.addEventListener('pointerup', onPointerUp, { passive: true })
viewport.addEventListener('touchstart', onPointerDown, { passive: true })
viewport.addEventListener('touchmove', onPointerMove, { passive: true })
viewport.addEventListener('touchend', onPointerUp, { passive: true })

function buildInitialsOrbit() {
  const orbit = document.getElementById('initials-orbit')
  if (!orbit) return
  const n = 14
  const r = 90
  for (let i = 0; i < n; i++) {
    const h = document.createElement('div')
    h.className = 'red-heart'
    const angle = (i / n) * Math.PI * 2
    const x = Math.cos(angle) * r
    const y = Math.sin(angle) * r
    h.style.left = `calc(50% + ${x}px)`
    h.style.top = `calc(50% + ${y}px)`
    h.style.transform = 'translate(-50%, -50%) rotate(45deg)'
    orbit.appendChild(h)
    gsap.to(h, { y: '+=8', duration: rand(1.8, 3.2), yoyo: true, repeat: -1, ease: 'sine.inOut', delay: rand(0, 1.2) })
  }
  gsap.to(orbit, { rotation: 360, duration: 18, repeat: -1, ease: 'linear', transformOrigin: '50% 50%' })
}

buildInitialsOrbit()