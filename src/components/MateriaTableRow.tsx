import React from 'react'
import { MateriaType } from '../../types';
import moduleStyles from './MateriaTableRow.module.css';

interface Props  {
  elem: MateriaType,
  deleteMateria: (id: string) => void,
  setDataToEdit: any
}

const MateriaTableRow = ({elem, setDataToEdit, deleteMateria}: Props) => {

  return (
    <tr className={moduleStyles.row}>
      <td className={moduleStyles.name}>{elem.nombreMateria}</td>
      <td>{elem.id}</td>
      <td>{elem.cursadaAprobada ? <span className={moduleStyles.success}>Si</span>: <span className={moduleStyles.fail}>No</span>}</td>
      <td>{elem.finalPrevio ? <span className={moduleStyles.fail}>Si</span>: <span className={moduleStyles.success}>No</span>}</td>
      <td>{elem.statusFinal==='finalizada' ? <span className={moduleStyles.exists}>{elem.statusFinal}</span>: <span className={moduleStyles.notfound}>{elem.statusFinal}</span>}</td>
      <td>{elem.correlativaAnterior.length === 0 ? <span className={moduleStyles.notfound}>No tiene</span> : <span className={moduleStyles.exists}>{elem.correlativaAnterior.join(" - ")}</span>}</td>
      <td>{elem.correlativaPosterior.length === 0 ? <span className={moduleStyles.notfound}>No tiene</span> : <span className={moduleStyles.exists}>{elem.correlativaPosterior.join(" - ")}</span>}</td>
      <td>
        <button onClick={() => setDataToEdit(elem)}>Editar</button>
      </td>
      <td>
        <button onClick={() => deleteMateria(elem.id)}>Eliminar</button>
      </td>
    </tr>
  )
}

export default MateriaTableRow;