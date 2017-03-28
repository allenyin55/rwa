import moment from 'moment-timezone';

export default (date) =>{
	return moment.tz(date, 'Zulu').tz('America/Los_Angeles').format().substring(0, 10);
}