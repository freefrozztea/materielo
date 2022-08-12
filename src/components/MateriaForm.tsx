import React, { useState, useEffect, ChangeEvent, FormEvent, MouseEventHandler } from 'react';
import { MateriaType } from '../../types';
import moduleStyles from './MateriaForm.module.css';

const initialForm = {
  nombreMateria: "",
  cursadaAprobada: false,
  finalPrevio: false,
  id: "",
  statusFinal: "pendiente",
  correlativaAnterior: [],
  correlativaPosterior: []
}

interface Props {
  setDataToEdit: any,
  dataToEdit: MateriaType|null,
  createMateria: (data: MateriaType) => void,
  updateMateria: (data: MateriaType) => void,
}

const MateriaForm = ({setDataToEdit, dataToEdit, createMateria, updateMateria}: Props) => {
  
  const [form, setForm] = useState<MateriaType>(initialForm);

  useEffect(() => {
    dataToEdit ? setForm(dataToEdit) : setForm(initialForm);
  }, [dataToEdit]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.type === 'checkbox' 
    ? setForm({
        ...form,
        [e.target.name]: e.target.checked,
      }) 
    : setForm({
        ...form,
        [e.target.name]: e.target.value,
      })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      (!form.nombreMateria) && alert('Complete los datos');
      form.id === '' ? createMateria(form) : updateMateria(form);

      handleReset(e);
  }

  const handleReset = (e: any) => {
    e.preventDefault();
    setForm(initialForm);
    setDataToEdit(null);
  }
  
  return (
    <article className={moduleStyles.form_container}>
      <h3>{dataToEdit ? <span>Editar </span> : <span>Agregar </span>}Materia</h3>
      <form action="" onSubmit={handleSubmit} className={moduleStyles.form}>
        <input 
          type="text" 
          name='nombreMateria' 
          placeholder="Nombre Materia"
          onChange={handleChange}
          value={form.nombreMateria}
          />
        <input 
          type="text" 
          name='id' 
          placeholder="Id de la materia"
          onChange={handleChange}
          value={form.id}
        />
        <label htmlFor="cursada">Cursada Aprobada</label>
        <input 
          type="checkbox"
          id="cursada"
          name="cursadaAprobada"
          placeholder="Cursada Aprobada"
          onChange={handleChange}
          checked={form.cursadaAprobada}
        />
        <label htmlFor="final">Final Previo</label>
        <input 
          type="checkbox"
          id="finalPrevio"
          name="finalPrevio"
          placeholder="Final Previo"
          onChange={handleChange}
          checked={form.finalPrevio}
        />
        <button type='submit'>Enviar</button>
        <button type='button' onClick={handleReset}>Limpiar</button>

      </form>
    </article>
  )
}

export default MateriaForm;