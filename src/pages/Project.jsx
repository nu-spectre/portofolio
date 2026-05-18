import { useState, useEffect } from 'react'
import './Project.css'

const STACK_OPTIONS = ['React', 'Vite', 'JavaScript', 'HTML', 'CSS', 'LocalStorage', 'Node.js', 'Bootstrap']
const STATUS_OPTIONS = ['selesai', 'proses']

const stackColors = {
  React: '#38bdf8',
  Vite: '#818cf8',
  CSS: '#34d399',
  JavaScript: '#fbbf24',
  HTML: '#f87171',
  LocalStorage: '#fb923c',
  'Node.js': '#4ade80',
  Bootstrap: '#a78bfa',
}

const emptyForm = { title: '', desc: '', stack: [], link: '', status: 'selesai' }

function ProjectCard({ p, onEdit, onDelete }) {
  const isSelesai = p.status === 'selesai'
  return (
    <div className="project-card card">
      <div className="project-card-top">
        <span className={`badge ${isSelesai ? 'badge-green' : 'badge-yellow'}`}>
          {isSelesai ? '✅ Selesai' : '🔄 Proses'}
        </span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {p.link && (
            <a href={p.link} target="_blank" rel="noreferrer" className="project-link-btn">
              🔗 Live
            </a>
          )}
          <button className="btn btn-warning" style={{ padding: '3px 10px', fontSize: '12px' }} onClick={() => onEdit(p.id)}>✏️</button>
          <button className="btn btn-danger" style={{ padding: '3px 10px', fontSize: '12px' }} onClick={() => onDelete(p.id)}>🗑️</button>
        </div>
      </div>
      <h3 className="project-title">{p.title}</h3>
      <p className="project-desc">{p.desc}</p>
      <div className="project-stack">
        {(p.stack || []).map(s => (
          <span key={s} className="stack-tag" style={{ color: stackColors[s] || '#94a3b8', borderColor: (stackColors[s] || '#94a3b8') + '44' }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

function Project() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('portfolio_projects')
    return saved ? JSON.parse(saved) : []
  })
  const [apiPosts, setApiPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tab, setTab] = useState('lokal')
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
      .then(res => res.json())
      .then(data => { setApiPosts(data); setLoading(false) })
      .catch(() => { setError('Gagal mengambil data dari API.'); setLoading(false) })
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function toggleStack(s) {
    setForm(f => ({
      ...f,
      stack: f.stack.includes(s) ? f.stack.filter(x => x !== s) : [...f.stack, s]
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title || !form.desc) {
      alert('Judul dan Deskripsi wajib diisi!')
      return
    }
    if (editId) {
      setProjects(projects.map(p => p.id === editId ? { ...p, ...form } : p))
      setEditId(null)
    } else {
      setProjects([...projects, { id: Date.now(), ...form }])
    }
    setForm(emptyForm)
    setShowForm(false)
  }

  function handleEdit(id) {
    const p = projects.find(x => x.id === id)
    setForm({ title: p.title, desc: p.desc, stack: p.stack || [], link: p.link || '', status: p.status })
    setEditId(id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleDelete(id) {
    if (confirm('Hapus project ini?')) {
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  function cancelForm() {
    setForm(emptyForm)
    setEditId(null)
    setShowForm(false)
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Project</h1>
          <p className="page-subtitle">Project yang pernah saya kerjakan</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => { cancelForm(); setShowForm(!showForm) }}>
            {showForm ? '✕ Batal' : '＋ Tambah'}
          </button>
          {projects.length > 0 && (
            <button className="btn btn-danger" onClick={() => { if (confirm('Hapus semua project?')) setProjects([]) }}>
              🗑️ Hapus Semua
            </button>
          )}
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="exp-form-card card">
          <h3 className="form-heading">{editId ? '✏️ Edit Project' : '＋ Tambah Project Baru'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group" style={{ flex: 2 }}>
                <label className="form-label">Nama Project *</label>
                <input name="title" value={form.title} onChange={handleChange}
                  className="form-input" placeholder="Contoh: Sistem Absensi Siswa" />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="form-input">
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s === 'selesai' ? '✅ Selesai' : '🔄 Proses'}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Deskripsi *</label>
              <textarea name="desc" value={form.desc} onChange={handleChange}
                className="form-input" placeholder="Ceritakan project kamu..." />
            </div>
            <div className="form-group">
              <label className="form-label">Link Live (opsional)</label>
              <input name="link" value={form.link} onChange={handleChange}
                className="form-input" placeholder="https://..." />
            </div>
            <div className="form-group">
              <label className="form-label">Tech Stack (pilih yang dipakai)</label>
              <div className="stack-picker">
                {STACK_OPTIONS.map(s => (
                  <button
                    key={s} type="button"
                    className={`stack-pick-btn ${form.stack.includes(s) ? 'selected' : ''}`}
                    style={form.stack.includes(s) ? { color: stackColors[s] || '#94a3b8', borderColor: stackColors[s] || '#94a3b8', background: (stackColors[s] || '#94a3b8') + '18' } : {}}
                    onClick={() => toggleStack(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary">
                {editId ? '💾 Simpan' : '＋ Tambah'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={cancelForm}>Batal</button>
            </div>
          </form>
        </div>
      )}

      {/* Tab */}
      <div className="tab-bar">
        <button className={`tab-btn ${tab === 'lokal' ? 'active' : ''}`} onClick={() => setTab('lokal')}>
          💻 Project Saya ({projects.length})
        </button>
        <button className={`tab-btn ${tab === 'api' ? 'active' : ''}`} onClick={() => setTab('api')}>
          🌐 Data dari API {!loading && !error && `(${apiPosts.length})`}
        </button>
      </div>

      {/* Lokal */}
      {tab === 'lokal' && (
        projects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🚀</div>
            <p>Belum ada project. Tambahkan projectmu!</p>
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>＋ Tambah Sekarang</button>
          </div>
        ) : (
          <div className="project-grid">
            {projects.map(p => <ProjectCard key={p.id} p={p} onEdit={handleEdit} onDelete={handleDelete} />)}
          </div>
        )
      )}

      {/* API */}
      {tab === 'api' && (
        <>
          <div className="api-info">
            <span className="api-badge">🔗 API</span>
            Data diambil dari <code>jsonplaceholder.typicode.com/posts</code>
          </div>
          {loading && <div className="loading-state"><div className="spinner"></div><p>Mengambil data...</p></div>}
          {error && <div className="error-bar">⚠️ {error}</div>}
          {!loading && !error && (
            <div className="project-grid">
              {apiPosts.map(post => (
                <div key={post.id} className="api-card card">
                  <div className="api-card-id">#{post.id}</div>
                  <h3 className="project-title" style={{ textTransform: 'capitalize', fontSize: '15px' }}>{post.title}</h3>
                  <p className="project-desc">{post.body.slice(0, 100)}...</p>
                  <div className="api-user">👤 User ID: {post.userId}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Project
