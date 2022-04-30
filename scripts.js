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
function adicionar(veiculo) {
    var newCar = document.createElement('tr');
    newCar.innerHTML = "\n    <td>".concat(veiculo.nome, "</td>\n    <td>").concat(veiculo.placa, "</td>\n    <td>").concat(veiculo.entrada, "</td>\n    <td><button class=\"delete \"data-placa=\"").concat(veiculo.placa, "\">X</button\"></td>\n    ");
    patio === null || patio === void 0 ? void 0 : patio.appendChild(newCar);
    salvar(__spreadArray(__spreadArray([], ler(), true), [veiculo], false));
}
function remover() {
}
function ler() {
    return localStorage.patio ? JSON.parse(localStorage.patio) : [];
}
function salvar(veiculo) {
    localStorage.setItem("patio", JSON.stringify(veiculo));
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
    var entrada = new Date().toString();
    console.log("Nome: ".concat(nome, "; Placa: ").concat(placa));
    console.log(new Date());
    adicionar({ nome: nome, placa: placa, entrada: entrada });
});
