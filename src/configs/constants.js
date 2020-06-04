import * as yup from 'yup';

export const PUBLIC_IMAGE_FOLDER = '/images/';
export const DEFAULT_BANNER_IMAGE = 'banner/default.png';
export const imageArray = ['cloud.png', 'dns-server.png', 'full-stack-web-development.jpg', 'js.jpg', 'load-balancer.png'];

export const options = [
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
export const defaultValue = 'Select';

export const ValidateSchema = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .required()
    .label('Name'),
  sport: yup
    .string()
    .required()
    .label('SelectField'),
  cricket: yup
    .string()
    .when('sport', {
      is: 'cricket',
      then: yup.string().required('What do you do  ?'),
    }),
  football: yup
    .string()
    .when('sport', {
      is: 'football',
      then: yup.string().required('What do you do ?'),
    }),

});
