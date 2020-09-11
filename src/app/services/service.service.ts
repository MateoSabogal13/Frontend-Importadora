import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { EstudianteModel } from "../models/EstudianteModel";

const URL = environment.url;

@Injectable({
  providedIn: "root",
})
export class ServiceService {
  infoLogin: any[] = [];

  constructor(private http: HttpClient) {}

  /* Guardar información del estudiante en la BD */

  crearEstudiante(e: EstudianteModel) {
    return this.http.post(`${URL}/create_estudiante`, e);
  }

  /* Fin */

  /* Guardar información del estudiante en la BD */

  editarEstudiante(e: EstudianteModel) {
    return this.http.post(`${URL}/edit_estudiante`, e);
  }

  /* Fin */

  /* Guardar información del estudiante en la BD */

  eliminarEstudiante(e: EstudianteModel) {
    return this.http.post(`${URL}/delete_estudiante`, e);
  }

  /* Fin */

  /* Traer los estudiantes */

  getEstudiantes() {
    return this.http.get(`${URL}/get_estudiantes`);
  }

  /* Fin */

  /* Traer los estudiantes filtro */

  getBuscarEstudiantes(e: string) {
    const infoToken = {
      e: e,
    };
    return this.http.post(`${URL}/buscar_estudiante`, infoToken);
  }

  /* Fin */
}
