import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-avatar">👨‍💻</div>
        <div className="hero-badge">
          <span className="dot"></span>
          Siswa Aktif · XI RPL 1
        </div>
        <h1 className="hero-name">
          Halo, Saya <span className="gradient-text">Wisnu Akbar Aridho</span>
        </h1>
        <p className="hero-role">Siswa SMKN 1 Purbalingga · Jurusan RPL</p>
        <p className="hero-bio">
          Saya adalah siswa kelas XI RPL 1 yang antusias dalam dunia web development.
          Senang membangun aplikasi dengan React, bereksperimen dengan teknologi baru,
          dan terus belajar hal-hal baru setiap hari.
        </p>
        <div className="hero-cta">
          <Link to="/experience" className="btn btn-primary">Lihat Pengalaman →</Link>
          <Link to="/about" className="btn btn-secondary">Tentang Saya</Link>
        </div>
      </section>

      {/* Skills */}
      <section className="section">
        <h2 className="section-title">Tech Stack</h2>
        <div className="skills-grid">
          {[
            { icon: '⚛', label: 'React', color: '#38bdf8' },
            { icon: '⚡', label: 'Vite', color: '#818cf8' },
            { icon: '🌐', label: 'JavaScript', color: '#fbbf24' },
            { icon: '🎨', label: 'CSS', color: '#34d399' },
            { icon: '🗃️', label: 'LocalStorage', color: '#f87171' },
            { icon: '🔗', label: 'REST API', color: '#fb923c' },
          ].map((skill) => (
            <div
              key={skill.label}
              className="skill-chip"
              style={{ borderColor: skill.color + '44', color: skill.color }}
            >
              <span>{skill.icon}</span>
              <span>{skill.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Nav */}
      <section className="section">
        <h2 className="section-title">Jelajahi Portfolio</h2>
        <div className="nav-cards">
          <Link to="/experience" className="nav-card">
            <div className="nav-card-icon" style={{ background: '#0c2a4a' }}>🏅</div>
            <div>
              <div className="nav-card-title">Experience</div>
              <div className="nav-card-sub">PKL, Lomba, Freelance, Ekskul</div>
            </div>
          </Link>
          <Link to="/project" className="nav-card">
            <div className="nav-card-icon" style={{ background: '#1a1a2e' }}>🚀</div>
            <div>
              <div className="nav-card-title">Project</div>
              <div className="nav-card-sub">Daftar project yang pernah dibuat</div>
            </div>
          </Link>
          <Link to="/about" className="nav-card">
            <div className="nav-card-icon" style={{ background: '#1a2e1a' }}>👤</div>
            <div>
              <div className="nav-card-title">About Me</div>
              <div className="nav-card-sub">Profil dan informasi kontak</div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
