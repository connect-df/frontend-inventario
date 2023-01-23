import { Local } from '../local/local';
import { Pessoa } from '../pessoa/pessoa';
import { Tipo } from '../tipo/tipo';

export class Inventario {
  id!: number;
  codigo: string = '';
  descricao: string = '';
  dtCadastro!: string;
  patrimonio: string = '';
  situacao: string = '';
  valor: number = 0.0;
  propriedade: string = "";
  ambiente = new Local();
  pessoa = new Pessoa();
  tipo = new Tipo();
}
