import { Cliente } from "./Cliente.js";

export class ContaCorrente {
  agencia;

  _cliente;

  // Isso funciona com a atribuição de igualdade, não chamar como um método
  set cliente(novoValor) {
    // -> Quando escrever Cliente, vai fazer import, mas não coloca o .js (adicionar na mão)
    // -> Com essa validação, qlq coisa diferente de uma instância de cliente, o valor ficará undefined
    if (novoValor instanceof Cliente) {
      this._cliente = novoValor;
    }
  }

  get cliente() {
    return this._cliente;
  }

  get saldo() {
    return this._saldo;
  }

  _saldo = 0;

  sacar(valor) {
    if (this._saldo >= valor) {
      this._saldo -= valor;

      return valor;
    }
  }

  depositar(valor) {
    if (valor <= 0) {
      return;
    }
    this._saldo += valor;
  }

  transferir(valor, conta) {
    const valorSacado = this.sacar(valor);
    conta.depositar(valorSacado);
  }
}
