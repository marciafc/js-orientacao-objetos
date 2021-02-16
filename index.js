// ****** OBRIGATÓRIO colocar extensão .js ******
//   Caso não coloque, ocorre esse erro:
//   internal/process/esm_loader.js:74
//   internalBinding('errors').triggerUncaughtException(
//   Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/js-orientacao-objetos/Cliente' imported from /js-orientacao-objetos/index.js
//   Did you mean to import ../Cliente.js?
import { Cliente } from "./Cliente.js";
import { ContaCorrente } from "./ContaCorrente.js";

const cliente1 = new Cliente("Ricardo", 11122233309);
//cliente1.nome = "Ricardo";
//cliente1.cpf = 11122233309;

console.log("\n");
console.log(cliente1);
console.log(cliente1.cpf);

const contaCorrenteRicardo = new ContaCorrente(1001, cliente1);
//contaCorrenteRicardo.agencia = 1001;
//contaCorrenteRicardo.cliente = cliente1;

contaCorrenteRicardo.depositar(-100);
contaCorrenteRicardo.depositar(100);
contaCorrenteRicardo.depositar(100);

const valorSacado = contaCorrenteRicardo.sacar(50);
contaCorrenteRicardo.depositar(500);

const cliente2 = new Cliente("Alice", 88822233309);
const conta2 = new ContaCorrente(102, cliente2);
//conta2.cliente = cliente1;
//conta2.cliente = 0; // ContaCorrente { agencia: 102, _cliente: undefined, _saldo: 200 }
//conta2.cliente.nome = "Alice";
//conta2.cliente.cpf = 88822233309;
//conta2.agencia = 102;

console.log("\nAcessando o cliente");
console.log(conta2.cliente);

console.log("\nAcessando o saldo do cliente");
console.log(conta2.saldo);

// Como só há o modificador de acesso get no 'saldo', não permite fazer set
//conta2.saldo = 100; // TypeError: Cannot set property saldo of #<ContaCorrente> which has only a getter

let valor = 200;
contaCorrenteRicardo.transferir(valor, conta2);
