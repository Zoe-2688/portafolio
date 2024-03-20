const textoOriginal = document.getElementById('textoOriginal');
const encriptar = document.getElementById('encriptar');
const desencriptar = document.getElementById('desencriptar');
const resultadoContenedor = document.getElementById('resultado');
const copiarTexto = document.getElementById('copiarTexto');
var botonEncriptado = false;
var textoEncriptado;
var textoDesencriptado;


// Agregar un evento de escucha al hacer clic en el área de texto
textoOriginal.addEventListener('click', () => {
  // Mostrar la advertencia al usuario
  alert('¡Por favor, ingresa solo letras en minúsculas!');
});

encriptar.addEventListener('click', () => {
  textoEncriptado = encriptarTexto(textoOriginal.value);
  mostrarResultado(`<span style="color: blue;">Texto Encriptado:</span> ${textoEncriptado}`);
  botonEncriptado = true;
});

desencriptar.addEventListener('click', () => {
  textoDesencriptado = desencriptarTexto(textoOriginal.value);
  botonEncriptado = false;
  // Mostrar el texto desencriptado en el resultado
  mostrarResultado(`Texto Desencriptado: ${textoDesencriptado}`);
});

copiarTexto.addEventListener('click', () => {
  try {
    let textoSelecionado;
    if (botonEncriptado) {
      textoSelecionado = textoEncriptado;
    } else {
      textoSelecionado = textoDesencriptado;
    }
    // Seleccionar el texto dentro del cuadro de texto original
    /*   textoSelecionado.select(); */
    // Copiar el texto seleccionado al portapapeles utilizando la API de Clipboard
    navigator.clipboard.writeText(textoSelecionado);
    // Alerta de copia exitosa
    alert('Texto copiado al portapapeles');
  } catch (error) {
    console.error('Error al copiar el texto:', error);
    alert('Error al copiar el texto. Por favor, inténtalo de nuevo.');
  }
});

function mostrarResultado(resultado) {
  resultadoContenedor.innerHTML = resultado;
  document.getElementById('p1').remove()
  document.getElementById('p2').remove()
  document.getElementById('imagen').remove();
  copiarTexto.style.display = "";
}

function encriptarTexto(texto) {
  const mapaVocales = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat',
  };

  let resultado = '';
  for (let i = 0; i < texto.length; i++) {
    let char = texto[i].toLowerCase();

    if (mapaVocales.hasOwnProperty(char)) {
      resultado += mapaVocales[char];
    } else {
      resultado += char;
    }
  }

  return resultado;
}

function desencriptarTexto(texto) {
  let resultadoFinal = "";
  let wordsEncrypt = [{ "enter": "e" }, { "imes": "i" }, { "ai": "a" }, { "ober": "o" }, { "ufat": "u" }];

  texto.split(" ").forEach(encrypt => {
    wordsEncrypt.forEach(word => {
      const [key, value] = Object.entries(word)[0];
      const regex = new RegExp(key, "g");
      encrypt = encrypt.replace(regex, value);
    });

    resultadoFinal += encrypt + " ";
  });

  return resultadoFinal;
}