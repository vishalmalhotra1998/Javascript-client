import * as yup from 'yup';

const FormSchema = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .required()
    .label('Name'),
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
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Must match password')
    .required()
    .label('Confirm password'),

});

export default FormSchema;
