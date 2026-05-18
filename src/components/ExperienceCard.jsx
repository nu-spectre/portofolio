import './ExperienceCard.css'

const categoryColors = {
  PKL:            { bg: '#0c2a4a', color: '#38bdf8', label: '🏢 PKL' },
  Freelance:      { bg: '#1a1a2e', color: '#818cf8', label: '💼 Freelance' },
  Lomba:          { bg: '#1a2e1a', color: '#34d399', label: '🏆 Lomba' },
  Ekstrakurikuler:{ bg: '#2a1a0a', color: '#fbbf24', label: '⭐ Ekskul' },
}

function ExperienceCard({ item, onEdit, onDelete }) {
  const cat = categoryColors[item.kategori] || { bg: '#1e293b', color: '#94a3b8', label: item.kategori }

  return (
    <div className="exp-card">
      <div className="exp-card-header">
        <span
          className="badge"
          style={{ background: cat.bg, color: cat.color }}
        >
          {cat.label}
        </span>
        <span className="exp-year">{item.tahun}</span>
      </div>
      <h3 className="exp-title">{item.judul}</h3>
      <p className="exp-desc">{item.deskripsi}</p>
      {item.tempat && <p className="exp-place">📍 {item.tempat}</p>}
      <div className="exp-actions">
        <button className="btn btn-warning" onClick={() => onEdit(item.id)}>✏️ Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(item.id)}>🗑️ Hapus</button>
      </div>
    </div>
  )
}

export default ExperienceCard
