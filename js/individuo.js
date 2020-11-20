var Individuo = function (individuoInicial) {
  // Atributos
  var self = this;
  var individuo = individuoInicial || [];

  // Métodos Privados
  function random(_length) {
    return Math.floor(Math.random() * _length);
  }

  // Métodos Públicos
  self.getIndividuo = function () {
    return individuo;
  }

  self.setIndividuo = function (_individuo) {
    individuo = _individuo;
  }

  self.gerarIndividuo = function (_length, _listCidades) {
    var _arr = new Array();
    for (var i = 0; i < _length; i++) {
      var cidade = _listCidades[ random(_listCidades.length) ];
      _arr.push(cidade);
    };
    return new Individuo(_arr);
  };

  self.mutar = function () {

    var qtdDiff = individuo.filter((e, i, arr) => {
      return arr.indexOf(e) === i;
    });

    if (qtdDiff.length === individuo.length) {

      var varRandom = random(individuo.length);
      do {
        var proxRandom = random(individuo.length);
      } while (proxRandom === varRandom);

      var temp = individuo[ varRandom];
      individuo[ varRandom] = individuo[ proxRandom ];
      individuo[ proxRandom ] = temp;

    } else {

      for (var i = 0, novo = true; i < individuo.length && novo; i++) {
        novo = individuo.some((e) => { return e === mapa.getCidades()[i] });
        if (!novo) {
          break;
        }
      }

      for (e of individuo) {
        for (var j = 0, ocorencia = 0; j < individuo.length; j++) {
          if (individuo[j] === e) {
            ocorencia++
          }
          if (ocorencia === 2) {
            individuo[j] = mapa.getCidades()[i]
            break;
          }
        }
        if (ocorencia === 2) {
          break;
        }
      }

    }

  }

  self.toString = function () {
    var str = "";

    individuo.forEach((e, i, arr) => {
      (i !== arr.length-1) ? str += e + " - " : str += e;
    });

    return str;
  }
};
