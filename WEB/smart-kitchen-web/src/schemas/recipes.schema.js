import * as Yup from 'yup';

export const recipeSchema = Yup.object({
  name: Yup
    .string('Name err')
    .required('Required'),
  ingredients: Yup
    .string('Enter ingredients err')
    .required('Required'),
    instructions: Yup
    .string('Enter instructions err')
    .required('Required'),
})


