import {useState} from "react";
const USERS=[
  {id:1,name:"Avinav Saini",email:"avinavsaini@gmail.com",role:"citizen"},
  {id:2,name:"Rupesh Kumar",email:"rupeshkumar@gmail.com",role:"officer"},
  {id:3,name:"Krishna Sharma",email:"krishnasharma@gmail.com",role:"officer"},
  {id:4,name:"Japesh Sood",email:"japeshsood9@gmail.com",role:"admin"},
];
const STATS=[
  {label:"Total Applications",value:142,icon:"📄"},
  {label:"Approved",value:98,icon:"✅"},
  {label:"Pending",value: 31,icon:"⏳"},
  {label:"Rejected",value: 13,icon:"❌"},
];
export default function AdminPanel({onNotify})
{
  const [users,setUsers]=useState(USERS);
  const changeRole=(id,role)=>{
    setUsers(u =>u.map(x=>x.id===id?{...x,role}:x));
    onNotify(`User role updated to ${role}.`);
  };
  return (
    <div>
      <div style={styles.statsGrid}>
        {STATS.map(s=>(
          <div key={s.label} style={styles.statCard}>
            <div style={styles.statIcon}>{s.icon}</div>
            <div style={styles.statVal}>{s.value}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>
      <h3 style={{ color:"#fff",marginBottom:16,marginTop:28}}>User Management</h3>
      <p style={{color:"var(--muted)",marginBottom:16,fontSize:13 }}>
        API:<code>GET/api/users/</code>·<code>PATCH/api/users/&lt;id&gt;/</code>
      </p>
      <table style={styles.table}>
        <thead>
          <tr>
            {["Name","Email","Role","Change Role"].map(h=>(
              <th key={h} style={styles.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map(u=>(
            <tr key={u.id}>
              <td style={styles.td}>{u.name}</td>
              <td style={{ ...styles.td, color:"var(--muted)",fontSize:13}}>{u.email}</td>
              <td style={styles.td}>
                <span className={`badge badge-${u.role==="admin"?"approved":u.role==="officer"?"pending":"rejected"}`}>
                  {u.role}
                </span>
              </td>
              <td style={styles.td}>
                <select
                  value={u.role}
                  onChange={e=>changeRole(u.id,e.target.value)}
                  style={{width:"auto",padding:"6px 10px",fontSize:13}}
                >
                  <option value="citizen">Citizen</option>
                  <option value="officer">Officer</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const styles={
  statsGrid:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16},
  statCard:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:20,textAlign:"center"},
  statIcon:{fontSize:24,marginBottom:10},
  statVal:{fontSize:28,fontWeight:800,color:"#fff"},
  statLabel:{fontSize:12,color:"var(--muted)",marginTop:4},
  table:{width:"100%",borderCollapse:"collapse",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,overflow:"hidden"},
  th:{padding:"12px 18px",textAlign:"left",fontSize:11,color:"var(--muted)",textTransform:"uppercase",letterSpacing:"0.06em",borderBottom:"1px solid var(--border)"},
  td:{padding:"14px 18px",fontSize:14,color:"var(--text)",borderBottom:"1px solid var(--border)"},
};