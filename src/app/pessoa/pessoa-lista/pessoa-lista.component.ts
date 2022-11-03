import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { Pessoa } from '../pessoa';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa-lista',
  templateUrl: './pessoa-lista.component.html',
  styleUrls: ['./pessoa-lista.component.css']
})
export class PessoaListaComponent implements OnInit {

  Pessoas: Pessoa[] = new Array<Pessoa>()
  Pessoa: Pessoa = new Pessoa
  PessoasLazyLoad: Pessoa[] = new Array<Pessoa>()

  loading: boolean = false
  totaldeRegistros: number = 0

  constructor(
    private pessoaService: PessoaService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,

  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getPessoas()
  }

  getPessoas() {
    this.pessoaService.listar().subscribe(
      (response) => {
        this.Pessoas = [...response]
        this.PessoasLazyLoad = [...response]
        this.totaldeRegistros = response.length
      }, erro => {
        if (erro.status == 404) {
          this.messageService.add({ severity: 'error', summary: 'Erro 404', detail: 'Página não encontrada.' });
        } else if (erro.status == 500) {
          this.messageService.add({ severity: 'error', summary: 'Erro 500', detail: 'Houve um erro as carregar ao informações.' });
        }
        else if (erro != null) {
          this.messageService.add({ severity: 'error', summary: 'Erro de sistema', detail: 'Estamos enfrentado alguns erros de sistema. Tente novamente mais tarde.' });
        }
      }
    )
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.Pessoas) {

        let numPrimeiraLinha: number = Number(event.first)
        let numLinhasPagina: number = (numPrimeiraLinha + Number(event.rows))
        this.Pessoas = [...this.PessoasLazyLoad.slice(numPrimeiraLinha, numLinhasPagina)];

        this.loading = false;
      }
    }, 1000);
  }
  lectionChange(value = []) {
    this.Pessoas = [...value];
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja realmente DELETAR esse responsável?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Você confirmou a operação!' });
        this.pessoaService.getDelete(id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Deletado', detail: 'Responsável deletado com sucesso!' });
            setTimeout(() => {
              return window.location.reload();
            }, 1000)
          }, (erro) => {
            if (erro.status == 500) {
              this.messageService.add({ severity: 'error', summary: 'Não foi possível deletar', detail: 'Essa pessoa há itens vinculados a ela, por isso não pode ser excluída.' });
            }
            else if (erro != null) {
              this.messageService.add({ severity: 'error', summary: 'Erro ao deletar', detail: 'Estamos enfrentado alguns erros de sistema. Tente novamente mais tarde.' });
            }
          }
        );


      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejeitado', detail: 'Você rejeitou a operação.' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Você cancelou a operação.' });
            break;
        }
      }
    });
  }
}

