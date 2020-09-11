import { Component, OnInit, Input } from "@angular/core";
import { EstudianteModel } from "src/app/models/EstudianteModel";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";
import { ServiceService } from "src/app/services/service.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-crear-estudiante",
  templateUrl: "./crear-estudiante.component.html",
  styleUrls: ["./crear-estudiante.component.scss"],
})
export class CrearEstudianteComponent implements OnInit {

  @Input() estudiante = new EstudianteModel();
  @Input() mostrar: boolean = true;
  
  public copy: string;
  showAge:any;
  f = new Date();
  fecha:any = (this.f.getFullYear()) + "-" + 0 + (this.f.getMonth() +1) + "-" +  this.f.getDate();

  constructor(private _services: ServiceService, private modal: NgbModal) {}

  ngOnInit() {
  }

  // Al reutilizar este componente valido de que componente lo estoy llamando y así ejecuto los metodos correspondientes.

  onSubmit(f: NgForm) {
    
    if (f.invalid) {
      Swal.fire({
        icon: "error",
        title: "Campos vacíos!",
        text: "Por favor llene todos los campos.",
      });
      return;
    }

    if(this.fecha<=this.estudiante.fecha_nacimiento){
      Swal.fire({
        icon: "error",
        title: "Datos invalidos!",
        text: "La fecha de nacimiento no puede ser mayor o igual a la fecha actual.",
      });
      return;
    }

    this.validarEdadxExperiencia();
    if(this.showAge<this.estudiante.experiencia){
      Swal.fire({
        icon: "error",
        title: "Datos invalidos!",
        text: "La experiencia adquirida no puede ser igual o mayor a su edad.",
      });
      return;
    }

    Swal.fire({
      icon: "info",
      title: "Guardando información",
      text: "Espere un momento por favor...",
    });

    Swal.showLoading();

    if (this.mostrar) {
      this._services.crearEstudiante(this.estudiante).subscribe((resp) => {
        Swal.fire({
          icon: "success",
          title: "Guardado correctamente!",
        });
        f.reset();
      });
    } else {
      this._services.editarEstudiante(this.estudiante).subscribe((resp) => {
        Swal.fire({
          icon: "success",
          title: "Editado correctamente!",
        });
        this.modal.dismissAll();
      });
    }
  }

  // Validación para que la experiencia no sea mayor a la experiencia que tiene.

  validarEdadxExperiencia(){
    const convertAge = new Date(this.estudiante.fecha_nacimiento);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
  }

  // Validación para no permitir caracteres especiales en el campo numerico.

  keyPress(event: any) {
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);
    
        if (!pattern.test(inputChar)) {    
          // invalid character, prevent input
          event.preventDefault();
        }
  }
}
