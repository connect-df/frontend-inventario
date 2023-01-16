import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Local } from 'src/app/local/local';
import { LocalService } from 'src/app/local/local.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  locais = new Array<Local>()
  loca = new Local
  locaisLazyLoad = new Array<Local>()

  loading: boolean = false

  constructor(
    private localService: LocalService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getLocais()

  }

  // Recebe itens da tabela Locais
  getLocais() {
    this.localService.listar().subscribe(
      (response) => {
        this.locais = [...response]
        this.locaisLazyLoad = [...response]
      }, erro => {
        if (erro.status == 404) {
          this.messageService.add({ severity: 'error', summary: 'Erro 404', detail: 'Não encontramos a página.' });
        } else if (erro.status == 500) {
          this.messageService.add({ severity: 'error', summary: 'Erro 500', detail: 'Houve um erro ao carregar as informações.' });
        } else if ( erro != null){
          this.messageService.add({ severity: 'error', summary: 'Erro desconhecido', detail: 'Estamos enfrentado alguns erros no sistema. Tente novamente mais tarde.' });
        }
      })
  }

  paraLocalItens(local: Local) {
    const ambiente = local
    this.router.navigateByUrl('/itens/local/' + ambiente.id)
  }
  // Define um tempo de recarga até receber as informações do back
  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.locais) {
        let numPrimeiraLinha: number = Number(event.first)
        let numLinhasPagina: number = (numPrimeiraLinha + Number(event.rows))
        this.locais = [...this.locaisLazyLoad.slice(numPrimeiraLinha, numLinhasPagina)];

        this.loading = false;
      }
    }, 1000);
  }
  lectionChange(value = []) {
    this.locais = [...value];
  }


}
