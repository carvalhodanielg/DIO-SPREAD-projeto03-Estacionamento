const registrar = document.querySelector<HTMLInputElement>("#registrar") //botão de registrar
const inputNome = document.querySelector<HTMLInputElement>("#input-nome") //input de nome
const inputPlaca = document.querySelector<HTMLInputElement>("#input-placa") //input de placa
const patio = document.querySelector("#patio") //tabela de pátio

interface Veiculo {
    nome: string;
    placa: string;
    entrada: Date | string;
}

function calcTempo (mil: number){

    const horas = Math.ceil(mil/3600000); //retorna o equivalente em horas inteiras, ex.: 1min => 1h; 30min => 1h; 59min => 1h; 61min => 2h;
    const totalSec = (mil/1000)
    const sec = Math.floor(totalSec%60)  
    const min = Math.floor(totalSec/60)

    return `no estacionamento por ${min} min e ${sec} segundos, resultando em ${horas} ${horas>1 ? 'horas' : 'hora'}.`
}

renderizar();

function adicionar (veiculo: Veiculo, salva?: boolean) {
    inputNome.value="";
    inputPlaca.value="";
    const newCar = document.createElement('tr')

    let data = new Date(veiculo.entrada)



    newCar.innerHTML = `
    <td>${veiculo.nome}</td>
    <td>${veiculo.placa}</td>
    <td>${data.getDay()+1}/${data.getMonth()+1}/${data.getFullYear()} às ${data.getHours()<10 ? "0"+ data.getHours():data.getHours() }:${data.getMinutes()<10? "0" + data.getMinutes():data.getMinutes()}</td>
    <td><button class="delete "data-placa="${veiculo.placa}">Remover</button"></td>
    `;

    newCar.querySelector(".delete")?.addEventListener('click', function(){
        remover(this.dataset.placa)
    })

    patio?.appendChild(newCar);

    if(salva) salvar([...ler(), veiculo])

}

function remover (placa: string) {
    const {entrada, nome} = ler().find(veiculo => veiculo.placa == placa);
    const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());

    if(!confirm(`O veículo ${nome} permaneceu por ${tempo}. Deseja encerrar?`)) return;

    salvar(ler().filter(veiculo => veiculo.placa !== placa))

    renderizar();
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
    let entrada: string = new Date().toISOString();

    console.log(`Nome: ${nome}; Placa: ${placa}`);
    console.log(new Date());
        
    adicionar({nome, placa, entrada}, true)

    
})
