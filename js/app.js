const clientes = [
    {
        nombre: "Juan",
        nip: 2538,
        saldo: 2555.00
    },
    {
        nombre: "Jose",
        nip: 8938,
        saldo: 200.00
    },
    {
        nombre: "Julio",
        nip: 1007,
        saldo: 100.00
    },
    {
        nombre: "Pedro",
        nip: 8723,
        saldo: 98.00
    },
]

const $ = id => document.getElementById(id);
let cliente;
$("ingresarButton").addEventListener('click', function () {
    let nip = parseInt($('txtNip').value)
     cliente = obtenerClienteNip(nip);
    if(cliente){
        $('notificacion').style.display = "none";
        $("nip").style.display = "none";
        $("acciones").style.display = "flex";
    }else{
        
        $('notificacion').style.display = "block";

        $('notificacion').textContent = "El NIP NO ES VALIDO";
    }
})
$('btnSaldo').addEventListener('click',function(){
    if(cliente){
        $('clientes').innerHTML=`<p class='saldo'>Tu saldo dispobible es: ${cliente.saldo}</p>`;
    }
});
$('btnAddMonto').addEventListener('click',function(){

});

$('btnRetirar').addEventListener('click',function(){

});

const obtenerClienteNip = nip => clientes.find(cliente => cliente.nip == nip)