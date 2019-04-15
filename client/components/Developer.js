import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { httpGET } from '../utils/httpUtils';
import Calendar from './Calendar'
import moment from './Sprints'

export default class Developer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    }
  }

  componentWillMount () {
    httpGET('http://localhost:3001/calendar')
    .then(response => {
      console.log(response.data);
      let calendarEvents = response.data;
      let events = [];

      for (let event of calendarEvents) {
        events.push({
          title: event.projectName + ": " + event.sprintName + " - " + event.taskName + " (" + event.username + ")",
          start: moment(event.startDateTime).toDate(),
          end: moment(event.endDateTime).toDate()
        });
      }
      this.setState({events: events})
    })
    .catch(err => {
      console.log(err);
      this.setState({error: 'An error with the server was encountered.'})
    });
  }

  render() {
    return (
      <div className="p-grid">
        <Helmet>
          <title>Developer Dashboard</title>
          <meta name="description" content="Home" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title" style={{height: window.innerHeight}}>
			      <h1>Developer Dashboard</h1>
            <Calendar events={this.state.events} showAgenda={true}/>
          </div>
        </div>
      </div>
    );
  }
}
