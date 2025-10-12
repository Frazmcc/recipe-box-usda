import { useMemo, useState } from "react";
import data from "@/data/recipe-box-export.json";
import RecipeGrid from "@/components/RecipeGrid.jsx";

export default function RecipesPage(){
  const recipes = Array.isArray(data) ? data : [];
  const [q, setQ] = useState("");
  const [tags, setTags] = useState([]);

  const ALL_TAGS = useMemo(() => (
    Array.from(new Set(recipes.flatMap(r => Array.isArray(r.tags) ? r.tags : [])))
      .filter(Boolean).map(String).sort()
  ), [recipes]);

  const filtered = recipes.filter(r => {
    const hay = [r.title, r.type, r.subtype, ...(r.tags||[])].filter(Boolean).join(" ").toLowerCase();
    const matches = q ? hay.includes(q.toLowerCase()) : true;
    const hasTags = tags.length ? tags.every(t => (r.tags||[]).map(x=>String(x).toLowerCase()).includes(t.toLowerCase())) : true;
    return matches && hasTags;
  });

  const toggle = (t) => setTags(prev => prev.includes(t) ? prev.filter(x=>x!==t) : [...prev, t]);

  return (
    <div style={{maxWidth:1000, margin:'40px auto', padding:'0 16px'}}>
      <h1 style={{marginTop:0}}>Recipes</h1>
      <div style={{display:'grid',gap:12, margin:'16px 0 24px 0'}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search title/type/tags…" style={{padding:10,borderRadius:8,border:'1px solid #ccc'}} />
        <div style={{display:'flex',gap:8, flexWrap:'wrap'}}>
          {ALL_TAGS.map(t => (
            <button key={t} onClick={()=>toggle(t)}
              style={{fontSize:12, border:'1px solid #bbb',borderRadius:999,padding:'4px 10px',
                      background: tags.includes(t) ? '#000' : '#fff',
                      color: tags.includes(t) ? '#fff' : '#000'}}>{t}</button>
          ))}
        </div>
        <div style={{opacity:.7, fontSize:14}}>{filtered.length} recipe{filtered.length!==1?"s":""}</div>
      </div>
      <RecipeGrid recipes={filtered} />
    </div>
  );
}