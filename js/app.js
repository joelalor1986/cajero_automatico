const clientes = [
    {
        nombre: "Juan",
        nip: 2538,
        saldo: 800.00
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
let cliente;
const maximoPermitido = 990;
const saldoMinimo = 10;
const $ = id => document.getElementById(id);

$("ingresarButton").addEventListener('click', function () {
    let nip = parseInt($('txtNip').value)
    cliente = obtenerClienteNip(nip);
    if (cliente) {
        $('notificacion').style.display = "none";
        $("nip").style.display = "none";
        $("acciones").style.display = "flex";
        $('datosClientes').innerHTML = `<p>Bienvenido : <span>${cliente.nombre}</span></p>`;
        $('datosClientes').style.display = 'block';

    } else {

        $('notificacion').style.display = "block";

        $('notificacion').textContent = "El NIP NO ES VALIDO";
        $('datosClientes').style.display = 'none';
    }
})
$('btnSaldo').addEventListener('click', function () {
    if (cliente) {
        $('clientes').innerHTML = `<p>Tu saldo dispobible es: <span>${cliente.saldo}</span></p>`;
    }
});
$('btnAddMonto').addEventListener('click', function () {
    $('clientes').innerHTML = `
        <form>
            <div class="campo">
                <label for="" class="label">Ingresa el monto:</label>
                <input type="number"  name="" id="monto" class="textbox">
            </div>
            <button class="ingresar boton" id="btnAgregarMonto" type="button">Agregar monto</button>
        </form>
    `
});

$('btnRetirar').addEventListener('click', function () {
    $('clientes').innerHTML = `
        <form>
            <div class="campo">
                <label for="" class="label">Ingresa el monto:</label>
                <input type="number"  name="" id="retiro" class="textbox">
            </div>
            <button class="ingresar boton" id="btnRetirarSaldo" type="button">Retirar monto</button>
        </form>
    `
});

$('clientes').addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {


        const buttonId = event.target.id; // Obtener el identificador del botón, si lo asignaste
        if (buttonId === 'btnAgregarMonto') {
            let montoIngresado = Number($('monto').value);
            let montoPermitido = 0;
            if (cliente.saldo + montoIngresado <= 990) {
                $('notificacion').style.display = "none";
                cliente.saldo += montoIngresado;
                $('clientes').innerHTML = `
                    <p>Monto ingresado: <span>${montoIngresado}</span>
                    <p>Tu nuevo saldo es: <span>${cliente.saldo}</span></p>
                `
            }
            else {
                $('notificacion').style.display = "block";
                montoPermitido = maximoPermitido - cliente.saldo;
                $('notificacion').textContent = `No puedes depositar ese monto ya que supera el maximo permitido (${maximoPermitido}), solo puedes depostiar esta cantidad ${montoPermitido} `;
            }
        }
        if (buttonId === 'btnRetirarSaldo') {
            $('notificacion').style.display = "none";
            let montoRetirado = Number($('retiro').value);
            let maximoRetiro = montoRetirado - (saldoMinimo+cliente.saldo);
            if (cliente.saldo - montoRetirado >= saldoMinimo) {
                cliente.saldo -= montoRetirado;
                $('clientes').innerHTML = `
                <p>Monto retirado: <span>${montoRetirado}</span></p>
                <p>Tu nuevo saldo es: <span>${cliente.saldo}</span></p>`
            }
            else{
                $('notificacion').style.display = "block";
                
                 $('notificacion').textContent = `No puedes retirar ese monto ya que tu saldo minimo debe ser (${saldoMinimo})`;
 
            }

        }


    }


});

const obtenerClienteNip = nip => clientes.find(cliente => cliente.nip == nip)