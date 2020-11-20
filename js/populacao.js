var Populacao = function (populacaoInicial) {
  // Atributos
  var self = this;
  var populacao = populacaoInicial || [];

  // Métodos Públicos
  self.gerarPopulacao = function (_length, _lengthIndividuo, _cidades) {
    var _aux = new Array();

    for (var i = 0; i < _length; i++) {
      _aux.push( (new Individuo()).gerarIndividuo(_lengthIndividuo, _cidades) );
    };

    return populacao = _aux;
  }

  self.getPopulacao = function () {
    return populacao;
  };

  self.setPopulacao = function (_populacao) {
    populacao = _populacao;
  }

  self.toString = function () {
    var str = "";

    populacao.forEach((e, i) => {
      str += "("+i+") " + e.toString() + "\n";
    });

    return str;
  };
};
