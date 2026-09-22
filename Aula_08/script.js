// const nome = localStorage.getItem('nome');

// alert(nome);

// localStorage.setItem("nome", "Alana");

// alert(localStorage.getItem("nome"));

// localStorage.removeItem("nome");

function login() {
    //acessar o valor digitado nos campos usuario e senha
    const local_usuario = localStorage.getItem("Usuario");
    const local_senha = localStorage.getItem("Senha");


    const campo_usuario = document.getElementById("usuario").value;
    const campo_senha = document.getElementById("senha").value;


    // alert( valor_usuario.value + " " + valor_senha.value);

    if (campo_usuario == local_usuario && campo_senha == local_senha){
        alert("Usuario e senha corretos");
        window.location.href = "home.html";
    }else{
        alert("usuario e senha incorretos");
    }


    //validar se os valores sao iguais aos valores armazenados no localStorage    
}

function cadastro(){
    let nome = document.getElementById("nome").value;
    let usuario = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;

    localStorage.setItem("Nome", nome);
    localStorage.setItem("Usuario", usuario);
    localStorage.setItem("Senha", senha);
    
    alert("usuario cadastrado, volte para a tela de login")

    window.location.href = "login.html";
    //carregar os campos de cadastro
    //nome, usuario, senha, palavra passe

    //cadastrar os dados dentro do localStorage
    // localStorage.setItem(nomedocampo, valor(valor que vc carregou do campo que o usuario digitou))

    //redirecionar para tela de login

}

function recuperar_senha(){

     // 1º Carregar os valores dos campos NOME, PALAVRA-PASSE e a NOVA_SENHA
    const nome = document.getElementById("nome");
    const palavra_passe = document.getElementById("palavra_passe");
    const nova_senha = document.getElementById("nova_senha");

    // 2º Buscar no localStorage os valores de NOME e PALAVRA-PASSE
    const ls_nome = localStorage.getItem("nome");
    const ls_palavra_passe = localStorage.getItem("palavra_passe");
    // const ls_senha = localStorage.getItem("senha");


    // 3º Comparar se os valores carregados nos campos da tela
    // são compatíveis com os valores armazenados no localStorage.
    if (nome.value == ls_nome && palavra_passe.value == ls_palavra_passe) {
        // Se forem iguais, exibir a senha na tela ou em um alert.
        // alert("SENHA: " + ls_senha);
        localStorage.setItem("senha", nova_senha.value);
        window.location.href = "login.html";
    } else {

        // DESAFIO SEM I.AAAAA:
        //
        // Vocês devem implementar um controle de tentativas para a recuperação de senha.
        //
        // REGRAS:
        // Vocês devem validar a quantidade de tentativas incorretas
        // de NOME e PALAVRA-PASSE.
        //
        // Quando o usuário errar 3 vezes, vocês devem bloquear os campos (inputs)
        // e impedir que o usuário realize uma nova tentativa de recuperação de senha.
        //
        // Lembrem-se de salvar a quantidade de erros no localStorage.


        var quantidade_erros = Number(localStorage.getItem("quantidade_erros")) || 1;
        // Se forem diferentes, notificar o usuário na tela ou em um alert
        // informando que os dados não são compatíveis.
        // Além disso, limpar os campos de entrada (inputs).
        alert("Nome ou palavra passe inválida!");

        nome.value = "";
        palavra_passe.value = "";
        nova_senha.value = "";

        quantidade_erros++;

        localStorage.setItem("quantidade_erros", quantidade_erros);

        if (quantidade_erros >= 3) {
            nome.disabled = true;
            palavra_passe.disabled = true;
            nova_senha.disabled = true;
        }


    }

}
   
    //carregar valores dos campos nome, palavra-passe

    //buscar no localstorage os valores de nome, palavra passe

    //comparar se os campos carrgados em tela sao compativeis com os valores armazenados em localstorage
    //se for igual, exibir a senha em um alert
    //se nao, notificar o usuario em um alert que os dados nao sao compativeis, alem disso, limpar os inputs

    //desafio: voces devem implementar um controle de tentativas de recuperar a senha
    //regras: voces devem validar a quantidade de erros de nome, senha.
    //quando o usuario errar 3 vezes, voces devem bloquear os campos(inputs), e nao deixar o usuario tetar uma nova tentativa de solicitação de recuperação  de senha
    //lembrando que voce deve salvar a quantidadde de erros em localstorage
}

