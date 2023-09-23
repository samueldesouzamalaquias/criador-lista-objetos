//variáveis
const mainDiv = document.querySelector('#main-div');
const totParag = document.querySelector('#totParag');
let inputNome = document.querySelector('#inputNome');
let inputQuant = document.querySelector('#inputQuant');
let inputPreço = document.querySelector('#inputPreço');
const btAdicionar = document.querySelector('#btAdicionar');
const btLimpar = document.querySelector('#btLimpar');
let listaObj = [];

//style
document.querySelectorAll('input').forEach(input => input.style.marginBottom = '10px');
document.querySelectorAll('button').forEach(button => button.style.marginBottom = '20px');
inputQuant.style.width = '80px';
inputPreço.style.width = '80px';

btAdicionar.style.backgroundColor = 'green';
btAdicionar.style.color = 'white';

btLimpar.style.backgroundColor = 'red';
btLimpar.style.color = 'white';

mainDiv.style.backgroundColor = 'orange';

//eventos
btAdicionar.addEventListener('click',function(){
    criaListaObj();
    renderListaObj();
    updateTot();
    saveListaObj();
});

btLimpar.addEventListener('click', function(){
    mainDiv.innerHTML = '';
    listaObj = [];
    localStorage.clear();
    totParag.textContent = '';
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
    novoObj.quant = parseInt(inputQuant.value);
    novoObj.preço = parseFloat(inputPreço.value);
    novoObj.preçoTot = novoObj.quant * novoObj.preço;
    listaObj.push(novoObj);
    inputNome.value = '';
    inputQuant.value = '';
    inputPreço.value = '';
    mainDiv.innerHTML = '';
    return listaObj;
}

function renderListaObj(){
    for(let i=0; i<listaObj.length; i++){
    let novaDiv = `<div>${i+1}° ITEM - Nome: ${listaObj[i].nome}<br>
        Quant: ${listaObj[i].quant}<br>
        Preço un: R$${listaObj[i].preço} - Preço tot: R$${listaObj[i].preçoTot}<br>
        <button style="background-color: yellow"onclick="
          listaObj.splice(${i}, 1);
          mainDiv.innerHTML = '';
          updateTot();
          renderListaObj();
          saveListaObj();
        ">remover</button>
        <hr></div>`;
    mainDiv.innerHTML += novaDiv;
    }
}    

function removeItem(index){
    listaObj = listaObj.splice(index,1);
    renderListaObj();
}

function updateTot(){
    let soma = 0;
    for (obj of listaObj){
        soma+= parseFloat(obj.preçoTot);
        totParag.textContent = `Valor total dos itens: R$${soma}`;
    }
}

function saveListaObj(){
    localStorage.setItem('listaObj', JSON.stringify(listaObj));
}

updateTot();
