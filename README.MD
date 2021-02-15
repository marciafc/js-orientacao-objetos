# Bytebank

## Requisitos

- NVM
  - nvm ls-remote
  - nvm install v14.15.5
  - nvm ls
  - nvm use v14.15.5
  - nvm current
- NodeJS >= 13.0 (adiciona a capacidade de usarmos módulos JS dentro do Node)
  - Node - interpretador para o código

## Executar

```
  $  node ./index.js
```

## Notas

- private
- return, undefined
- early return ("retorno antecipado")
- Criar atributo dinamicamente
- console.table

```js
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
    // Mesmo nível de indentação da condicional, mais fácil a leitura
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
```

- Para que o interpretador (Node) do js entenda como um módulo...

```
$  node ./index.js

Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.

import { Cliente } from "./Cliente.js";
^^^^^^

SyntaxError: Cannot use import statement outside a module

```

... deverá ser criado arquivo package.json com os passos a seguir na raiz do projeto:

```
$   npm init

digitar <bytebank>

As demais informações pode preencher ou somente dar enter e preencher depois.

Será criado então o arquivo package.json com as configurações do projeto.

Incluir em package.json a configuração "type": "module",

```

## Referências

- [Instalando e gerenciando várias versões do Node.js com NVM](https://www.treinaweb.com.br/blog/instalando-e-gerenciando-varias-versoes-do-node-js-com-nvm/)
- [Documentação oficial package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)
- [Documentação oficial 'scripts' dentro do 'package.json'](https://docs.npmjs.com/cli/v7/using-npm/scripts)
