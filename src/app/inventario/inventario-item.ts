import { Local } from '../local/local';
import { Pessoa } from '../pessoa/pessoa';
import { Tipo } from '../tipo/tipo';

export class InventarioItem {
  codigo: number = 0;
  descricao: string = '';
  valor: number = 0.0;
  propriedade: string = '';
  local = new Local();
  responsavel = new Pessoa();
  tipo = new Tipo();
}
