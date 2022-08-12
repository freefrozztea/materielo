export type MateriaType = {
  nombreMateria: string,
  cursadaAprobada: boolean,
  finalPrevio: boolean,
  id: string,
  statusFinal: string,
  correlativaAnterior: string[],
  correlativaPosterior: string[]
}