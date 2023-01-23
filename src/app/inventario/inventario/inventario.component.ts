import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { Observable } from 'rxjs';
import { Local } from 'src/app/local/local';
import { LocalService } from 'src/app/local/local.service';
import { Pessoa } from 'src/app/pessoa/pessoa';
import { PessoaService } from 'src/app/pessoa/pessoa.service';
import { Tipo } from 'src/app/tipo/tipo';
import { TipoService } from 'src/app/tipo/tipo.service';
import { Inventario } from '../inventario';
import { InventarioService } from '../inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
})
export class InventarioComponent implements OnInit {
  title: string = 'Cadastrar Inventario';

  inventario = new Inventario();
  inventarioItens: Observable<Inventario[]>;

  tipo = new Tipo();
  tipos = new Array<Tipo>();

  ambiente: Local = new Local();
  locais = new Array<Local>();

  pessoa: Pessoa = new Pessoa();
  pessoas = new Array<Pessoa>();

  local = new Local();

  constructor(
    private inventarioService: InventarioService,
    private tipoService: TipoService,
    private localService: LocalService,
    private pessoaService: PessoaService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,

    private route: ActivatedRoute
  ) {
    this.inventarioItens = this.inventarioService.listar();
  }

  ngOnInit(): void {
    // id na url
    const id: number = this.route.snapshot.params['id'];

    // codigo na url
    const codigo: string = this.route.snapshot.params['codigo'];

    const local: string = this.route.snapshot.params['local'];

    if (id) {
      this.title = 'Alterar inventario';
      this.getInventario(id);
    } else if (codigo) {
      this.getByCode(codigo);
    }

    this.getLocal();
    this.getTipo();
    this.getPessoa();
  }

  getInventario(id: number) {
    this.inventarioService.getById(id).subscribe((response) => {
      if (response == null) {
        this.title = 'Erro ao encontrar item';
        this.messageService.add({
          severity: 'error',
          summary: 'Id inexistente:',
          detail: 'Não encontramos o item',
        });
      }
      this.inventario = { ...response };
    });
  }

  getByCode(codigo: string) {
    this.inventarioService.getByCode(codigo).subscribe((response) => {
      if (response != null) {
        this.title = 'Alterar Item';
        this.inventario = { ...response };
      } else {
        this.title = 'Adicionar Item';
        this.inventario.codigo = codigo;
      }
    });
  }

  getLocal() {
    this.localService.listar().subscribe((response) => {
      this.locais = [...response];
    });
  }

  getTipo() {
    this.tipoService.listar().subscribe((response) => {
      this.tipos = [...response];
    });
  }

  getPessoa() {
    this.pessoaService.listar().subscribe((response) => {
      this.pessoas = [...response];
    });
  }

  getAlterar() {
    this.inventarioService
      .getAlterar(this.inventario.id, this.inventario)
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Alteração ',
            detail: 'Patrimônio alterado com sucesso!',
          });
          setTimeout(() => {
            window.history.back();
          }, 1000);
        },
        (erro) => {
          if (erro.status == 404) {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro 404',
              detail: 'Página não encontrada.',
            });
          } else if (erro.status == 500) {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro 500',
              detail: 'Houve um erro ao carregar ao informações.',
            });
          } else if (erro != null) {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro de sistema',
              detail:
                'Estamos enfrentado alguns erros de sistema. Tente novamente mais tarde.',
            });
          }
        }
      );
  }

  getIncluir() {
    this.inventarioService.getIncluir(this.inventario).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Inclusão ',
          detail: 'Patrimônio adicionado com sucesso!',
        });
        setTimeout(() => {
          window.history.back();
        }, 1000);
      },
      (erro) => {
        console.log(erro);
      }
    );
  }

  getIsEditando() {
    return Boolean(this.inventario.id);
  }

  salvar() {
    this.confirmationService.confirm({
      message: 'Deseja SALVAR esse item?',
      header: 'SALVAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmado',
          detail: 'Você confirmou a operação!',
        });
        if (this.getIsEditando()) {
          this.getAlterar();
        } else {
          this.getIncluir();
        }
      },

      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejeitado',
              detail: 'Você rejeitou a operação.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelado',
              detail: 'Você cancelou a operação.',
            });
            break;
        }
      },
    });
  }

  voltar() {
    window.history.back();
  }
}
