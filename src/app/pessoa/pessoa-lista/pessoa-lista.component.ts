import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
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
      message: 'Deseja realmente DELETAR essa Pessoa?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Você confirmou a operação!' });
        this.pessoaService.getDelete(id).subscribe();
        return window.location.reload();
      },
    })
  }
}

