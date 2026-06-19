import {useState} from "react";
const INITIAL=[
  { id:"APP-002",citizen:"Rupesh Kumar",service:"Income Certificate",date:"2025-07-05",status:"pending"},
  { id:"APP-004",citizen:"Kshitij Dhamija",service:"Driving License",date:"2025-07-10",status:"pending"},
  { id:"APP-005",citizen:"Avinav Saini",service:"Scholarship Application",date:"2025-07-11",status:"pending"},
];
export default function OfficerPanel({onNotify})
{
  const [apps,setApps]=useState(INITIAL);
  const [remark,setRemark]=useState({});
  const update=(id,status)=>{
    setApps(a=>a.map(x=>x.id===id?{ ...x,status}:x));
    onNotify(`Application ${id} marked as ${status}.`);
  };
  return (
    <div>
      <p style={{color:"var(--muted)",marginBottom:20,fontSize:13}}>
        API:<code>GET/api/applications/?status=pending</code> · <code>PATCH /api/applications/&lt;id&gt;/</code>
      </p>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {apps.map(app=>(
          <div key={app.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <span style={styles.appId}>{app.id}</span>
                <span style={{...styles.badge,...(app.status==="pending"?styles.pending:app.status==="approved"?styles.approved:styles.rejected)}}>
                  {app.status}
                </span>
              </div>
              <span style={{color:"var(--muted)",fontSize:12}}>{app.date}</span>
            </div>
            <div style={styles.detail}><strong>Citizen:</strong>{app.citizen}</div>
            <div style={styles.detail}><strong>Service:</strong>{app.service}</div>
            <input
              placeholder="Add remark (optional)..."
              value={remark[app.id]||""}
              onChange={e=>setRemark(r=>({...r,[app.id]:e.target.value}))}
              style={{marginTop:12,marginBottom:12}}
            />
            {app.status==="pending" && (
              <div style={{display:"flex",gap:10}}>
                <button style={styles.approveBtn} onClick={()=>update(app.id,"approved")}>✓ Approve</button>
                <button style={styles.rejectBtn} onClick={()=>update(app.id,"rejected")}>✗ Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
const styles={
  card:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:22},
  cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12},
  appId:{fontFamily:"var(--mono)",fontSize:12,color:"var(--accent)",marginRight:10},
  badge:{display:"inline-block",padding:"2px 10px",borderRadius:999,fontSize:11,fontWeight:700},
  pending:{background:"#f59e0b22",color:"#f59e0b"},
  approved:{background:"#10b98122",color:"#10b981"},
  rejected:{background:"#ef444422",color:"#ef4444"},
  detail:{fontSize:14,color:"var(--text)",marginBottom:4},
  approveBtn:{padding:"8px 18px",borderRadius:8,background:"#10b98122",border:"1px solid #10b981",color:"#10b981",fontWeight:700,fontSize:13,cursor:"pointer"},
  rejectBtn:{padding:"8px 18px",borderRadius:8,background:"#ef444422",border:"1px solid #ef4444",color:"#ef4444",fontWeight:700,fontSize:13,cursor:"pointer"},
};