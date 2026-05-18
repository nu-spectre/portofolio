import { useState, useEffect } from 'react'
import ExperienceCard from '../components/ExperienceCard'
import './Experience.css'

const KATEGORI = ['PKL', 'Freelance', 'Lomba', 'Ekstrakurikuler']

function Experience() {
  const [daftarExp, setDaftarExp] = useState(() => {
    const saved = localStorage.getItem('portfolio_experience')
    return saved ? JSON.parse(saved) : []
  })

  const [form, setForm] = useState({ judul: '', kategori: 'PKL', tahun: '', tempat: '', deskripsi: '' })
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [filterKat, setFilterKat] = useState('Semua')

  useEffect(() => {
    localStorage.setItem('portfolio_experience', JSON.stringify(daftarExp))
  }, [daftarExp])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.judul || !form.tahun || !form.deskripsi) {
      alert('Judul, Tahun, dan Deskripsi wajib diisi!')
      return
    }

    if (editId) {
      setDaftarExp(daftarExp.map(item =>
        item.id === editId ? { ...item, ...form } : item
      ))
      setEditId(null)
    } else {
      setDaftarExp([...daftarExp, { id: Date.now(), ...form }])
    }

    setForm({ judul: '', kategori: 'PKL', tahun: '', tempat: '', deskripsi: '' })
    setShowForm(false)
  }

  function handleEdit(id) {
    const item = daftarExp.find(x => x.id === id)
    setForm({ judul: item.judul, kategori: item.kategori, tahun: item.tahun, tempat: item.tempat, deskripsi: item.deskripsi })
    setEditId(id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleDelete(id) {
    if (confirm('Hapus pengalaman ini?')) {
      setDaftarExp(daftarExp.filter(item => item.id !== id))
    }
  }

  function handleHapusSemua() {
    if (confirm('Hapus SEMUA pengalaman?')) {
      setDaftarExp([])
    }
  }

  function cancelForm() {
    setForm({ judul: '', kategori: 'PKL', tahun: '', tempat: '', deskripsi: '' })
    setEditId(null)
    setShowForm(false)
  }

  const filtered = filterKat === 'Semua' ? daftarExp : daftarExp.filter(x => x.kategori === filterKat)

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Experience</h1>
          <p className="page-subtitle">
            Kumpulan pengalaman saya dalam PKL, Lomba, Freelance, dan Ekskul
          </p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => { cancelForm(); setShowForm(!showForm) }}>
            {showForm ? '✕ Batal' : '＋ Tambah'}
          </button>
          {daftarExp.length > 0 && (
            <button className="btn btn-danger" onClick={handleHapusSemua}>🗑️ Hapus Semua</button>
          )}
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="exp-form-card card">
          <h3 className="form-heading">{editId ? '✏️ Edit Pengalaman' : '＋ Tambah Pengalaman Baru'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group" style={{ flex: 2 }}>
                <label className="form-label">Judul *</label>
                <input name="judul" value={form.judul} onChange={handleChange}
                  className="form-input" placeholder="Contoh: PKL di PT. ABC" />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Tahun *</label>
                <input name="tahun" value={form.tahun} onChange={handleChange}
                  className="form-input" placeholder="2024" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Kategori</label>
                <select name="kategori" value={form.kategori} onChange={handleChange} className="form-input">
                  {KATEGORI.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ flex: 2 }}>
                <label className="form-label">Tempat</label>
                <input name="tempat" value={form.tempat} onChange={handleChange}
                  className="form-input" placeholder="Nama perusahaan / sekolah / kota" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Deskripsi *</label>
              <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange}
                className="form-input" placeholder="Ceritakan pengalaman kamu..." />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary">
                {editId ? '💾 Simpan Perubahan' : '＋ Tambah'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={cancelForm}>
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter */}
      <div className="filter-bar">
        {['Semua', ...KATEGORI].map(k => (
          <button
            key={k}
            className={`filter-btn ${filterKat === k ? 'active' : ''}`}
            onClick={() => setFilterKat(k)}
          >
            {k} {k !== 'Semua' && <span className="filter-count">{daftarExp.filter(x => x.kategori === k).length}</span>}
          </button>
        ))}
      </div>

      {daftarExp.length > 5 && (
        <div className="warning-bar">
          ⚠️ Kamu sudah memiliki banyak pengalaman! ({daftarExp.length} total)
        </div>
      )}

      {/* List */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📂</div>
          <p>Belum ada pengalaman di kategori ini. Tambahkan pengalamanmu!</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>＋ Tambah Sekarang</button>
        </div>
      ) : (
        <div className="exp-grid">
          {filtered.map(item => (
            <ExperienceCard key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Experience
