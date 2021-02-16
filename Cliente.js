export class Cliente {
  nome;
  _cpf; // privado

  get cpf() {
    // só tem get, sem set
    // não esquecer return, senão será undefined
    return this._cpf;
  }

  constructor(nome, cpf) {
    this.nome = nome;
    this._cpf = cpf; // garante que cpf só será setado na criação do obj
  }
}
