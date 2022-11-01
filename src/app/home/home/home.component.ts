import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
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
    private route: ActivatedRoute
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
      }
    )
  }

  paraLocalItens(local: Local) {
   const ambiente = local.ambiente
    this.router.navigateByUrl('/itens/local/' +ambiente)
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
