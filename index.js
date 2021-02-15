// ****** OBRIGATÓRIO colocar extensão .js ******
//   Caso não coloque, ocorre esse erro:
//   internal/process/esm_loader.js:74
//   internalBinding('errors').triggerUncaughtException(
//   Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/js-orientacao-objetos/Cliente' imported from /js-orientacao-objetos/index.js
//   Did you mean to import ../Cliente.js?
import { Cliente } from "./Cliente.js";
import { ContaCorrente } from "./ContaCorrente.js";

const cliente1 = new Cliente();
cliente1.nome = "Ricardo";
cliente1.cpf = 11122233309;

const cliente2 = new Cliente();
cliente2.nome = "Alice";
cliente2.cpf = 88822233309;

const contaCorrenteRicardo = new ContaCorrente();
contaCorrenteRicardo.agencia = 1001;

contaCorrenteRicardo.depositar(-100);
contaCorrenteRicardo.depositar(100);
contaCorrenteRicardo.depositar(100);

const valorSacado = contaCorrenteRicardo.sacar(50);
console.log(valorSacado);

console.log(contaCorrenteRicardo);
