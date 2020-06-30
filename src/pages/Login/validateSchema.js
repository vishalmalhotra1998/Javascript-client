import * as yup from 'yup';

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .label('Email Address'),
  password: yup
    .string()
    .required()
    .label('password'),
});
export default signInSchema;
