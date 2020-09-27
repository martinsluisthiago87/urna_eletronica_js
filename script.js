// Variaveis de controle de interface
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

// Variaveis de controle de ambiente
let etapaAtual = 0;
let numero = ''; //numero que tá sendo digitado let numero = '78965';
let votoBranco = true;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;
    
    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        }else{
            numeroHtml += '<div class="numero"></div>';
        }
            
    }
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    // alert('Finalizou de digitar o voto!!');
    // console.log("Atualizando a Interface");
    // console.log(numero);
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if (item.numero === numero) {
            return true;
        }else{
            return false;
        }
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/>`;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src = "images/${candidato.fotos[i].url}" alt = "" >${candidato.fotos[i].legenda} </div>`;
            }else{
                fotosHtml += `<div class="d-1-image"><img src = "images/${candidato.fotos[i].url}" alt = "" >${candidato.fotos[i].legenda} </div>`;
            }
            //fotosHtml += `<div class="d-1-image"><img src = "images/${candidato.fotos[i].url}" alt = "" >${candidato.fotos[i].legenda} </div>`; 
        }
        lateral.innerHTML = fotosHtml;

    }else{
        //Voto nulo
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';

    }

    // console.log("Candidato", candidato);
}

function clicou(n) {
     let elNumero = document.querySelector('.numero.pisca');
     if (elNumero !== null) {
         elNumero.innerHTML = n;
         numero = `${numero}${n}`;

         elNumero.classList.remove('pisca');
        //  Verificar se existe o proximo item
        if (elNumero.nextElementSibling !== null) {
             elNumero.nextElementSibling.classList.add('pisca');
        }else{
            atualizaInterface();
        }
        
        //  console.log(elNumero.nextElementSibling);
         
     }
}

function branco(params) {
    //alert("Clicou em Branco");
    // if (numero === '') {
    //     votoBranco = true;
    //     seuVotoPara.style.display = 'block';
    //     aviso.style.display = 'block';
    //     numeros.innerHTML = '';
    //     descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';  
    // }else{
    //     alert('Para votar em BRANCO, não pode ter digitado nenhum número!');
    // }
        numero = '';
        votoBranco = true;
        seuVotoPara.style.display = 'block';
         aviso.style.display = 'block';
         numeros.innerHTML = '';
         lateral.innerHTML = '';
         descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'; 

}

function corrige(params) {
//    alert("Clicou em corrige") ;
    comecarEtapa();
}

function confirma(params) {
    //alert("Clicou em Confirma");
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        // console.log("Confirmando como Branco...");
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    }else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        console.log("Confirmando como "+numero);
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if (votoConfirmado) {
        etapaAtual++;
        // console.log(etapas[etapaAtual]);
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        }else{
            // console.log("FIM!");
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM!!</div>';
            console.log(votos);
        }
    }
}

comecarEtapa();