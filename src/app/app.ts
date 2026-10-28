import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FraudService } from './services/fraud';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'Detección de Fraude ML';

  // Datos del formulario para los modelos XGBoost (100, 50, 25)
  formData: any = {
    dataset: '100',
    Time: 0,
    Amount: 149.62,
    V1: -1.359807, V2: -0.072781, V3: 2.536347, V4: 1.378155,
    V5: 0, V6: 0, V7: 0, V8: 0, V9: 0, V10: 0,
    V11: 0, V12: 0, V13: 0, V14: 0, V15: 0, V16: 0,
    V17: 0, V18: 0, V19: 0, V20: 0, V21: 0, V22: 0,
    V23: 0, V24: 0, V25: 0, V26: 0, V27: 0, V28: 0
  };

  resultado: any = null;
  cargando: boolean = false;
  reentrenando: boolean = false;
  mensajeReentrenamiento: string | null = null;

  constructor(private fraudService: FraudService) {}

  // Método para hacer la predicción enviando el dataset seleccionado
  onSubmit() {
    this.cargando = true;
    this.resultado = null;

    this.fraudService.predecirFraude(this.formData).subscribe({
      next: (response) => {
        this.resultado = response;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al conectar con la API:', err);
        alert('Ocurrió un error al procesar la predicción. Revisa los logs en la consola.');
        this.cargando = false;
      }
    });
  }

  // Método opcional para disparar el reentrenamiento desde la interfaz
  onRetrain() {
    this.reentrenando = true;
    this.mensajeReentrenamiento = null;

    this.fraudService.reentrenarModelo().subscribe({
      next: (res) => {
        this.mensajeReentrenamiento = '¡Reentrenamiento disparado con éxito en GitHub Actions!';
        this.reentrenando = false;
      },
      error: (err) => {
        console.error('Error al reentrenar:', err);
        this.mensajeReentrenamiento = 'Error al intentar reentrenar el modelo.';
        this.reentrenando = false;
      }
    });
  }
}