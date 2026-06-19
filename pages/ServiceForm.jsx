import {useState} from "react";
const SERVICES=["Birth Certificate","Income Certificate","Domicile Certificate","Ration Card","Voter ID Update","Driving License Renewal","Property Registration","Scholarship Application"];
export default function ServiceForm({onNotify})
{
  const [form,setForm]=useState({service:"",description:"",file:null});
  const [submitting,setSubmitting]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const handleSubmit=()=>{
    if(!form.service)
      {
        onNotify("Please select a service type.","error");
        return;
      }
    setSubmitting(true);
    setTimeout(()=>{
      setSubmitting(false);
      setSubmitted(true);
      onNotify("✅ Application submitted successfully!");
    },1200);
  };
  if(submitted)
    {
      return (
      <div style={styles.success}>
        <div style={{ fontSize: 48 }}>🎉</div>
        <h2 style={{ color: "#fff", margin: "12px 0 8px" }}>Application Submitted!</h2>
        <p style={{ color: "var(--muted)" }}>Your application ID: <strong style={{ fontFamily: "var(--mono)", color: "var(--accent)" }}>APP-{Date.now().toString().slice(-6)}</strong></p>
        <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 8 }}>You will receive notifications via email as your application is processed.</p>
        <button style={styles.backBtn} onClick={() => { setSubmitted(false); setForm({ service: "", description: "", file: null }); }}>
          Submit Another
        </button>
      </div>
            );
  }
  return (
    <div style={styles.form}>
      <div style={styles.field}>
        <label>Service Type</label>
        <select value={form.service} onChange={e=>set("service",e.target.value)}>
          <option value="">—Select a service—</option>
          {SERVICES.map(s=><option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div style={styles.field}>
        <label>Description/Purpose</label>
        <textarea
          rows={4}
          placeholder="Briefly describe your requirement..."
          value={form.description}
          onChange={e=>set("description",e.target.value)}
          style={{resize:"vertical"}}
        />
      </div>
      <div style={styles.field}>
        <label>Upload Supporting Document</label>
        <div style={styles.upload}>
          <input type="file" id="doc" style={{display:"none"}} onChange={e=>set("file",e.target.files[0])}/>
          <label htmlFor="doc" style={styles.uploadLabel}>
            {form.file?`📎 ${form.file.name}`:"📂 Click to upload PDF/Image"}
          </label>
        </div>
      </div>
      <button style={styles.submitBtn} onClick={handleSubmit} disabled={submitting}>
        {submitting?"Submitting…":"Submit Application→"}
      </button>
      <p style={{fontSize:11,color:"var(--muted)",marginTop:12}}>
        API Endpoint:<code>POST /api/applications/</code> · Authenticated via Bearer JWT
      </p>
    </div>
  );
}
const styles={
  form:{maxWidth:560,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:16,padding:32},
  field:{marginBottom:20},
  upload:{},
  uploadLabel:{display:"block",padding:"16px",border:"1px dashed var(--border)",borderRadius:10,textAlign:"center",color:"var(--muted)",cursor:"pointer",fontSize:14,transition:"border 0.2s"},
  submitBtn:{width:"100%",padding:"13px 0",borderRadius:10,background:"var(--accent)",color:"#fff",fontSize:15,fontWeight:700,marginTop:8,transition:"opacity 0.2s"},
  success:{textAlign:"center",padding:"60px 20px"},
  backBtn:{marginTop:24,padding:"10px 24px",borderRadius:8,background:"var(--surface2)",border:"1px solid var(--border)",color:"var(--text)",fontSize:14,cursor:"pointer"},
};