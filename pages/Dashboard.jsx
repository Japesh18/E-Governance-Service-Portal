import {useState} from "react";
import ServiceForm from "./ServiceForm.jsx";
import ApplicationList from "./ApplicationsList.jsx";
import AdminPanel from "./AdminPanel.jsx";
import OfficerPanel from "./OfficerPanel.jsx";
export default function Dashboard({user,onLogout})
{
  const [view,setView]=useState("home");
  const [notification,setNotification]=useState(null);
  const notify=(message,type="success")=>{
    setNotification({msg:message,type});
    setTimeout(()=>setNotification(null),3000);
  };
  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        <div style={styles.sideTop}>
          <div style={styles.brand}>🏛️ NationServe</div>
          <div style={styles.userBadge}>
            <span style={styles.avatar}>
              {user.role==="citizen"?"👤":user.role==="officer"?"🛡️":"⚙️"}
            </span>
            <div>
              <div style={styles.userName}>{user.name}</div>
              <div style={styles.userRole}>{user.role}</div>
            </div>
          </div>
        </div>
        <nav style={styles.nav}>
          {navItems(user.role).map(item=>(
            <button
              key={item.id}
              style={{ ...styles.navBtn,...(view===item.id?styles.navActive:{})}}
              onClick={()=>setView(item.id)}
            >
            {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <button style={styles.logoutBtn} onClick={onLogout}>←Logout</button>
      </aside>
      <main style={styles.main}>
        {notification && (
          <div style={{ ...styles.toast,background:notification.type==="success"?"#10b98133":"#ef444433",borderColor:notification.type==="success"?"#10b981":"#ef4444"}}>
            {notification.msg}
          </div>
        )}
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>{titleFor(view)}</h1>
          <div style={styles.tokenBadge}>
            🔐 <span style={{ fontFamily:"var(--mono)",fontSize:11}}>{user.token}</span>
          </div>
        </div>
        <div style={styles.content}>
          {view==="home" && <HomeView user={user} setView={setView}/>}
          {view==="apply" && <ServiceForm onNotify={notify}/>}
          {view==="my-apps" && <ApplicationList role="citizen"/>}
          {view==="officer" && <OfficerPanel onNotify={notify}/>}
          {view==="admin" && <AdminPanel onNotify={notify}/>}
        </div>
      </main>
    </div>
  );
}
function HomeView({user,setView })
{
  const cards=[
    {icon:"📄",title:"Apply for Service",sub:"Submit new government service requests",action:"apply",roles:["citizen"]},
    {icon:"📋",title:"My Applications",sub:"Track status of all your submissions",action:"my-apps",roles:["citizen"]},
    {icon:"🛡️",title:"Officer Dashboard",sub:"Review and approve pending requests",action:"officer",roles:["officer"]},
    {icon:"⚙️",title:"Admin Panel",sub:"Manage users, roles and services",action:"admin",roles:["admin"]},
  ].filter(c=>c.roles.includes(user.role));
  return (
    <div>
      <p style={{color:"var(--muted)",marginBottom:28}}>
        Welcome back, <strong style={{color:"#fff"}}>{user.name}</strong>. You are logged in as <strong style={{color:"var(--accent)"}}>{user.role}</strong>.
      </p>
      <div style={styles.cardGrid}>
        {cards.map(c=>(
          <div key={c.action} style={styles.infoCard} onClick={()=>setView(c.action)}>
            <div style={styles.cardIcon}>{c.icon}</div>
            <div style={styles.cardTitle}>{c.title}</div>
            <div style={styles.cardSub}>{c.sub}</div>
            <div style={styles.cardArrow}>Go→</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function navItems(role)
{
  const base=[{id:"home",icon:"🏠",label:"Home"}];
  if(role==="citizen")
    {
      return [...base,{ id:"apply",icon:"📄",label:"Apply for Service"},{id:"my-apps",icon:"📋",label:"My Applications"}];
    }
  if(role==="officer")
    {
      return [...base,{id:"officer",icon:"🛡️",label:"Officer Dashboard"}];
    }
  if(role==="admin")
    { return [...base,{id:"admin",icon:"⚙️",label:"Admin Panel"}];
    }
  return base;
}
function titleFor(view)
{
  return {home:"Dashboard",apply:"Apply for Service","my-apps":"My Applications",officer:"Officer Dashboard",admin:"Admin Panel"}[view]||"Dashboard";
}
const styles={
  layout:{display:"flex",minHeight:"100vh",background:"var(--bg)" },
  sidebar:{width:240,background:"var(--surface)",borderRight:"1px solid var(--border)",display:"flex",flexDirection:"column",padding:"24px 16px"},
  sideTop:{marginBottom:32},
  brand:{fontSize:16,fontWeight:700,color:"#fff",marginBottom:24},
  userBadge:{display:"flex",alignItems:"center",gap:10,padding:"12px",background:"var(--surface2)",borderRadius:10},
  avatar:{fontSize:24},
  userName:{fontSize:13,fontWeight:600,color:"#fff"},
  userRole:{fontSize:11,color:"var(--muted)",textTransform:"capitalize"},
  nav:{flex:1,display:"flex",flexDirection:"column",gap:4},
  navBtn:{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:8,background:"none",border:"none",color:"var(--muted)",fontSize:13,fontWeight:500,cursor:"pointer",justifyContent:"flex-start",width:"100%",transition:"all 0.15s"},
  navActive:{background:"#3b82f618",color:"var(--accent)"},
  logoutBtn:{padding:"10px 12px",borderRadius:8,background:"none",border:"1px solid var(--border)",color:"var(--muted)",fontSize:13,cursor:"pointer",marginTop:16},
  main:{flex:1,padding:"32px 40px",overflow:"auto"},
  header:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28},
  pageTitle:{fontSize:22,fontWeight:700,color:"#fff"},
  tokenBadge:{background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:8,padding:"6px 12px",color:"var(--muted)",fontSize:12},
  content:{},
  toast:{padding:"12px 18px",borderRadius:10,border:"1px solid",marginBottom:20,fontSize:14,fontWeight:600,backdropFilter:"blur(8px)"},
  cardGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:18},
  infoCard:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:24,cursor:"pointer",transition:"border 0.2s,box-shadow 0.2s"},
  cardIcon:{fontSize:30,marginBottom:12},
  cardTitle:{fontSize:15,fontWeight:700,color:"#fff",marginBottom:6},
  cardSub:{fontSize:12,color:"var(--muted)",lineHeight:1.5,marginBottom:16},
  cardArrow:{fontSize:12,color:"var(--accent)",fontWeight:700},
};