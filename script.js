const board=document.getElementById("board");
const pieces=["♜","♞","♝","♛","♚","♝","♞","♜","♟","♟","♟","♟","♟","♟","♟","♟","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","♟","♟","♟","♟","♟","♟","♟","♟","♜","♞","♝","♛","♚","♝","♞","♜"];
pieces.forEach((p,i)=>{const x=document.createElement("i");x.className=((Math.floor(i/8)+i)%2===0)?"light":"dark";x.textContent=p;board.appendChild(x)});
document.getElementById("menuBtn").onclick=()=>document.getElementById("nav").classList.toggle("open");

const KEY="pasilloReyV2";
const get=()=>JSON.parse(localStorage.getItem(KEY)||"[]");
const put=x=>localStorage.setItem(KEY,JSON.stringify(x));
const esc=x=>String(x??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));

document.getElementById("registrationForm").onsubmit=e=>{
 e.preventDefault(); const d=Object.fromEntries(new FormData(e.target).entries());
 d.estado="Pendiente"; d.fechaInscripcion=new Date().toLocaleDateString("es-PE");
 d.fechaVencimiento=""; d.whatsappAvisos=true; const a=get(); a.push(d); put(a);
 document.getElementById("regMsg").textContent="✓ Inscripción registrada. La academia confirmará el pago manualmente.";
 e.target.reset(); render();
};

function addMonths(date,n){const d=new Date(date);d.setMonth(d.getMonth()+n);return d.toISOString().slice(0,10)}
function activate(i){
 const a=get(), d=a[i], start=new Date(), months=d.plan==="Trimestral"?3:1;
 d.estado="Activo"; d.fechaPago=start.toISOString().slice(0,10); d.fechaVencimiento=addMonths(start,months); put(a); render();
}
function deactivate(i){const a=get();a[i].estado="Vencido";put(a);render()}
function whatsapp(i){
 const d=get()[i]; if(!d) return;
 const msg=`Hola ${d.nombre}. Tu membresía de la Academia de Ajedrez Pasillo del Rey está ${d.estado.toLowerCase()}. ${d.fechaVencimiento?`Vigencia hasta: ${d.fechaVencimiento}.`:''}`;
 const phone=d.telefono.replace(/\D/g,""); window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,"_blank");
}
function render(){
 const box=document.getElementById("students"),a=get();
 if(!a.length){box.innerHTML='<p class="muted">Todavía no hay alumnos registrados.</p>';return}
 box.innerHTML=a.map((d,i)=>`<div class="student ${d.estado==="Activo"?"active":""}">
 <h3>${i+1}. ${esc(d.nombre)}</h3><p>DNI: ${esc(d.dni)} · WhatsApp: ${esc(d.telefono)}<br>Nivel: ${esc(d.nivel)} · Plan: ${esc(d.plan)}<br>Estado: <span class="status">${esc(d.estado)}</span>${d.fechaVencimiento?` · Vence: ${esc(d.fechaVencimiento)}`:""}</p>
 ${d.estado==="Pendiente"?`<button class="btn gold" onclick="activate(${i})">✓ Confirmar pago y activar</button>`:""}
 ${d.estado==="Activo"?`<button class="btn" onclick="deactivate(${i})">Marcar vencido</button>`:""}
 <button class="btn" onclick="whatsapp(${i})">WhatsApp</button></div>`).join("");
}
document.getElementById("refresh").onclick=render;
document.getElementById("clear").onclick=()=>{if(confirm("¿Borrar todos los datos de prueba?")){localStorage.removeItem(KEY);render()}};
render();
