//variáveis
const mainDiv = document.querySelector('#main-div');
const totParag = document.querySelector('#totParag');
let inputNome = document.querySelector('#inputNome');
let inputQuant = document.querySelector('#inputQuant');
let inputPreço = document.querySelector('#inputPreço');
const btAdicionar = document.querySelector('#btAdicionar');
const btLimpar = document.querySelector('#btLimpar');
const btOrganizar = document.querySelector('#btOrganizar');
let listaObj = [];

//style
const buttons = document.querySelectorAll('button')
document.querySelectorAll('input').forEach(input => input.style.marginBottom = '10px');
document.querySelectorAll('button').forEach(button => button.style.marginBottom = '20px');
inputQuant.style.width = '55px';
inputPeso.style.width = '55px';
inputPreço.style.width = '55px';
buttons.forEach(function(button){
    button.style.width = '90px'
    button.style.height = '30px'
    button.style.marginRight = '30px'
})

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


btOrganizar.addEventListener('click',
function(){
    organizarListaObj()
})


//acessando localStorage
if(localStorage.getItem('listaObj')){
    listaObj = JSON.parse(localStorage.getItem('listaObj'));
}

renderListaObj();

//funções
function criaListaObj(){
    let novoObj = {};
    novoObj.nome = inputNome.value.trim();
    novoObj.quant = parseInt(inputQuant.value);
    novoObj.peso = inputPeso.value || 'Não informado';
    novoObj.backgroundColor = "orange";
    if(isNaN(novoObj.quant)){
        novoObj.quant = 0
    }
    novoObj.preço = parseFloat(inputPreço.value);
    if(isNaN(novoObj.preço)){
        novoObj.preço = 0
    }
    novoObj.preçoTot = novoObj.quant * novoObj.preço;
    listaObj.push(novoObj);
    clearInput();
    mainDiv.innerHTML = '';
    return listaObj;
}

function renderListaObj(){
    mainDiv.innerHTML = ''
    for(let i=0; i<listaObj.length; i++){
        let novaDiv = `<div id="div${i}" style="background-color: ${listaObj[i].backgroundColor}">${i+1}° ITEM - Nome: ${listaObj[i].nome}<br>
        Quant: ${listaObj[i].quant}<br>
        Peso: ${listaObj[i].peso}<br>
        Preço un: R$${listaObj[i].preço} - Preço tot: R$${listaObj[i].preçoTot}<br>
        
        <button style="background-color: yellow; margin-right: 40px;" onclick="
          listaObj.splice(${i}, 1);
          mainDiv.innerHTML = '';
          updateTot();
          renderListaObj();
          saveListaObj();
        ">remover</button>
        
        <button onclick="
        let previousNome = listaObj[${i}].nome;
        let previousQuant = listaObj[${i}].quant;
        let previousPeso = listaObj[${i}].peso;
        let previousPreço = listaObj[${i}].preço;
        inputNome.value ? listaObj[${i}].nome = inputNome.value : listaObj[${i}].nome = previousNome
        if(inputPreço.value !== ''){
            listaObj[${i}].preço = parseFloat(inputPreço.value);
            if(isNaN(listaObj[${i}].preço)){
                listaObj[${i}].preço = 0;
            }
        }
        if(inputQuant.value !== ''){
            listaObj[${i}].quant = parseInt(inputQuant.value);
            if(isNaN(listaObj[${i}].quant)){
                listaObj[${i}].quant = 0
            }
        }
        if(inputPeso.value !== ''){
            listaObj[${i}].peso = inputPeso.value;
        }else{
            listaObj[${i}].peso = 'Não informado'
        }
        listaObj[${i}].preçoTot = listaObj[${i}].preço * listaObj[${i}].quant;
        updateTot();
        mainDiv.innerHTML = '';
        clearInput();
        renderListaObj();
        saveListaObj();
        ">alterar</button>
        
        <button onclick="
        listaObj[${i}].backgroundColor = 'lightgrey';
        document.querySelector('#div${i}').style.backgroundColor = 'lightgrey';
        saveListaObj();
        ">marcar</button>
        
        <button onclick="
        listaObj[${i}].backgroundColor = 'orange';
        document.querySelector('#div${i}').style.backgroundColor = 'orange';
        saveListaObj();
        ">desmarcar</button>
        
        <hr></div>`;
    mainDiv.innerHTML += novaDiv;
    }
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

function clearInput(){
    inputNome.value = '';
    inputQuant.value = '';
    inputPreço.value = '';
}

function organizarListaObj(){
    listaObj.sort(function(a,b){
        if(a.nome.toLowerCase() < b.nome.toLowerCase()){
            return -1
        }
        if(a.nome.toLowerCase() > b.nome.toLowerCase()){
            return 1
        }
        if(a.nome.toLowerCase() === b.nome.toLowerCase()){
            return 0
        }
    });
    renderListaObj();
    saveListaObj();
}

updateTot();
