import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { httpGET } from '../utils/httpUtils';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);

export default class Calendar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BigCalendar
        localizer={localizer}
        events={this.props.events}
        startAccessor="start"
        endAccessor="end"
        defaultView={this.props.showAgenda ? 'agenda' : 'month' }
      />
    )
  }
}
