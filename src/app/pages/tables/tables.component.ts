import { Component, OnInit } from '@angular/core';
import { EstudianteModel } from 'src/app/models/EstudianteModel';
import { ServiceService } from 'src/app/services/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  estudiante:EstudianteModel;
  eArray:EstudianteModel[]=[];
  cargando:boolean=true;
  constructor(private _services:ServiceService, private modalServies:NgbModal) { }

  ngOnInit() {
    this.getEstudiantes();
  }

  getEstudiantes(){
    this._services.getEstudiantes().subscribe((resp:EstudianteModel[])=>{
      this.eArray=resp;
      this.cargando=false;
    });
  }

  buscarEstudiantes(nombre:string){
    this._services.getBuscarEstudiantes(nombre).subscribe((resp:EstudianteModel[])=>{
      
      this.eArray=resp;
    });
  }

  open(content, e:EstudianteModel){
    this.estudiante=e;
    this.modalServies.open(content,{size:'lg'});
  }

  eliminar(e:EstudianteModel){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estás seguro(a)?',
      text: "Eliminarás el estudiante:" + e.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo hacerlo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          icon: "info",
          title: "Guardando información",
          text: "Espere un momento por favor...",
        });
    
        Swal.showLoading();
        this._services.eliminarEstudiante(e).subscribe((resp)=>{
          
          this.getEstudiantes();
          swalWithBootstrapButtons.fire(
            'Eliminado correctamente!',
            'El estudiante ha sido eliminado.',
            'success'
          );
          
        });
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Por poco eliminar el estudiante :)',
          'error'
        )
      }
    })
  }

}
