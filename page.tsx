"use client"

import { useEffect, useRef, useState } from "react"
import "./portfolio.css"

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll(".animate-on-scroll")
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const scrollSkills = (direction: "left" | "right") => {
    const container = document.getElementById("skillsScroll")
    if (container) {
      const scrollAmount = 200
      container.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount
    }
  }

  useEffect(() => {
    // Smooth scroll for navigation
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault()
        const id = target.getAttribute("href")?.slice(1)
        const element = document.getElementById(id || "")
        element?.scrollIntoView({ behavior: "smooth" })
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return (
    <div className="portfolio-container">
      <div className="space-bg">
        {/* Twinkling stars */}
        <div className="stars-layer">
          {[...Array(200)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Shooting stars */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="shooting-star"
            style={{
              top: `${Math.random() * 50}%`,
              animationDelay: `${i * 8}s`,
            }}
          />
        ))}

        {/* Satellites */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`satellite-${i}`}
            className="satellite"
            style={{
              left: `${20 + i * 30}%`,
              animationDelay: `${i * 3}s`,
              animationDuration: `${20 + i * 5}s`,
            }}
          >
            <div className="satellite-body"></div>
            <div className="satellite-panel left"></div>
            <div className="satellite-panel right"></div>
            <div className="satellite-signal"></div>
          </div>
        ))}

        {/* Rockets */}
        {[...Array(2)].map((_, i) => (
          <div
            key={`rocket-${i}`}
            className="rocket"
            style={{
              left: `${30 + i * 40}%`,
              animationDelay: `${i * 15}s`,
            }}
          >
            <div className="rocket-body"></div>
            <div className="rocket-window"></div>
            <div className="rocket-fin left"></div>
            <div className="rocket-fin right"></div>
            <div className="rocket-flame"></div>
            <div className="rocket-trail"></div>
          </div>
        ))}

        {/* Planets */}
        <div className="planet planet-1"></div>
        <div className="planet planet-2"></div>

        {/* Asteroids */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`asteroid-${i}`}
            className="asteroid"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${30 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      <header className="fade-in">
        <div className="container">
          <h1 className="glitch-text" data-text="Yugant Jha">
            Yugant Jha
          </h1>
          <p className="tagline typing-effect">
            CS @ UT Dallas | Sophomore Year | Collegium V Honors | AI/ML Enthusiastic
          </p>
          <nav>
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#experience" className="nav-link">
              Experience
            </a>
            <a href="#education" className="nav-link">
              Education
            </a>
            <a href="#certifications" className="nav-link">
              Certifications
            </a>
            <a href="#skills" className="nav-link">
              Skills
            </a>
            <a href="#projects" className="nav-link">
              Projects
            </a>
            <a href="#awards" className="nav-link">
              Awards
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section id="about" className={`section animate-on-scroll ${isVisible["about"] ? "visible" : ""}`}>
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <p className="slide-in-left">
            Hi! I&apos;m Yugant Jha — a sophomore majoring in Computer Science at The University of Texas at Dallas, and
            a member of the Collegium V Honors Program. I&apos;m deeply passionate about artificial intelligence and
            machine learning, and I&apos;m currently building my foundation in mathematics, algorithms, and data
            science.
          </p>
          <p className="slide-in-left delay-1">
            I work as a Student Assistant at the University Housing Office, where I manage front desk operations,
            support administrative tasks, and help streamline communication with students and parents. This role has
            strengthened my problem-solving, communication, and organizational skills.
          </p>
          <p className="slide-in-left delay-2">
            I&apos;m excited to grow through academic projects, research opportunities, and industry experience that
            align with my long-term goal of working in the AI/ML space.
          </p>
        </div>
      </section>

      <section id="education" className={`section animate-on-scroll ${isVisible["education"] ? "visible" : ""}`}>
        <div className="container">
          <h2 className="section-title">Education</h2>
          <div className="card hover-lift">
            <h3 className="utd-header">
              The University of Texas at Dallas
              <span className="utd-logo pulse-logo">
                <img
                  src="https://cdn.brandfetch.io/idI2KAi4Vd/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
                  alt="UTD Logo"
                />
              </span>
            </h3>
            <p className="highlight-major">Bachelor of Science - BS, Computer Science</p>
            <p>Minor: Business Intelligence and Analytics</p>
            <p>August 2024 - May 2028</p>
            <p>Erik Jonsson School of Engineering & Computer Science</p>
            <p>Activities and societies: Collegium V Honors</p>
            <p>Dean&apos;s List - Fall 2024</p>
          </div>
        </div>
      </section>

      <section
        id="experience"
        className={`section light animate-on-scroll ${isVisible["experience"] ? "visible" : ""}`}
      >
        <div className="container">
          <h2 className="section-title">Experience</h2>
          <div className="card hover-lift">
            <h3 className="exp-header">
              AI Mentorship Program (Artificial Intelligence Society)
              <span className="exp-logo rotate-on-hover">
                <img
                  src="https://cdn.prod.website-files.com/6573df751dbab4bb0aac132c/65cbe658681665405e277f6d_extern_primary_black.svg"
                  alt="extern logo"
                />
              </span>
            </h3>
            <p>
              <strong>Project Mentee</strong>
            </p>
            <p>September 2025 to December 2025 | 4 months</p>
            <p>
              Project: TravelBudgetFX - TravelBudgetFX is a web application that assists travelers in estimating and
              optimizing costs by accounting for current and future currency exchange rates. Users will enter details of
              where they are traveling, when, and what their expected costs will be, then the application forecasts
              their total costs in a home currency as exchange rates change.
            </p>
          </div>
          <div className="card hover-lift">
            <h3 className="exp-header">
              Student Assistant - University Housing Office
              <span className="exp-logo rotate-on-hover">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-WvMHoLHLfkmmC3aUDmRcmgnbfYYaDsCowg&s"
                  alt="Housing Logo"
                />
              </span>
            </h3>
            <p>
              <strong>The University of Texas at Dallas | Part-time</strong>
            </p>
            <p>December 2024 to Present | 1 Year</p>
            <p>Richardson, Texas, United States | On-site</p>
            <p>
              As a Student Assistant in the University Housing Office at the University of Texas at Dallas, I provide
              front desk support, assist with administrative tasks, and handle incoming calls to address inquiries and
              resolve doubts from students and parents. My responsibilities include managing housing-related
              documentation, coordinating communications, and supporting events or activities.
            </p>
          </div>
        </div>
      </section>

      <section
        id="certifications"
        className={`section light animate-on-scroll ${isVisible["certifications"] ? "visible" : ""}`}
      >
        <div className="container">
          <h2 className="section-title">Licenses & Certifications</h2>
          <div className="card hover-lift">
            <h3 className="exp-header">
              Machine Learning with Python
              <span className="exp-logo pulse-logo">
                <img
                  src="https://www.gesi.org/wp-content/uploads/2024/08/purepng.com-ibm-logologobrand-logoiconslogos-251519939176ka7y8.png"
                  alt="IBM logo"
                />
              </span>
            </h3>
            <p>
              <img
                src="https://cdn-ildejnh.nitrocdn.com/NmgBpnnVABjmozYSTbZrHfYyZUokaGcV/assets/images/optimized/rev-959246b/www.langoly.com/wp-content/uploads/2021/09/coursera-logo.png"
                alt="Coursera Logo"
                style={{ width: "20px", height: "20px", verticalAlign: "middle", marginRight: "6px" }}
              />
              Coursera
            </p>
            <p>Issued by IBM | July 2025</p>
            <p>Credential ID: 1PJ6D4A6ECJ6</p>
          </div>
          <div className="card hover-lift">
            <h3 className="exp-header">
              Microsoft Python Programming Fundamentals
              <span className="exp-logo pulse-logo">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png"
                  alt="Microsoft logo"
                />
              </span>
            </h3>
            <p>
              <img
                src="https://cdn-ildejnh.nitrocdn.com/NmgBpnnVABjmozYSTbZrHfYyZUokaGcV/assets/images/optimized/rev-959246b/www.langoly.com/wp-content/uploads/2021/09/coursera-logo.png"
                alt="Coursera Logo"
                style={{ width: "20px", height: "20px", verticalAlign: "middle", marginRight: "6px" }}
              />
              Coursera
            </p>
            <p>Issued by Microsoft | June 2025</p>
            <p>Credential ID: N6J629RDEO5E</p>
          </div>
        </div>
      </section>

      <section id="skills" className={`section animate-on-scroll ${isVisible["skills"] ? "visible" : ""}`}>
        <div className="container">
          <h2 className="section-title">Core Skills</h2>
          <div className="skills-wrapper">
            <button className="scroll-btn left" onClick={() => scrollSkills("left")}>
              &#10094;
            </button>

            <div className="skills-scroll" id="skillsScroll">
              {[
                { name: "Python", img: "https://images.icon-icons.com/2699/PNG/512/python_logo_icon_168886.png" },
                { name: "C++", img: "https://cdn-icons-png.flaticon.com/512/6132/6132222.png" },
                { name: "SQL", img: "https://cdn-icons-png.flaticon.com/512/4299/4299956.png" },
                { name: "NumPy", img: "https://numpy.org/images/logo.svg" },
                { name: "Pandas", img: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Pandas_logo.svg" },
                { name: "Matplotlib", img: "https://matplotlib.org/_static/images/logo2.svg" },
                {
                  name: "Scikit Learn",
                  img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
                },
                {
                  name: "HTML",
                  img: "https://e7.pngegg.com/pngimages/410/100/png-clipart-web-development-html-responsive-web-design-logo-javascript-html-angle-web-design-thumbnail.png",
                },
                {
                  name: "Java",
                  img: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png",
                },
                { name: "CSS", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
                {
                  name: "JavaScript",
                  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/250px-Unofficial_JavaScript_logo_2.svg.png",
                },
              ].map((skill, index) => (
                <div key={skill.name} className="skill-card" style={{ animationDelay: `${index * 0.5}s` }}>
                  <img src={skill.img || "/placeholder.svg"} alt={`${skill.name} Logo`} />
                  <h3>{skill.name}</h3>
                </div>
              ))}
            </div>

            <button className="scroll-btn right" onClick={() => scrollSkills("right")}>
              &#10095;
            </button>
          </div>
        </div>
      </section>

      <section id="projects" className={`section animate-on-scroll ${isVisible["projects"] ? "visible" : ""}`}>
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <div className="card hover-lift project-card">
            <h3>Travel Budget FX - AIM Project</h3>
            <p>
              TravelBudgetFX is an AI-powered platform that simplifies travel budgeting and itinerary planning by
              combining real-time currency data, budget estimation, and personalized itineraries. I designed and
              implemented a Temporal Fusion Transformer (TFT) deep learning model to forecast foreign exchange trends.
              The model captures both short-term and long-term patterns in currency data. This enables more accurate
              budget predictions and helps travelers plan with greater financial confidence.
            </p>
          </div>
          <div className="card hover-lift project-card">
            <h3>Stock Price Forecast Project</h3>
            <p>
              Developed a full-stack web application that forecasts stock prices using an XGBoost Regressor machine
              learning model. Implemented a responsive interface allowing users to search stock symbols and view
              real-time prices, historical data, and 7-day forecasts. Built the backend with FastAPI to integrate
              financial data from Yahoo Finance and Finnhub APIs, while storing forecast results in a Supabase database.
              Designed the frontend with HTML, CSS, and JavaScript, including auto-suggestions and recently viewed
              stocks.
            </p>
            <div className="project-links">
              <a
                href="https://yugant20.github.io/stockpriceforecast/"
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                🚀 View Live Project
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="awards" className={`section light animate-on-scroll ${isVisible["awards"] ? "visible" : ""}`}>
        <div className="container">
          <h2 className="section-title">Honors & Awards</h2>
          <div className="card hover-lift award-card">
            <p>
              <strong>
                Krish Prabhu Opportunity Fund for the Jonsson School of Engineering and Computer Science Scholarship
              </strong>
            </p>
            <p>Issued by Erik Jonsson School of Engineering and Computer Science | May 2025</p>
            <p>Associated with The University of Texas at Dallas</p>
          </div>
          <div className="card hover-lift award-card">
            <p>
              <strong>Fall 2024 Dean&apos;s List</strong>
            </p>
            <p>Issued February 2025</p>
            <p>Associated with The University of Texas at Dallas</p>
          </div>
          <div className="card hover-lift award-card">
            <p>
              <strong>Academic Excellence Scholar</strong>
            </p>
            <p>Issued by The University of Texas at Dallas | August 2024</p>
          </div>
        </div>
      </section>

      <section id="contact" className={`section light animate-on-scroll ${isVisible["contact"] ? "visible" : ""}`}>
        <div className="container">
          <h2 className="section-title">Contact</h2>
          <div className="card" style={{ textAlign: "center", padding: "1.5rem" }}>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", marginTop: "1rem" }}
            >
              <a
                href="mailto:yugantjha20@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Email"
                className="contact-icon"
              >
                <i className="fas fa-envelope fa-2x"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/yugant-jha-274b59244/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="contact-icon"
              >
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
              <a
                href="https://github.com/Yugant20"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="contact-icon"
              >
                <i className="fab fa-github fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 Yugant Jha</p>
      </footer>
    </div>
  )
}
