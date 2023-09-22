//variáveis
const mainDiv = document.querySelector('#main-div');
let inputNome = document.querySelector('#inputNome');
let inputQuant = document.querySelector('#inputQuant');
let inputPreço = document.querySelector('#inputPreço');
const btAdicionar = document.querySelector('#btAdicionar');
const btLimpar = document.querySelector('#btLimpar');
const btRemover = document.querySelector('#btRemover');
let listaObj = [];

//style
document.querySelectorAll('input').forEach(input => input.style.marginBottom = '20px');
document.querySelectorAll('button').forEach(button => button.style.marginBottom = '10px');
inputQuant.style.width = '80px';
inputPreço.style.width = '80px';

btAdicionar.style.backgroundColor = 'green';
btAdicionar.style.color = 'white';

btRemover.style.backgroundColor = 'yellow';

btLimpar.style.backgroundColor = 'red';
btLimpar.style.color = 'white';

mainDiv.style.backgroundColor = 'orange';

//eventos
btAdicionar.addEventListener('click',function(){
    criaListaObj();
    renderListaObj();
    saveListaObj();
});

btRemover.addEventListener('click', function(){
    listaObj = listaObj.filter(obj => obj.nome !== inputNome.value);
    mainDiv.innerHTML = '';
    renderListaObj();
    saveListaObj();
    inputNome.value = '';
    inputQuant.value = '';
    inputPreço.value = '';
})

btLimpar.addEventListener('click', function(){
    mainDiv.innerHTML = '';
    listaObj = [];
    localStorage.clear();
})

//acessando localStorage
if(localStorage.getItem('listaObj')){
    listaObj = JSON.parse(localStorage.getItem('listaObj'));
}

renderListaObj();

//funções
function criaListaObj(){
    let novoObj = {};
    novoObj.nome = inputNome.value;
    novoObj.quant = inputQuant.value;
    novoObj.preço = inputPreço.value;
    listaObj.push(novoObj);
    inputNome.value = '';
    inputQuant.value = '';
    inputPreço.value = '';
    mainDiv.innerHTML = '';
    return listaObj;
}

function renderListaObj(){
    for(obj of listaObj){
    let novaDiv = `<div>${listaObj.indexOf(obj)+1}°ITEM<br>
        Nome: ${obj.nome}<br>
        Quant: ${obj.quant}<br>
        Preço: R$${obj.preço}<br>
        <hr></div>`;
    mainDiv.innerHTML += novaDiv;
    }
}    

function saveListaObj(){
    localStorage.setItem('listaObj', JSON.stringify(listaObj));
}
