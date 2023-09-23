//variáveis
const mainDiv = document.querySelector('#main-div');
let inputNome = document.querySelector('#inputNome');
let inputQuant = document.querySelector('#inputQuant');
let inputPreço = document.querySelector('#inputPreço');
const btAdicionar = document.querySelector('#btAdicionar');
const btLimpar = document.querySelector('#btLimpar');
let listaObj = [];

//style
document.querySelectorAll('input').forEach(input => input.style.marginBottom = '20px');
document.querySelectorAll('button').forEach(button => button.style.marginBottom = '10px');
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
    saveListaObj();
});

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
    for(let i=0; i<listaObj.length; i++){
    let novaDiv = `<div>${i+1}° ITEM - Nome: ${listaObj[i].nome}<br>
        Quant: ${listaObj[i].quant}<br>
        Preço: R$${listaObj[i].preço}<br>
        <button style="background-color: yellow "onclick="
          listaObj.splice(${i}, 1);
          mainDiv.innerHTML = '';
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

function saveListaObj(){
    localStorage.setItem('listaObj', JSON.stringify(listaObj));
}
