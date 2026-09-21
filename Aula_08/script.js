// const nome = localStorage.getItem('nome');

// alert(nome);

// localStorage.setItem("nome", "Alana");

// alert(localStorage.getItem("nome"));

// localStorage.removeItem("nome");

function login() {
    //acessar o valor digitado nos campos usuario e senha
    const local_usuario = localStorage.getItem("usuario");
    const local_senha = localStorage.getItem("senha");


    const campo_usuario = document.getElementById("usuario").value;
    const campo_senha = document.getElementById("senha").value;


    // alert( valor_usuario.value + " " + valor_senha.value);

    if (campo_usuario == local_usuario && campo_senha == local_senha){
        alert("Usuario e senha corretos");
    }else{
        alert("usuario e senha incorretos");
    }


    //validar se os valores sao iguais aos valores armazenados no localStorage    
}