import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Pessoa } from '../pessoa';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  title: string = 'Cadastrar Responsável'

  pessoas: Observable<Pessoa[]>;
  pessoa: Pessoa = new Pessoa

  constructor(
    private pessoaService: PessoaService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,

    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pessoas = this.pessoaService.listar()
  }

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.title = 'Alterar pessoa'
      this.getPessoa(id)
    }
  }

  getPessoa(id: number) {
    this.pessoaService.getById(id).subscribe(
      (response) => {
        this.pessoa = { ...response }

      }
    )
  }

  getAlterar() {

    this.pessoaService.getAlterar(this.pessoa.id, this.pessoa).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Alteração ', detail: 'Pessoa alterado com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/usuariosssssss'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIncluir() {


    this.pessoaService.getIncluir(this.pessoa).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Inclusão ', detail: 'Pessoa cadastrado com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/pessoas'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIsEditando() {
    return Boolean(this.pessoa.id)
  }

  salvar() {
    this.confirmationService.confirm({
      message: 'Deseja SALVAR esse pessoa?',
      header: 'SALVAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Você confirmou a operação!' });
        if (this.getIsEditando()) {
          this.getAlterar()
        } else {
          this.getIncluir()
        }
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

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja realmente DELETAR esse Responsável?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Você confirmou a operação!' });
        this.pessoaService.getDelete(id).subscribe();
        return window.location.reload();
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