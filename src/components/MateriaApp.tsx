import React, { useState } from 'react';
import { MateriaType } from '../../types';
import data from '../db/data-materias.json';
import MateriaForm from './MateriaForm';
import MateriaTable from './MateriaTable';

// let data: MateriaType[] = [];


let materiasFinalizadas: MateriaType[] = data.filter(materia => (materia.cursadaAprobada && !materia.finalPrevio));
let finalesUrgentes: MateriaType[] = data.filter(materia => materia.cursadaAprobada && materia.finalPrevio);
let idsMateriasFinalizadas: string[] = materiasFinalizadas.map(materia => materia.id);
const verCorrelativasAnterioresAprobadas = (id: string) => idsMateriasFinalizadas.includes(id);
let materiasUrgentes: MateriaType[] = 
  data
  .filter(materia => !materia.cursadaAprobada 
    && (materia.correlativaAnterior.length === 0 || materia.correlativaAnterior.every(verCorrelativasAnterioresAprobadas)));

const options = {
  "todas" : data,
  "cursables": materiasUrgentes,
  "cursadas-aprobadas": materiasFinalizadas,
  "finales-previos": finalesUrgentes,
}

const MateriaApp = () => {

  const [db, setDb] = useState(data);
  const [editData, setEditData] = useState<MateriaType|null>(null);

  const createMateria = (data: MateriaType) => {
    data.id = `${Date.now()}`;
    data.statusFinal = (data.cursadaAprobada && !data.finalPrevio) ? 'finalizada' : 'pendiente';
    setDb([
      ...db,
      data
    ]);
  }

  const updateMateria = (data: MateriaType) => {
    data.statusFinal = (data.cursadaAprobada && !data.finalPrevio) ? 'finalizada' : 'pendiente';
    let newData = db.map(elem => elem.id === data.id ? data : elem);
    setDb([...newData]);
  }

  const deleteMateria = (id: string) => {
    let isDelete = window.confirm(`¿Estás seguro de eliminar el registro con el id ${id}?`)

    if(isDelete){
      let newData = db.filter(elem => elem.id !== id);
      setDb([...newData]); 
    }
    return;
  }

  const showMaterias = (option: string) => {
    let datos = options[option as keyof typeof options]
    setDb([...datos])
  }

  return (
    <>
      <h2>Materielo</h2>
      <MateriaForm 
        createMateria={createMateria}
        updateMateria={updateMateria}
        dataToEdit={editData}
        setDataToEdit={setEditData}
      />
      <MateriaTable 
        data={db} 
        deleteMateria={deleteMateria}
        setDataToEdit={setEditData}
        showMaterias={showMaterias}
      />
    </>
  )
}

export default MateriaApp;