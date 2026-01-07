// Typing Animation
const typingText = document.getElementById("typingText")
const phrases = ["CS @ UT Dallas", "Sophomore Year", "Collegium V Honors", "AI/ML Enthusiast"]

let phraseIndex = 0
let charIndex = 0
let isDeleting = false
let typingSpeed = 100

function typeText() {
  const currentPhrase = phrases[phraseIndex]

  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1)
    charIndex--
    typingSpeed = 50
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1)
    charIndex++
    typingSpeed = 100
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    typingSpeed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    phraseIndex = (phraseIndex + 1) % phrases.length
    typingSpeed = 500
  }

  setTimeout(typeText, typingSpeed)
}

// Start typing animation
typeText()

// Scroll Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section)
})

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Generate Stars
function createStars() {
  const starsContainer = document.getElementById("stars")
  const starCount = 200

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div")
    star.className = "star"
    star.style.width = Math.random() * 3 + "px"
    star.style.height = star.style.width
    star.style.left = Math.random() * 100 + "%"
    star.style.top = Math.random() * 100 + "%"
    star.style.animationDelay = Math.random() * 3 + "s"
    starsContainer.appendChild(star)
  }
}

// Generate Shooting Stars
function createShootingStars() {
  const container = document.getElementById("shooting-stars")

  setInterval(() => {
    const shootingStar = document.createElement("div")
    shootingStar.className = "shooting-star"
    shootingStar.style.left = Math.random() * 100 + "%"
    shootingStar.style.top = Math.random() * 50 + "%"
    shootingStar.style.animationDuration = Math.random() * 2 + 2 + "s"
    container.appendChild(shootingStar)

    setTimeout(() => {
      shootingStar.remove()
    }, 4000)
  }, 3000)
}

// Generate Satellites
function createSatellites() {
  const container = document.getElementById("satellites")
  const satelliteCount = 3

  for (let i = 0; i < satelliteCount; i++) {
    const satellite = document.createElement("div")
    satellite.className = "satellite"
    satellite.style.left = Math.random() * 80 + 10 + "%"
    satellite.style.top = Math.random() * 80 + 10 + "%"
    satellite.style.animationDuration = 15 + Math.random() * 10 + "s"
    satellite.style.animationDelay = Math.random() * 5 + "s"

    satellite.innerHTML = `
            <div class="satellite-body"></div>
            <div class="satellite-panel left"></div>
            <div class="satellite-panel right"></div>
            <div class="satellite-signal"></div>
        `

    container.appendChild(satellite)
  }
}

// Generate Rockets
function createRockets() {
  const container = document.getElementById("rockets")

  setInterval(() => {
    const rocket = document.createElement("div")
    rocket.className = "rocket"
    rocket.style.left = Math.random() * 90 + 5 + "%"

    rocket.innerHTML = `
            <div class="rocket-nose"></div>
            <div class="rocket-body"></div>
            <div class="rocket-fin left"></div>
            <div class="rocket-fin right"></div>
            <div class="rocket-flame"></div>
        `

    container.appendChild(rocket)

    setTimeout(() => {
      rocket.remove()
    }, 8000)
  }, 5000)
}

// Generate Planets
function createPlanets() {
  const container = document.getElementById("planets")
  const planets = [
    { class: "mars", size: 60 },
    { class: "jupiter", size: 80 },
  ]

  planets.forEach((planetData, index) => {
    const planet = document.createElement("div")
    planet.className = `planet ${planetData.class}`
    planet.style.left = 20 + index * 50 + "%"
    planet.style.top = 20 + index * 30 + "%"
    planet.style.animationDelay = index * 3 + "s"
    container.appendChild(planet)
  })
}

// Generate Asteroids
function createAsteroids() {
  const container = document.getElementById("asteroids")
  const asteroidCount = 5

  for (let i = 0; i < asteroidCount; i++) {
    const asteroid = document.createElement("div")
    asteroid.className = "asteroid"
    const size = Math.random() * 20 + 10
    asteroid.style.width = size + "px"
    asteroid.style.height = size + "px"
    asteroid.style.top = Math.random() * 80 + 10 + "%"
    asteroid.style.animationDuration = 20 + Math.random() * 15 + "s"
    asteroid.style.animationDelay = Math.random() * 10 + "s"
    container.appendChild(asteroid)
  }
}

// Skills Data
const skills = [
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "SQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "NumPy", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
  { name: "Pandas", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "HTML5", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
]

// Render Skills
function renderSkills() {
  const skillsGrid = document.getElementById("skillsGrid")

  skills.forEach((skill) => {
    const skillCard = document.createElement("div")
    skillCard.className = "skill-card hover-lift"
    skillCard.innerHTML = `
            <img src="${skill.img}" alt="${skill.name}">
            <p>${skill.name}</p>
        `
    skillsGrid.appendChild(skillCard)
  })
}

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  createStars()
  createShootingStars()
  createSatellites()
  createRockets()
  createPlanets()
  createAsteroids()
  renderSkills()
})
