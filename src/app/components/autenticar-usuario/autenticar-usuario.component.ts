import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-autenticar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent {

mensagem: string = '';

constructor(
  private httpClient: HttpClient
){}

form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.required]),
  senha: new FormControl('', [Validators.required, Validators.minLength(8)])
});

get f(){
  return this.form.controls;
}

onSubmit(){

  this.httpClient.post( environment.apiUsuarios + '/api/usuarios/autenticar', this.form.value)
  .subscribe({
    next: (data: any) => {
      
      localStorage.setItem('auth', JSON.stringify(data));

      location.href = 'pages/consultar-contas'
    },

    error:(e) => {
      this.mensagem = e.error[0];
    }
  });

}




}