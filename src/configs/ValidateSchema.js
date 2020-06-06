import * as yup from 'yup';

export const ValidateSchema = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .required()
    .label('Name'),
  sport: yup
    .string()
    .required()
    .label('Sport'),
  cricket: yup
    .string()
    .when('sport', {
      is: 'cricket',
      then: yup.string().required().label('What you do'),
    }),
  football: yup
    .string()
    .when('sport', {
      is: 'football',
      then: yup.string().required().label('What you do'),
    }),
});
