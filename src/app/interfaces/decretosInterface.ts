export interface Decreto {
  num_decreto: string;
  descripcion: string;
  fecha: string;
  firmado: boolean;
  acabado: boolean;
  departamento?: string; //Campo opcional --> Objetivo que solo se muestre cuando el usuario quiera mostrar los decretos por usuario
}
