function mostrarDashboard(link,titulo){

document.getElementById("visor").src=link;

document.getElementById("titulo").innerHTML=titulo;

}

const hoy=new Date();

document.getElementById("fecha").innerHTML=

hoy.toLocaleDateString("es-PE");
