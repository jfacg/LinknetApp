const CicloPagamento = require('./cicloPagamento')
const _ = require('lodash')

function Errors(error) {
  var errors = []
  if (error.errors.mes) {
    errors.push(error.errors.mes.message)
  }
  if (error.errors.ano) {
    errors.push(error.errors.ano.message)
  }
  return errors
}

function inserir (req, res, next) {

  const ciclo =  new CicloPagamento
  ciclo.mes = req.body.mes
  ciclo.ano = req.body.ano
  ciclo.nome = req.body.nome
  // ciclo.nome = ciclo.mes+"/"+ciclo.ano
  ciclo.save(function (error) {
    if (error) {
      var errors = Errors(error)
      res.status(500).json({errors})
    } else {
      res.json(ciclo)
    }
  })
}

function atualizar(req, res) {
  console.log(req.body);
  CicloPagamento.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: req.body
  }, {
    // upsert: true,
    new: true,
    runValidators: true,
  }, function(error, cicloPagamento) {
    if(error) {
      var errors = Errors(error)
      res.status(500).json({errors})
    } else {
      res.json(cicloPagamento)
    }
  })
}

function listar(req, res) {
  CicloPagamento.find(function(error, result) {
      if(error) {
        res.status(500).json({error: error})
      } else {
        res.json(result)
      }
  })
}

function buscarPorId(req, res) {
  CicloPagamento.findById(req.params.id, function(error, cicloPagamento) {
    if(error) {
      sendErrorsOrNext
    } else {
      res.json(cicloPagamento)
    }
  })
}

function contador(req, res, next) {
  CicloPagamento.count(function (error, value) {
    if(error){
      sendErrorsOrNext
    } else {
      res.json({value})
    }
  })
}

function excluir(req, res) {
  CicloPagamento.remove({_id: req.params.id}, function(error) {
    if(error) {
      sendErrorsOrNext
    } else {
      res.status(200).send()
    }
  })
}


module.exports = {contador, excluir, listar, inserir, atualizar, buscarPorId}