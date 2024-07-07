// botones del HTML
const buttonEncrypt = $('#encrypt'),
buttonUnencrypt = $('#unencrypt'),
buttonCopy = $('#output-copy');
// Elementos HTML
const outputPrimaryView = $('#output-primary'),
outputResponseView = $('#output-response'),
inputText = $('#input-text'),
outputText = $('#output-text');

outputResponseView.hide();

// valores a reemplazar (este formato nos sirve para el replace simultaneo)
const replacements = {
    'a': 'ai',
    'á': '%i',
    'A': 'a^',
    'i': 'imes',
    'í': 'i$es',
    'I': 'im*s',
    'o': 'ober',
    'ó': 'ob&r',
    'O': '+ber',
    'u': 'ufat',
    'ú': 'ufa#',
    'U': 'uf!t',
    'e': 'enter',
    'é': 'en@er',
    'E': 'ente~',
};

// esto nos servira para especificar que palabras cambiara al desencriptado
const keys = []; 
const inverseReplacements = {}; // se invierte para el desencriptado

for (let key in replacements) { // llenado de datos
    inverseReplacements[replacements[key]] = key;
    keys.push(replacements[key]);
}

buttonEncrypt.on('click', function() {
    processText(encriptar);
});

buttonUnencrypt.on('click', function() {
    processText(desencriptar);
});

// proceso del texto y elementos durante la incriptacion/desincriptacion
function processText(processFunction) {
    if (inputText.val() !== '') {
        let processedText = processFunction(inputText.val());

        outputPrimaryView.hide();

        outputText.val(processedText);
        outputResponseView.show();
    }else{
        outputPrimaryView.css('display', 'flex');
        outputResponseView.css('display', 'none');
    }
}

// copiar el texto
buttonCopy.on('click', function() {
    outputText.select() // selecciona el contenido que se copiara
    document.execCommand('copy'); // Ejecutar el comando de copia sobre lo seleccionado
    window.getSelection().removeAllRanges(); // saca la seleccion del elemento

    buttonCopy.addClass('correct-copy').text('Copiado correctamente!'); // Mensaje y estilo

    setTimeout(function() { // genera un tipo de animacion para avisar del copiado
        buttonCopy.removeClass('correct-copy').text('Copiar');
    }, 1500);
})

// funcion para encriptar
function encriptar(text) { 
    // remplaza por las vocales los resultados del objeto
    text = text.replace(/[aeiouAEIOUáéíóú]/g, match => replacements[match]);

    return text;
}

function desencriptar(text){
    // al ser mas complicado cambiar fraces en conjunto, 
    // pasamos todas las palabra de forma individual
    keys.forEach(key => {
        // remplaza la palabra por la vocal
        text = text.replaceAll(key, match => inverseReplacements[match]);
    });

    return text;
}