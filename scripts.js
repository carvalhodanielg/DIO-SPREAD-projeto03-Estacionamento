var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var registrar = document.querySelector("#registrar"); //botão de registrar
var inputNome = document.querySelector("#input-nome"); //input de nome
var inputPlaca = document.querySelector("#input-placa"); //input de placa
var patio = document.querySelector("#patio"); //tabela de pátio
function calcTempo(mil) {
    var horas = Math.ceil(mil / 3600000); //retorna o equivalente em horas inteiras, ex.: 1min => 1h; 30min => 1h; 59min => 1h; 61min => 2h;
    var totalSec = (mil / 1000);
    var sec = Math.floor(totalSec % 60);
    var min = Math.floor(totalSec / 60);
    return "no estacionamento por ".concat(min, " min e ").concat(sec, " segundos, resultando em ").concat(horas, " ").concat(horas > 1 ? 'horas' : 'hora', ".");
    if (min < 60) {
        return "no estacionamento por ".concat(min, " min e ").concat(sec, " segundos, resultando em ").concat(horas, " ").concat(horas > 1 ? 'horas' : 'hora', ".");
    }
    else {
        return "no estacionamento ".concat(horas, " horas.");
    }
}
renderizar();
function adicionar(veiculo, salva) {
    var _a;
    inputNome.value = "";
    inputPlaca.value = "";
    var newCar = document.createElement('tr');
    var data = new Date(veiculo.entrada);
    newCar.innerHTML = "\n    <td>".concat(veiculo.nome, "</td>\n    <td>").concat(veiculo.placa, "</td>\n    <td>").concat(data.getDay() + 1, "/").concat(data.getMonth() + 1, "/").concat(data.getFullYear(), " \u00E0s ").concat(data.getHours() < 10 ? "0" + data.getHours() : data.getHours(), ":").concat(data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes(), "</td>\n    <td><button class=\"delete \"data-placa=\"").concat(veiculo.placa, "\">Remover</button\"></td>\n    ");
    (_a = newCar.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        remover(this.dataset.placa);
    });
    patio === null || patio === void 0 ? void 0 : patio.appendChild(newCar);
    if (salva)
        salvar(__spreadArray(__spreadArray([], ler(), true), [veiculo], false));
}
function remover(placa) {
    var _a = ler().find(function (veiculo) { return veiculo.placa == placa; }), entrada = _a.entrada, nome = _a.nome;
    var tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
    if (!confirm("O ve\u00EDculo ".concat(nome, " permaneceu por ").concat(tempo, ". Deseja encerrar?")))
        return;
    salvar(ler().filter(function (veiculo) { return veiculo.placa !== placa; }));
    renderizar();
}
function ler() {
    return localStorage.patio ? JSON.parse(localStorage.patio) : [];
}
function salvar(veiculo) {
    localStorage.setItem("patio", JSON.stringify(veiculo));
}
function renderizar() {
    if (patio == null)
        return; //Se não existir pátio, a função para aqui, isso acaba com o problema de chegar patio = null na linha abaixo;
    patio.innerHTML = "";
    var innerPatio = ler();
    if (innerPatio.length) {
        innerPatio.forEach(function (veiculo) {
            adicionar(veiculo);
        });
    }
}
registrar === null || registrar === void 0 ? void 0 : registrar.addEventListener('click', function () {
    console.log("add");
    if ((inputNome === null || inputNome === void 0 ? void 0 : inputNome.value) == "" || (inputPlaca === null || inputPlaca === void 0 ? void 0 : inputPlaca.value) == "") {
        alert("Erro!");
        return;
    }
    if ((inputNome === null || inputNome === void 0 ? void 0 : inputNome.value) == null || (inputPlaca === null || inputPlaca === void 0 ? void 0 : inputPlaca.value) == null)
        return;
    var nome = inputNome.value;
    var placa = inputPlaca.value;
    var entrada = new Date().toISOString();
    console.log("Nome: ".concat(nome, "; Placa: ").concat(placa));
    console.log(new Date());
    adicionar({ nome: nome, placa: placa, entrada: entrada }, true);
});
