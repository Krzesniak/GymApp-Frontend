export interface TrainingDetails {
  id: string,
  date: Date
  name: string,
  duration: any,
  urlImage: string,
  note: string,
  trainingType: string,
  description: string,
  exerciseResults: ExerciseTraining []
}
export interface ExerciseTraining{
  "id": string,
  "name": string
  "urlImage": string,
  "results": Results[]
}
export interface Results{
  weight: number,
  repetitions: number,
  seriesNumber: number,
  duration: Date
}
