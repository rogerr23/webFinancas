import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {

  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(
    private HttpClient: HttpClient
  ) { }

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
  });

  get f() {
    return this.form.controls;

  }

  onSubmit() {

    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.HttpClient.post(environment.apiUsuarios + "/api/usuarios/criar", this.form.value)
      .subscribe({
        next: (data: any) => {
          this.mensagemSucesso = `Parabéns, ${data.nome}, seu cadastro foi realizado com sucesso`
          this.form.reset();
        },

        error: (e) => {
          this.mensagemErro = e.error[0];


        }
      });

  }


}
