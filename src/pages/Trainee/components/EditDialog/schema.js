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

});

export default FormSchema;
