import { Link } from "react-router-dom";
export default function RecipeGrid({ recipes }){
  const list = Array.isArray(recipes) ? recipes : [];
  return (
    <div style={{display:'grid',gap:16,gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))'}}>
      {list.map(r => (
        <article key={r.id} style={{border:'1px solid #ddd',borderRadius:12,padding:16}}>
          <h3 style={{margin:'0 0 4px 0'}}>{r.title}</h3>
          <div style={{opacity:.7,marginBottom:8}}>{r.type}{r.subtype ? ` — ${r.subtype}` : ""}</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:12}}>
            {(r.tags||[]).filter(t=>typeof t==='string').map(t => (
              <span key={t} style={{fontSize:12,border:'1px solid #ccc',borderRadius:999,padding:'2px 8px'}}>{t}</span>
            ))}
          </div>
          <Link to={`/recipe/${r.id}`}>View recipe →</Link>
        </article>
      ))}
    </div>
  );
}