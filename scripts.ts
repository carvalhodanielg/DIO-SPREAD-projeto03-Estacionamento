const registrar = document.querySelector<HTMLInputElement>("#registrar") //botão de registrar
const inputNome = document.querySelector<HTMLInputElement>("#input-nome") //input de nome
const inputPlaca = document.querySelector<HTMLInputElement>("#input-placa") //input de placa
const patio = document.querySelector("#patio") //tabela de pátio

interface Veiculo {
    nome: string;
    placa: string;
    entrada: string;
}

renderizar();

function adicionar (veiculo: Veiculo, salva?: boolean) {

    const newCar = document.createElement('tr')

    newCar.innerHTML = `
    <td>${veiculo.nome}</td>
    <td>${veiculo.placa}</td>
    <td>${veiculo.entrada}</td>
    <td><button class="delete "data-placa="${veiculo.placa}">X</button"></td>
    `

    patio?.appendChild(newCar);

    if(salva) salvar([...ler(), veiculo])

}

function remover () {

}

function ler ():Veiculo[] {
    return localStorage.patio ? JSON.parse(localStorage.patio) : [];
}

function salvar (veiculo: Veiculo[]) {
    localStorage.setItem("patio", JSON.stringify(veiculo));

}

function renderizar (){
    if(patio == null) return //Se não existir pátio, a função para aqui, isso acaba com o problema de chegar patio = null na linha abaixo;
    patio.innerHTML = "";
    const innerPatio = ler();
    if(innerPatio.length){
        innerPatio.forEach(veiculo => {
            adicionar(veiculo)
        });
    }
}



registrar?.addEventListener('click',()=>{
    console.log("add");
    if(inputNome?.value == "" || inputPlaca?.value ==""){
        alert("Erro!");
        return;
    }

    if(inputNome?.value == null || inputPlaca?.value == null) return;

    let nome: string = inputNome.value;
    let placa: string = inputPlaca.value;
    let entrada: string = new Date().toString();

    console.log(`Nome: ${nome}; Placa: ${placa}`);
    console.log(new Date());
        
    adicionar({nome, placa, entrada}, true)

    
})
