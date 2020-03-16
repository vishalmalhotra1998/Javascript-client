import * as yup from 'yup';

export const PUBLIC_IMAGE_FOLDER = '/images/';
export const DEFAULT_BANNER_IMAGE = 'banner/default.png';
export const imageArray = ['cloud.png', 'dns-server.png', 'full-stack-web-development.jpg', 'js.jpg', 'load-balancer.png'];

export const Options = [
  {
    label: 'Cricket',
    value: 'cricket',
  },
  {
    label: 'Football',
    value: 'football',

  },
];

export const radioCricketOptions = [
  {
    label: 'Batsmen',
    value: 'batsmen',
  },
  {
    label: 'Bowler',
    value: 'bowler',
  },
  {
    label: 'WicketKeeper',
    value: 'wicketkeeper',
  },
  {
    label: 'AllRounder',
    value: 'allrounder',
  },
];
export const radioFootballOptions = [
  {
    label: 'Striker',
    value: 'striker',
  },
  {
    label: 'Defender',
    value: 'defender',
  },
];

export const CRICKET = 'cricket';
export const Default = 'Select';

export const ValidateSchema = yup.object().shape({
  text: yup
    .string()
    .required('Name is a required Field')
    .min(3)
    .matches('^[A-Za-z\\s]+$')
    .label('Name'),
  SelectField: yup
    .string()
    .required()
    .label('SelectField'),
  cricket: yup
    .string()
    .when('SelectField', {
      is: 'cricket',
      then: yup.string().required('What do you do  ?'),
    }),
  football: yup
    .string()
    .when('SelectField', {
      is: 'football',
      then: yup.string().required('What do you do ?'),
    }),

});
