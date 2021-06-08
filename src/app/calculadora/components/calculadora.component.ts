import { Component, OnInit,HostListener } from '@angular/core';
import { CalculadoraService} from '../services';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private numero1: string;
  private numero2: string;
  private resultado: number;
  private operacao: string;

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit(): void {
    this.limpar();
  }

  /**
   * Funcao para pegar a tecla digitada
   * 
   * @param event evento
   */
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    let numeros = ['0','1','2','3','4','5','6','7','8','9','.',','];
    let operadores = ['+','-','*','/'];
    let limpar = ['c','Backspace','Delete'];
    let result = ['=','Enter'];
    console.log(event);
    
    //se a tecla digitada for de 0 a 9 chama a funcao adicionarNumero
    if(numeros.includes(event.key)){
      this.adicionarNumero(event.key);
    }
    if(operadores.includes(event.key)){
      this.definirOperacao(event.key);
    } 
    if(limpar.includes(event.key)) {
      this.limpar();
    }
    if(result.includes(event.key)){
      this.calcular();
    }
    
  }

  limpar(): void{
    this.numero1 = '0';
    this.numero2 = null;
    this.resultado = null;
    this.operacao = null;
  }

  adicionarNumero(numero:string): void{
    if(this.operacao === null){
      this.numero1 = this.concatenarNumero(this.numero1,numero);
    }else{
      this.numero2 = this.concatenarNumero(this.numero2,numero);
    }
  }

  concatenarNumero(numAtual: string, numConcat: string): string{
    //caso contenha apenas 0 ou null reinicia o valor
    if(numAtual === '0' || numAtual === null){
      numAtual = '';
    }
    
    //primeiro digito é ., concatena 0  antes do ponto
    if((numConcat === '.'|| numConcat === ',' ) && numAtual === ''){
      return '0.';
    }

    //caso o numero digitado ja contenha  um . apenas retorna
    if((numConcat === '.'|| numConcat === ',' ) && numAtual.indexOf('.') > -1){
      return numAtual;
    }

    return numAtual + numConcat;
  }

  definirOperacao(operacao:string): void{
    //apenas define a operação
    if (this.operacao === null) {
      this.operacao = operacao;
      return;
  	}

    if(this.numero2 !== null){
      this.resultado = this.calculadoraService.calcular(
        parseFloat(this.numero1),
        parseFloat(this.numero2),
        this.operacao);
      this.operacao = operacao;
      this.numero1 = this.resultado.toString();
      this.numero2 = null;
      this.resultado = null;
    }
  }

  calcular():void{
    if(this.numero2 === null){
      return;
    }

    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.numero1),
      parseFloat(this.numero2),
       this.operacao);
  }

  get display():string{
    if(this.resultado !== null){
      return this.resultado.toString();
    }
    if(this.operacao !== null && this.numero2 === null){
      return this.numero1 + this.operacao;
    }
    if(this.numero2 !== null){
      return this.numero1 + this.operacao + this.numero2;
    }
    return this.numero1; 

    
  }
  
}
