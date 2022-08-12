import React, {ChangeEvent, useState} from 'react';
import { MateriaType } from '../../types';
import MateriaTableRow from './MateriaTableRow';
import moduleStyles from './MateriaTable.module.css';

interface Props {
	data: MateriaType[],
  deleteMateria: (id: string) => void,
  setDataToEdit: any
  showMaterias: (option: string) => void
}


const MateriaTable = ({data, deleteMateria, setDataToEdit, showMaterias}: Props) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    showMaterias(e.target.value);
  }

  return (
    <div>
      <h3>Tabla de Materias</h3>
      <p>Aplica cualquiera de los siguientes filtros:</p>
      <form action="" className={moduleStyles.filtros}>
        <fieldset>
          <input
            type="radio"
            id="all"
            name="materias"
            value="todas"
            defaultChecked
            onChange={handleChange}
            />
          <label htmlFor="all">Todas las materias</label>
        </fieldset>
        <fieldset>
          <input
            type="radio"
            id="cursables"
            name="materias"
            value="cursables"
            onChange={handleChange}
            />
          <label htmlFor="cursables">Materias que puedes cursar</label>
        </fieldset>
          <fieldset>
          <input
            type="radio"
            id="cursadas-aprobadas"
            name="materias"
            value="cursadas-aprobadas"
            onChange={handleChange}
          />
          <label htmlFor="cursadas-aprobadas">Materias Finalizadas</label>
        </fieldset>
        <fieldset>
          <input
            type="radio"
            id="finales-previos"
            name="materias"
            value="finales-previos"
            onChange={handleChange}
            />
          <label htmlFor="finales-previos">Finales Previos</label>
        </fieldset>
      </form>
      <table>
        <thead>
          <tr>
            <th>Nombre Materia</th>
            <th>Id de la Materia</th>
            <th>Cursada Aprobada</th>
            <th>Final Previo</th>
            <th>Estado de la Materia</th>
            <th>Correlativas Anteriores</th>
            <th>Correlativas Posteriores</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 
          ? <tr><td colSpan={7}>Sin datos</td></tr> 
          : data.map((elem) => <MateriaTableRow key={elem.id} elem={elem} setDataToEdit={setDataToEdit} deleteMateria={deleteMateria}/>) 
          }
        </tbody>
      </table>
    </div>
  )
}

export default MateriaTable;