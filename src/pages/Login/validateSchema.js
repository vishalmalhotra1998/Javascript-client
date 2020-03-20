import * as yup from 'yup';

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .label('Email Address'),
  password: yup
    .string()
    .min(8, 'Must contain 8 character, at least one uppercase,one lowercase letter and one number')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required()
    .label('password'),
});
export default signInSchema;
