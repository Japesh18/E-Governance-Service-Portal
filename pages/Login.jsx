import {useState} from "react";
const DEMO_USERS={
  citizen:{role:"citizen",name:"Avinav Saini"},
  officer:{role:"officer",name:"Krishna Sharma"},
  admin:{ role:"admin",name:"Japesh Sood" },
};
export default function Login({onLogin})
{
  const [selected,setSelected]=useState("citizen");
  const [loading,setLoading]=useState(false);
  const handleLogin=()=>{
    setLoading(true);
    setTimeout(()=>{
      onLogin({ ...DEMO_USERS[selected],token:"demo-jwt-token"});
      setLoading(false);
    },900);
  };
  const handleSSO=()=>{window.location.href="http://localhost:8000/api/auth/social/login/google-oauth2/"};
  return (
    <div style={styles.page}>
      <div style={styles.grid}/>
      <div style={styles.card}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🏛️</span>
          <div>
            <div style={styles.logoTitle}>NationServe</div>
            <div style={styles.logoSub}>E-Governance Portal</div>
          </div>
        </div>
        <div style={styles.ssoBtn} onClick={handleSSO}>
          <span style={{fontSize:18}}>G</span>
          &nbsp; Continue with Google (SSO / OAuth 2.0)
        </div>
        <div style={styles.divider}><span>or sign in as demo role</span></div>
        <div style={styles.roleGroup}>
          {["citizen","officer","admin"].map(r=>(
            <button
              key={r}
              style={{...styles.roleBtn,...(selected===r?styles.roleBtnActive:{})}}
              onClick={()=>setSelected(r)}
            >
              {r==="citizen"?"👤":r==="officer"?"🛡️":"⚙️"} {r.charAt(0).toUpperCase()+r.slice(1)}
            </button>
          ))}
        </div>
        <button style={styles.loginBtn} onClick={handleLogin} disabled={loading}>
          {loading?"Authenticating…":"Sign In→"}
        </button>
        <p style={styles.hint}>
          OAuth 2.0 · Role-based access · Encrypted session
        </p>
      </div>
    </div>
  );
}
const styles={
  page:{
    minHeight:"100vh",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    background:"var(--bg)",
    position:"relative",
    overflow:"hidden",
  },
  grid:{
    position:"absolute",inset:0,
    backgroundImage:"linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)",
    backgroundSize:"40px 40px",
    opacity:0.35,
  },
  card:{
    background:"var(--surface)",
    border:"1px solid var(--border)",
    borderRadius:18,
    padding:"42px 40px",
    width:420,
    maxWidth:"95vw",
    position:"relative",
    zIndex:1,
    boxShadow:"0 0 60px  #3b82f618",
  },
  logo:{display:"flex",alignItems:"center",gap:14,marginBottom:32},
  logoIcon:{fontSize:38},
  logoTitle:{fontSize:20,fontWeight:700,color:"#fff"},
  logoSub:{fontSize:12,color:"var(--muted)",marginTop:2},
  ssoBtn:{
    display:"flex",alignItems:"center",justifyContent:"center",
    gap:8,padding:"12px 0",borderRadius:10,
    border:"1px solid var(--border)",background:"var(--surface2)",
    color:"var(--text)",fontSize:14,fontWeight:600,
    cursor:"pointer",marginBottom:20,transition:"border 0.2s",
  },
  divider:{
    display:"flex",alignItems:"center",gap:10,
    color:"var(--muted)",fontSize:12,marginBottom:20,
    "::before":{content:'""',flex:1,height:1,background:"var(--border)"},
  },
  roleGroup:{display:"flex",gap:8,marginBottom:20},
  roleBtn:{
    flex:1,padding:"10px 4px",borderRadius:8,
    background:"var(--surface2)",border:"1px solid var(--border)",
    color:"var(--muted)",fontSize:12,fontWeight:600,
    cursor:"pointer",transition:"all 0.15s",
  },
  roleBtnActive:{
    background:"#3b82f618",border:"1px solid var(--accent)",
    color:"var(--accent)",
  },
  loginBtn:{
    width:"100%",padding:"13px 0",borderRadius:10,
    background:"var(--accent)",color:"#fff",
    fontSize:15,fontWeight:700,letterSpacing:"0.03em",
    marginBottom:16,transition:"opacity 0.2s",
  },
  hint:{textAlign:"center",fontSize:11,color:"var(--muted)",letterSpacing:"0.04em"},
};