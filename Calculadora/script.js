const campo = document.getElementById("campo");


function digitar(valor) {

    if (valor == 'limpar') {
        campo.value = "";
    } else if (valor == "=") {
        campo.value = eval(campo.value)
    } else {
        campo.value = campo.value + valor;
    }

}