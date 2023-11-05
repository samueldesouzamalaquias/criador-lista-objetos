//variáveis
const mainDiv = document.querySelector('#main-div');
const totParag = document.querySelector('#totParag');
const objDiv = document.querySelector('#objDiv');
let inputNome = document.querySelector('#inputNome');
let inputQuant = document.querySelector('#inputQuant');
let inputPreço = document.querySelector('#inputPreço');
let inputSave = document.querySelector('#inputSave');
const btAdicionar = document.querySelector('#btAdicionar');
const btLimpar = document.querySelector('#btLimpar');
const btOrganizar = document.querySelector('#btOrganizar');
const btReset = document.querySelector('#btReset');
const btSalvar = document.querySelector('#btSalvar');
const btAbrir = document.querySelector('#btAbrir');
const btExcluir = document.querySelector('#btExcluir');
const btObj = document.querySelector('#btObj');

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
    button.style.marginRight = '5px'
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

btReset.addEventListener('click',
function(){
    listaObj = [
    {"nome":"Absorvente","peso":"","quant":3,"preço":0,"preçoTot":0},{"nome":"Adoçante","peso":"","quant":2,"preço":0,"preçoTot":0},{"nome":"Alface","peso":"","quant":1,"preço":0,"preçoTot":0},{"nome":"Café","peso":"","quant":5,"preço":0,"preçoTot":0},{"nome":"Carne moída","peso":"500 g","quant":0,"preço":0,"preçoTot":0},{"nome":"Cheirinho para vaso sanitário","peso":"","quant":1,"preço":0,"preçoTot":0},{"nome":"Chia","peso":"","quant":0,"preço":0,"preçoTot":0},{"nome":"Creme de leite","peso":"","quant":2,"preço":0,"preçoTot":0},{"nome":"Cuzcuz Da Terrinha","peso":"","quant":1,"preço":0,"preçoTot":0},{"nome":"Desinfetante","peso":"Não informado","quant":1,"preço":0,"preçoTot":0},{"nome":"Desodorante feminino","peso":"","quant":2,"preço":0,"preçoTot":0},{"nome":"Desodorante masculino","peso":"","quant":1,"preço":0,"preçoTot":0},{"nome":"Detergente","peso":"","quant":2,"preço":0,"preçoTot":0},{"nome":"Detergente","peso":"Não informado",{"nome":"Escova de dentes","quant":3,"preço":0,"preçoTot":0},{"nome":"Filé de frango Sassami","peso":"","quant":3,"preço":0,"preçoTot":0},{"nome":"Fio dental","peso":"","quant":1,"preço":0,"preçoTot":0},{"nome":"Frutas","peso":"","quant":0,"preço":0,"preçoTot":0},{"nome":"Iogurte natural desnatado","peso":"","quant":4,"preço":0,"preçoTot":0},{"nome":"Leite","peso":"3 litros","quant":3,"preço":0,"preçoTot":0},{"nome":"Leite em pó","peso":"","quant":1,"preço":0,"preçoTot":0},{"nome":"Manteiga","peso":"","quant":2,"preço":0,"preçoTot":0},{"nome":"Luva para limpeza","peso":"","quant":1,"preço":0,"preçoTot":0},{"nome":"Mussarela","peso":"500g","quant":1,"preço":0,"preçoTot":0},{"nome":"Orégano","peso":"","quant":1,"preço":0,"preçoTot":0},{"nome":"Papel higiênico","peso":"2 grandes","quant":2,"preço":0,"preçoTot":0},{"nome":"Pasta de dentes","peso":"","quant":3,"preço":0,"preçoTot":0},{"nome":"Páprica doce","peso":"","quant":2,"preço":0,"preçoTot":0},{"nome":"Requeijão Tirolez Light","peso":"","quant":3,"preço":0,"preçoTot":0},{"nome":"Sabonete","peso":"","quant":5,"preço":0,"preçoTot":0},{"nome":"Sabão em pó","peso":"","quant":1,"preço":0,"preçoTot":0},{"nome":"Tapioca","peso":"","quant":1,"preço":0,"preçoTot":0},{"nome":"Tomate","peso":"","quant":4,"preço":0,"preçoTot":0}

];
    for(obj of listaObj){
        obj.preçoTot = obj.quant * obj.preço;
    }
    renderListaObj();
    updateTot();
    saveListaObj();
})

btSalvar.addEventListener('click',
function(){
    localStorage.setItem(`${inputSave.value}`,JSON.stringify(listaObj));
    inputSave.value = '';
});

btAbrir.addEventListener('click',
function(){
    if(localStorage.getItem(`${inputSave.value}`)){
        listaObj = JSON.parse(localStorage.getItem(`${inputSave.value}`));
        inputSave.value = '';
        renderListaObj();
        saveListaObj();
    }else{
        alert(`Lista "${inputSave.value}" não encontrada`);
        inputSave.value = '';
        listaObj = [];
        renderlistaObj();
    }
})

btExcluir.addEventListener('click',
function(){
    if(localStorage.getItem(`${inputSave.value}`)){
        localStorage.removeItem(`${inputSave.value}`);
        alert(`Lista ${inputSave.value} excluída`)
        inputSave.value = '';
    }else{
        alert(`Lista "${inputSave.value}" não encontrada`)
        inputSave.value = '';
    }
})

btObj.addEventListener('click',
function(){
    objDiv.textContent = (JSON.stringify(listaObj));
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
    }
    let somaFormatada = soma.toFixed(2);
    totParag.textContent = `Valor total dos itens: R$${somaFormatada}`;
}

function saveListaObj(){
    localStorage.setItem('listaObj', JSON.stringify(listaObj));
}

function clearInput(){
    inputNome.value = '';
    inputQuant.value = '';
    inputPreço.value = '';
    inputPeso.value = '';
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
