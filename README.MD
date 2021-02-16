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

- Para que o **interpretador (Node) do js** entenda como um **módulo**...

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

- Passagem por Valor X por Referência

```js

  transferir(valor, conta) {
    const valorSacado = this.sacar(valor);
    conta.depositar(valorSacado);
    //conta.cidade = "São Paulo"; // altera o objeto
    //valor = 20; // não altera
  }

```

    - Argumento 'valor' é tipo primitivo: passagem por valor (não altera, é uma cópia)


    - Argumento 'conta' é objeto: passagem por referência (alterará o objeto, é uma referência)

- undefined x null

```js
const conta2 = new ContaCorrente();
conta2.cliente = new Cliente();

// Caso não instancie 'conta2.cliente = new Cliente();', irá ocorrer o erro
// TypeError: Cannot set property 'nome' of undefined
conta2.cliente.nome = "Alice";

conta2.cliente.cpf = 88822233309;
conta2.agencia = 102;

const conta3 = new ContaCorrente();
conta3.agencia = 102;
console.log("\nConta sem cliente - cliente é undefined");
console.log(conta3);
// ContaCorrente { cliente: undefined, agencia: 102, _saldo: 0 }

const conta4 = new ContaCorrente();
conta4.cliente = null; // por DEFAULT é undefined, para ser null tem que dizer explicitamente
//conta4.cliente.nome = "Nome"; // TypeError: Cannot set property 'nome' of null
conta4.agencia = 102;
console.log("\nConta sem cliente - cliente é null");
console.log(conta4);
// ContaCorrente { cliente: null, agencia: 102, _saldo: 0 }
```

- Modificador de acesso

```js
export class ContaCorrente {
  agencia;

  // privado por convenção com _
  _cliente;

  // Isso funciona com a atribuição de igualdade, não chamar como um método
  //   -> Se tentar chamar como método:
  //   -> conta2.cliente(cliente1); // TypeError: conta2.cliente is not a function
  set cliente(novoValor) {
    // -> Quando escrever Cliente, vai fazer import, mas não coloca o .js (adicionar na mão)
    // -> Com essa validação, qlq coisa diferente de uma instância de cliente, o valor ficará undefined
    //    -> conta2.cliente = 0; // ContaCorrente { agencia: 102, _cliente: undefined, _saldo: 200 }
    if (novoValor instanceof Cliente) {
      this._cliente = novoValor;
    }
  }

  get cliente() {
    return this._cliente;
  }

  // Se criar apenas o get, não vai permitir fazer set do atributo
  // TypeError: Cannot set property saldo of #<ContaCorrente> which has only a getter
  // conta2.saldo = 100;
  get saldo() {
    return this._saldo;
  }

  //...
}
```

- Usar sempre os atributos a partir de um acessor 'set' ou 'get'
  - contaCorrenteRicardo.cliente;
- Não é uma boa prática acessar o atributo prefixado com underline (private)

  - contaCorrenteRicardo.\_cliente;

- Atentar com isso no GET:

```js

  get cpf() {
    // não esquecer return, senão será undefined
    return this._cpf;
  }

```

- Construtor

```js

  constructor(nome, cpf) {
    this.nome = nome;
    this._cpf = cpf;
  }

```

- static

```js
  static numeroDeContas = 0;

```

## Referências

- [Instalando e gerenciando várias versões do Node.js com NVM](https://www.treinaweb.com.br/blog/instalando-e-gerenciando-varias-versoes-do-node-js-com-nvm/)
- [Documentação oficial package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)
- [Documentação oficial 'scripts' dentro do 'package.json'](https://docs.npmjs.com/cli/v7/using-npm/scripts)
