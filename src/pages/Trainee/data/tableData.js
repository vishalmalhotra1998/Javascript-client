import * as moment from 'moment';

const getDateFormatted = (date) => moment(date).format('dddd,MMMM Do YYYY, h:mm:ss a');
const tableColumns = [{
  field: 'name',
  label: 'Name',
  align: 'center',
},
{
  field: 'email',
  label: 'Email-Address',
  format: (value) => value && value.toUpperCase(),

},
{
  field: 'createdAt',
  label: 'Date',
  align: 'right',
  format: getDateFormatted,
},
];

export { tableColumns };
