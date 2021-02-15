class Cliente {
  nome;
  cpf;
  rg;
}

class ContaCorrente {
  agencia;
  // Proposta para private: usar o caracter #
  // #saldo = 0 https://github.com/tc39/proposal-class-fields#private-fields
  // Convenção da comunidade para private: usar o caracter _ (não bloqueia o acesso)
  _saldo = 0;

  sacar(valor) {
    if (this._saldo >= valor) {
      this._saldo -= valor;

      // caso não use o 'return valor', e tentar usar o retorno da funcao
      // o valor obtido será undefined (valor retornado por default)
      return valor;
    }
  }

  depositar(valor) {
    // Melhorar legibilidade: early return ("retorno antecipado")
    // Verifica todas as situações indesejadas primeiro
    // Mesmo nível de indentação da condicional
    if (valor <= 0) {
      return;
    }
    this._saldo += valor;
  }
}

const cliente1 = new Cliente();
cliente1.nome = "Ricardo";
cliente1.cpf = 11122233309;
cliente1.rg = 123456789;

const cliente2 = new Cliente();
cliente2.nome = "Alice";
cliente2.cpf = 88822233309;

console.log(cliente1, cliente2);
// Output:
// Cliente { nome: 'Ricardo', cpf: 11122233309, rg: 123456789 } Cliente { nome: 'Alice', cpf: 88822233309, rg: undefined }

const clientes = [cliente1, cliente2];
console.table(clientes);

const contaCorrenteRicardo = new ContaCorrente();
contaCorrenteRicardo.agencia = 1001;

//Cria atributo dinamicamente
contaCorrenteRicardo.qualquerCoisa = "Alguma coisa";

contaCorrenteRicardo.depositar(-100);
contaCorrenteRicardo.depositar(100);
contaCorrenteRicardo.depositar(100);

const valorSacado = contaCorrenteRicardo.sacar(50);

// se função sacar() não retornar o valor, o que será impresso será undefined
console.log(valorSacado);

console.log(contaCorrenteRicardo);
// Output:
// ContaCorrente { agencia: 1001, _saldo: 150, qualquerCoisa: 'Alguma coisa'}
