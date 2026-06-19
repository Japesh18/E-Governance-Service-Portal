const DEMO_APPS=[
  {id:"APP-001",service:"Birth Certificate",date:"2006-05-18",status:"approved"},
  {id:"APP-002",service:"Income Certificate",date: "2025-07-05",status:"pending"},
  {id:"APP-003",service:"Ration Card",date: "2008-05-18",status:"rejected"},
  {id:"APP-004",service:"Driving License",date:"2022-11-10",status:"pending"},
];
export default function ApplicationList()
{
  return (
    <div>
      <p style={{color:"var(--muted)",marginBottom:20,fontSize:13}}>
        API:<code>GET/api/applications/mine/</code>
      </p>
      <table style={styles.table}>
        <thead>
          <tr>
            {["App ID","Service","Submitted On","Status"].map(h=>(
              <th key={h} style={styles.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DEMO_APPS.map(app=>(
            <tr key={app.id} style={styles.tr}>
              <td style={{...styles.td,fontFamily:"var(--mono)",color:"var(--accent)",fontSize:12}}>{app.id}</td>
              <td style={styles.td}>{app.service}</td>
              <td style={{...styles.td,color:"var(--muted)",fontSize:13}}>{app.date}</td>
              <td style={styles.td}>
                <span className={`badge badge-${app.status}`}>{app.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const styles={
table:{width:"100%",borderCollapse:"collapse",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,overflow:"hidden"},
th:{padding:"12px 18px",textAlign:"left",fontSize:11,color:"var(--muted)",textTransform:"uppercase",letterSpacing:"0.06em",borderBottom:"1px solid var(--border)"},
td:{padding:"14px 18px",fontSize:14,color:"var(--text)",borderBottom:"1px solid var(--border)"},
tr:{transition:"background 0.15s"},
};