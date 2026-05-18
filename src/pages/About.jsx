import { useState } from 'react'
import './About.css'

function About() {
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [form, setForm] = useState({ name: '', from: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSend = (e) => {
    e.preventDefault()
    const { name, from, subject, message } = form
    if (!name || !from || !subject || !message) {
      setError('Semua kolom wajib diisi.')
      return
    }
    setError('')
    setSending(true)

    const mailto = `mailto:wisnubarakaa@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${subject} - dari ${name}`)}&body=${encodeURIComponent(`Nama: ${name}\nEmail: ${from}\n\n${message}`)}`
    window.location.href = mailto

    setTimeout(() => {
      setSending(false)
      setSent(true)
      setForm({ name: '', from: '', subject: '', message: '' })
    }, 800)
  }

  const closeModal = () => {
    setShowEmailModal(false)
    setSent(false)
    setError('')
    setForm({ name: '', from: '', subject: '', message: '' })
  }

  return (
    <div className="page">
      <h1 className="page-title">About Me</h1>
      <p className="page-subtitle">Kenalan lebih dekat dengan saya</p>

      <div className="about-layout">
        {/* Profile card */}
        <div className="profile-card card">
          <div className="profile-avatar">👨‍💻</div>
          <h2 className="profile-name">Wisnu Akbar Aridho</h2>
          <p className="profile-role">Siswa SMK · Jurusan RPL · Kelas XI RPL 1</p>
          <div className="profile-divider" />
          <div className="profile-info-list">
            <div className="profile-info-item">
              <span className="info-icon">🏫</span>
              <span>SMK Negeri 1 Purbalingga</span>
            </div>
            <div className="profile-info-item">
              <span className="info-icon">📍</span>
              <span>Kembaran RT09/RW01, Kec. Kembaran, Kab. Banyumas</span>
            </div>
            <div className="profile-info-item">
              <span className="info-icon">📧</span>
              <span>wisnubarakaa@gmail.com</span>
            </div>
            <div className="profile-info-item">
              <span className="info-icon">📱</span>
              <span>089612345678</span>
            </div>
          </div>

          <div className="profile-socials">
            <a
              href="https://github.com/nu-spectre"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              style={{ background: '#1c2a3a', color: '#38bdf8' }}
            >
              GitHub
            </a>
            <a
              href="https://instagram.com/akbauruu16"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              style={{ background: '#1a2a20', color: '#34d399' }}
            >
              Instagram
            </a>
          </div>

          <div className="profile-divider" />

          <button className="email-btn" onClick={() => setShowEmailModal(true)}>
            ✉️ Kirim Pesan
          </button>
        </div>

        {/* Bio + Skills */}
        <div className="about-right">
          <div className="card" style={{ marginBottom: '16px' }}>
            <h3 className="about-section-title">👋 Halo!</h3>
            <p className="about-bio">
              Saya Wisnu Akbar Aridho, siswa kelas XI RPL 1 di SMK Negeri 1 Purbalingga,
              Jurusan Rekayasa Perangkat Lunak (RPL). Saya memiliki ketertarikan besar
              di bidang web development, khususnya menggunakan React dan JavaScript modern.
            </p>
            <p className="about-bio">
              Saat ini saya sedang aktif belajar berbagai teknologi web, mengerjakan
              berbagai project pribadi untuk mengasah kemampuan coding saya.
            </p>
            <p className="about-bio">
              Tujuan saya adalah menjadi web developer profesional dan berkontribusi
              dalam membangun produk digital yang bermanfaat bagi masyarakat.
            </p>
          </div>

          <div className="card" style={{ marginBottom: '16px' }}>
            <h3 className="about-section-title">🛠️ Kemampuan</h3>
            <div className="skills-list">
              {[
                { label: 'React + Vite', level: 80 },
                { label: 'JavaScript', level: 75 },
                { label: 'HTML & CSS', level: 90 },
                { label: 'Git & GitHub', level: 65 },
                { label: 'REST API', level: 70 },
              ].map(skill => (
                <div key={skill.label} className="skill-bar">
                  <div className="skill-bar-label">
                    <span>{skill.label}</span>
                    <span style={{ color: 'var(--text3)', fontSize: '12px' }}>{skill.level}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="about-section-title">🎓 Riwayat Pendidikan</h3>
            <div className="edu-item">
              <div className="edu-dot" />
              <div>
                <div className="edu-school">SMK Negeri 1 Purbalingga</div>
                <div className="edu-detail">Rekayasa Perangkat Lunak (RPL) · Kelas XI RPL 1 · Sedang Berjalan</div>
              </div>
            </div>
            <div className="edu-item">
              <div className="edu-dot" />
              <div>
                <div className="edu-school">SMP Negeri 1 Kembaran</div>
                <div className="edu-detail">Lulus</div>
              </div>
            </div>
            <div className="edu-item">
              <div className="edu-dot" />
              <div>
                <div className="edu-school">SD Negeri 1 Purbadana</div>
                <div className="edu-detail">Lulus</div>
              </div>
            </div>
            <div className="edu-item">
              <div className="edu-dot" />
              <div>
                <div className="edu-school">TK Pertiwi Purbadana</div>
                <div className="edu-detail">Lulus</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <h2 className="modal-title">✉️ Kirim Pesan</h2>
            <p className="modal-subtitle">Pesan akan dikirim ke wisnubarakaa@gmail.com</p>

            {sent ? (
              <div className="modal-success">
                <div className="success-icon">✅</div>
                <p>Email client terbuka! Silakan kirim pesan dari aplikasi emailmu.</p>
                <button className="email-btn" onClick={closeModal}>Tutup</button>
              </div>
            ) : (
              <div className="email-form">
                <div className="form-group">
                  <label>Nama kamu</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Contoh: Budi Santoso"
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label>Email kamu</label>
                  <input
                    name="from"
                    type="email"
                    value={form.from}
                    onChange={handleChange}
                    placeholder="email@kamu.com"
                  />
                </div>
                <div className="form-group">
                  <label>Subjek</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Topik pesan"
                  />
                </div>
                <div className="form-group">
                  <label>Pesan</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tulis pesanmu di sini..."
                    rows={4}
                  />
                </div>
                {error && <p className="form-error">{error}</p>}
                <button className="email-btn" onClick={handleSend} disabled={sending}>
                  {sending ? 'Membuka email...' : '🚀 Kirim Sekarang'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default About
