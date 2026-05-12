import { useEffect, useState } from 'react';

const observerThreshold = 0.1;

export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fadeElements = Array.from(document.querySelectorAll('.fade'));

    if (!('IntersectionObserver' in window)) {
      document.body.classList.add('no-intersection');
      fadeElements.forEach((el) => el.classList.add('show'));

      return () => {
        document.body.classList.remove('no-intersection');
        fadeElements.forEach((el) => el.classList.remove('show'));
      };
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: observerThreshold });

    fadeElements.forEach((el) => observer.observe(el));

    const footer = document.querySelector('.footer');
    if (footer && footer.getBoundingClientRect().top < window.innerHeight) {
      footer.classList.add('show');
    }

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <nav className={navScrolled ? 'scrolled' : ''}>
        <div className="nav">
          <div className="logo">MARIYA VARGHESE</div>
          <div>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <h1>
            <strong>Mariya Varghese</strong>
          </h1>
          <p>Creative Developer &amp; Student</p>
          <a href="#projects" className="btn">See My Work</a>
        </div>
      </section>

      <section id="about" className="about fade">
        <img src="/mariya-portrait.jpeg" alt="Portrait of Mariya Varghese" />
        <div>
          <h2>About Me</h2>
          <p>
            Enthusiastic IT student skilled in Python and web tech. Built a responsive portfolio website with HTML/CSS/JS and a simple Python calculator app. Experienced in Git, VS Code, and basic data analysis with Pandas. Eager to develop user-friendly apps and grow in software engineering.
          </p>
          <div className="skills">
            <span className="skill">HTML/CSS</span>
            <span className="skill">JavaScript</span>
          </div>
        </div>
      </section>

      <section id="projects" className="projects">
        <h2>Featured Projects</h2>
        <div className="card fade">
          <div className="card-img">
            <i className="fas fa-laptop-code" aria-hidden="true"></i>
          </div>
          <div className="card-content">
            <h3>Portfolio Site</h3>
            <p>Modern responsive portfolio with smooth animations where I showcase my own work.</p>
            <div className="tech">
              <span>HTML</span>
              <span>CSS</span>
              <span>JS</span>
            </div>
          </div>
        </div>
        <div className="card fade">
          <div className="card-img">
            <i className="fas fa-shopping-cart" aria-hidden="true"></i>
          </div>
          <div className="card-content">
            <h3>Cafe</h3>
            <p>Full-stack hotel login page with menu as my first internship project.</p>
            <div className="tech">
              <span>HTML</span>
              <span>CSS</span>
              <span>JS</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact fade">
        <div className="section-heading">
          <p>Connect</p>
          <h2>Let’s discuss job opportunities or project collaborations.</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <p>
              Based in Kerala, India · Available for relocation to Qatar.
              Comfortable working across GMT+03 and remote teams.
            </p>
            <div className="contact-links">
              <a href="tel:+91 85908 87567">+91 85908 87567</a>
              <a href="mailto:pvt.mariyah@gmail.com">pvt.mariyah@gmail.com</a>
              <a href="https://www.instagram.com/m_a_r_i_y_a__h?utm_source=qr&amp;igsh=MTdwZzlvMjBpZDVmOQ==">Instagram</a>
              <a href="https://www.linkedin.com/in/mariya-ah-806899395?utm_source=share_via&amp;utm_content=profile&amp;utm_medium=member_android">LinkedIn</a>
              <a href="https://github.com/Mariyah21">GitHub</a>
            </div>
          </div>
          <form id="contact-form">
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="you@example.com" />
            </label>
            <label>
              Topic
              <input type="text" name="topic" placeholder="Job opportunity, mentorship, etc." />
            </label>
            <label>
              Message
              <textarea name="message" placeholder="I’m excited to hear from you!"></textarea>
            </label>
            <button className="primary" type="submit">Send proposal</button>
          </form>
        </div>
      </section>

      <div className="cta-panel fade">
        <p>Ready to collaborate or chat about a job?</p>
        <button
          className="primary"
          type="button"
          onClick={() => {
            window.location.href = 'mailto:pvt.mariyah@gmail.com';
          }}
        >
          Reach out to Mariya
        </button>
      </div>

      <footer className="footer fade">
        <div className="footer-wrap">
          <div className="footer-brand">
            <h3>Mariya Varghese</h3>
            <p>Creative developer passionate about crafting human-centered digital experiences with clean, purposeful design.</p>
            <div className="footer-social">
              <a
                href="https://www.linkedin.com/in/mariya-ah-806899395?utm_source=share_via&amp;utm_content=profile&amp;utm_medium=member_android"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in" aria-hidden="true"></i>
              </a>
              <a href="https://github.com/Mariyah21" aria-label="GitHub">
                <i className="fab fa-github" aria-hidden="true"></i>
              </a>
              <a
                href="https://www.instagram.com/m_a_r_i_y_a__h?utm_source=qr&amp;igsh=MTdwZzlvMjBpZDVmOQ=="
                aria-label="Instagram"
              >
                <i className="fab fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <nav className="footer-nav">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
          <div>
            <h4>Say hello</h4>
            <div className="footer-contact">
              <a href="mailto:pvt.mariyah@gmail.com">pvt.mariyah@gmail.com</a>
              <a href="tel:+91 85908 87567">+91 85908 87567</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Mariya Varghese Studio · Developed with ❤️.</div>
      </footer>
    </>
  );
}
