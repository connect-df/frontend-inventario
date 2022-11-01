import { Local } from "../local/local"
import { Pessoa } from "../pessoa/pessoa"
import { Tipo } from "../tipo/tipo"
import { InventarioItem } from "./inventario-item"

export class Inventario {
    id!: number
    codigo: string = ''
    descricao: string = ''
    dtCadastro!: Date
    patrimonio: string = ''
    situacao: string = ''
    valor: number = 0.0

    ambiente = new Local
    pessoa = new Pessoa()
    tipo = new Tipo
}
