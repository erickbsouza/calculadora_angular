/**
 * Serviço responsável por 
 * executar as operações da calculadora
 * 
 * @author Erick Souza <erickbarroso09@gmail.com>
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  /*   Constantees utilizadas
        para identificar as operacoes de calculo */
  static readonly SOMA: string = '+';
  static readonly SUBTRACAO: string = '-';
  static readonly DIVISAO: string = '/';
  static readonly MULTIPLICACAO: string = '*';

  constructor() { }

  /**
   * Método que calcula uma operação matemática
   * dado dois numeros.
   * Suporta as operações de soma, subtração, divisão
   * e multiplicação.
   * 
   * @param num1 number primeiro numero da operação
   * @param num2 number segundo numero da operação
   * @param operacao string Operação a ser executada
   * @returns number Resultado da operação
   */
  calcular(num1: number,num2:number,operacao:string): number{
    let resultado: number; //armazena o resultado da operação
    
    switch(operacao){
      case CalculadoraService.SOMA:
        resultado = num1 + num2;
      break;
      case CalculadoraService.SUBTRACAO:
        resultado = num1 - num2;
      break;
      case CalculadoraService.DIVISAO:
        resultado = num1 / num2;
      break;
      case CalculadoraService.MULTIPLICACAO:
        resultado = num1 * num2;
      break;
      default:
        resultado = 0;
    }

    return resultado;
  }
}
