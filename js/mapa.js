var Mapa = function (mapaInicial, cidadesInicial, origemInicial, destinoInicial) {
  // Atributos
  var self = this;
  var mapa = mapaInicial || [];
  var cidades = cidadesInicial || [];
  var origem = origemInicial || "", destino = destinoInicial || "";

  // Métodos Privados
  var buscarVertices = function (_origem) {
    return mapa.filter((vertice) => {
      return vertice[0] === _origem;
    });
  };
  var qtdDiff = function (_individuo) {
    return (_individuo.getIndividuo().filter((e, i, arr) => {
      return arr.indexOf(e) == i;
    })).length;
  }

  // Métodos Públicos
  self.getMapa = function () {
    return {'mapa': mapa, 'cidades': cidades};
  };

  self.setMapa = function (_mapa) {
    mapa = _mapa;
  };

  self.getCidades = function () {
    return cidades;
  }

  self.setCidades = function (_cidades) {
    cidades = _cidades;
  };

  self.validaRota = function (arrRota) {
    var erros = 0, acertos = 0, somaP = 0;

    arrRota.forEach((_origem, _index, _arr) => {
      var _destino = _arr[_index+1];

      if (_index+1 !== _arr.length) {
        var vList = buscarVertices(_origem);

        if (vList.some((__vertice) => { return __vertice[2] === _destino; })) {
          somaP += vList.filter((__vertice) => { return __vertice[2] === _destino; })[0][1];
          acertos++;
        } else {
          erros++;
        };
      };
    });

    delete vList, arrRota;

    return {
      'pontosTotais': somaP,
      'saltos': { 'validos': acertos, 'erros': erros },
      'isValid': erros > 0 ? false : true
    };
  };

  self.fitness = function (_individuo) {
    var analiseRota = self.validaRota(_individuo.getIndividuo());

    var inicio = 0, fim = 0, saltos = analiseRota.saltos.validos, qDiff = qtdDiff(_individuo);
    var validRota = analiseRota.isValid ? 10 : 0;

    inicio += _individuo.getIndividuo().some((e) => { return e === origem }) ? 2 : 0;
    inicio += (origem === _individuo.getIndividuo()[0]) ? 3 : 0;

    fim += _individuo.getIndividuo().some((e) => { return e === destino }) ? 2 : 0;
    fim += (destino === _individuo.getIndividuo()[ _individuo.getIndividuo().length - 1 ]) ? 3 : 0;

    //             5       5             7             6              10
    var fit = (((inicio + fim) * 2) + (qDiff * 2) + (saltos * 2) + validRota) * 100;

    delete inicio, fim, saltos, qDiff, validRota;

    return fit;
  };
};
