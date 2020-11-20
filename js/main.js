var mapa = new Mapa([
  ['a', 7, 'b'], ['a', 5, 'd'],
  ['b', 7, 'a'], ['b', 8, 'c'], ['b', 9, 'd'], ['b', 7, 'e'],
  ['c', 8, 'b'], ['c', 5, 'e'],
  ['d', 5, 'a'], ['d', 9, 'b'], ['d', 15, 'e'], ['d', 6, 'f'],
  ['e', 7, 'b'], ['e', 5, 'c'], ['e', 15, 'd'], ['e', 8, 'f'],
  ['f', 6, 'd'], ['f', 8, 'e'], ['f', 11, 'g'],
  ['g', 11, 'f'], ['g', 9, 'e']
], ['a', 'b', 'c', 'd', 'e', 'f', 'g'], 'a', 'g');

var populacao = new Populacao();

const listCidades = mapa.getMapa().cidades;
populacao.gerarPopulacao(20, 7, listCidades);
var algoritmo = new Algoritmo();

algoritmo.aptidao(populacao.getPopulacao(), mapa);
do {
  var selecao = algoritmo.selecao();
  var operadores = algoritmo.mutacao( algoritmo.reproducao( selecao ) );

  algoritmo.setPopulacao( operadores );
  algoritmo.aptidao(populacao.getPopulacao(), mapa);

  delete selecao, operadores;

  document.getElementById('preview').innerText += algoritmo.getFitnessMelhor() + ";" + algoritmo.getFitnessMedia() + "\n";
  console.log("Geração:", algoritmo.getGeracaoNum());
} while (algoritmo.getGeracaoNum() < 5000 && algoritmo.parada(0.95, 5600));
// } while (algoritmo.parada(0.95, 5600));

document.getElementById('preview').innerText += algoritmo.toString() + "\n\n";
