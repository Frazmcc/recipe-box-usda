import { useParams, Link } from "react-router-dom";
import data from "@/data/recipe-box-export.json";
export default function RecipeDetail(){
  const recipes = Array.isArray(data) ? data : [];
  const { id } = useParams();
  const r = recipes.find(x => x.id === id);
  if(!r){
    return (<div style={{maxWidth:800, margin:'40px auto', padding:'0 16px'}}>
      <p>Recipe not found.</p><Link to='/recipes'>Back</Link></div>);
  }
  const ings = Array.isArray(r.ingredients) ? r.ingredients : [];
  const dirs = Array.isArray(r.directions) ? r.directions : [];
  return (
    <div style={{maxWidth:900, margin:'40px auto', padding:'0 16px'}}>
      <Link to='/recipes'>← Back</Link>
      <h1 style={{margin:'8px 0 4px 0'}}>{r.title}</h1>
      <div style={{opacity:.7, marginBottom:12}}>{r.type}{r.subtype ? ` — ${r.subtype}` : ""}</div>
      <div style={{display:'flex',gap:6,flexWrap:'wrap', marginBottom:16}}>
        {(r.tags||[]).filter(t=>typeof t==='string').map(t => (
          <span key={t} style={{fontSize:12,border:'1px solid #ccc',borderRadius:999,padding:'2px 8px'}}>{t}</span>
        ))}
      </div>
      <div style={{display:'grid', gap:24, gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))'}}>
        <section>
          <h3>Ingredients</h3>
          <ul style={{paddingLeft:18}}>
            {ings.map((ing,i)=>(<li key={i}><b>{String(ing.qty||"")}</b> {String(ing.item||"")}</li>))}
          </ul>
        </section>
        <section>
          <h3>Directions</h3>
          <ol style={{paddingLeft:18}}>
            {dirs.map((d,i)=>(<li key={i}>{String(d)}</li>))}
          </ol>
        </section>
      </div>
      {r.notes ? <p style={{opacity:.8, marginTop:16}}>{r.notes}</p> : null}
    </div>
  );
}