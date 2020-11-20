var Algoritmo = function (gNum) {
  // Atributos
  var self = this;
  var txReproducao = 0.6, txMutacao = 0.1;
  var geracao = { 'numero': gNum || 0, 'fit': {} };

  function random(_length) {
    return Math.floor(Math.random() * _length);
  }

  // Métodos Privados
  function cruzamento (populacao, iPai, iMae) {
    let vPai = populacao[iPai].individuo.getIndividuo();
    let vMae = populacao[iMae].individuo.getIndividuo();

    var mMae = mPai = random(vPai.length - 1)+1;

    return [vPai.slice(0, mPai).concat(vMae.slice(mMae, vMae.length)), vMae.slice(0, mMae).concat(vPai.slice(mPai, vPai.length)) ];
  }

  // Métodos Públicos
  self.aptidao = function (populacao, mapa) {
    geracao.populacao = [];
    geracao.numero++;
    geracao.fit.soma = 0;
    geracao.fit.melhor = 0;

    populacao.forEach((individuo) => {
      geracao.fit.soma += fit = mapa.fitness(individuo);
      geracao.fit.melhor = (fit > geracao.fit.melhor) ? fit : geracao.fit.melhor;

      geracao.populacao.push({ 'individuo': individuo, 'fit': fit });
    });

    geracao.fit.media = geracao.fit.soma / populacao.length;
  };

  self.fitnessPopulacao = function (mapa) {
    var aux = []
    geracao.fit.soma = 0;
    geracao.fit.melhor = 0;

    geracao.populacao.forEach((individuo) => {
      geracao.fit.soma += fit = mapa.fitness(individuo.individuo);
      geracao.fit.melhor = (fit > geracao.fit.melhor) ? fit : geracao.fit.melhor;

      aux.push({ 'individuo': individuo.individuo, 'fit': fit });
    })

    geracao.populacao = aux;
    geracao.fit.media = geracao.fit.soma / aux.length;
  }

  self.selecao = function () {
    var somaPorcentagemFit = 0, arrSelecao = [];
    var arrAux = geracao.populacao.map((e) => {
      somaPorcentagemFit += (e.fit / geracao.fit.soma) * 100;

      return { 'individuo': e.individuo, 'fit': e.fit, 'somaFit': somaPorcentagemFit };
    });

    for (var i = 0; i < arrAux.length; i++) {
      var aleatorio = random(100);
      var aux = arrAux.find((e) => { return e.somaFit >= aleatorio });
      arrSelecao.push({ 'individuo': new Individuo(aux.individuo.getIndividuo()), 'fit': aux.fit });
    };

    arrSelecao = arrSelecao.sort((a, b) => { return b.fit - a.fit });
    return arrSelecao;
  }

  self.reproducao = function (selecao) {
    var pai = null, filho = null;

    for (var i = 0, taxa = 0; taxa <= txReproducao; taxa += 1 / selecao.length, i++) {

      if (pai !== null) {
        filho = cruzamento(selecao, pai, i);

        selecao[pai].individuo.setIndividuo(filho[0]);
        selecao[i].individuo.setIndividuo(filho[1]);

        pai = null;
      } else {
        pai = i;
      }

    }

    delete pai, filho;
    return selecao;
  }
  self.mutacao = function (selecao) {
    for (var i = 0; i < selecao.length; i++) {
      if ((random(100) / 100) <= txMutacao) {
        selecao[i].individuo.mutar();
      }
    }

    return selecao;
  }

  self.parada = function (taxa, length) {
    return (geracao.fit.melhor / length) <= taxa;
  }
  self.toString = function () {
    var str = "";

    str += "Soma: " + geracao.fit.soma + " / ";
    str += "Melhor: " + geracao.fit.melhor + " / ";
    str += "Média: " + geracao.fit.media + "\n";

    str += "Número da geração: " + geracao.numero + "\n";
    str += "Populacao:\n";

    geracao.populacao.forEach((e, i) => {
      str += "("+i+") " + e.individuo.toString() + " ["+e.fit+"]\n";
    });

    return str;
  }

  self.getGeracao = function () {
    return geracao
  }
  self.getGeracaoNum = function () {
    return geracao.numero;
  }
  self.getPopulacao = function () {
    return new Populacao(geracao.populacao.map((e) => { return e.individuo }))
  }
  self.getFitnessMedia = function () {
    return geracao.fit.media
  }
  self.getFitnessMelhor = function () {
    return geracao.fit.melhor
  }
  self.getFitnessSoma = function () {
    return geracao.fit.soma
  }

  self.setPopulacao = function (_populacao) {
    geracao.populacao = _populacao
  }
  self.setTaxaReproducao = function (_txReproducao) {
    txReproducao = _txReproducao;
  };
  self.setTaxaMutacao = function (_txMutacao) {
    txMutacao = _txMutacao;
  };
};
