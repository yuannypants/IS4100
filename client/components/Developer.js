import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { JsonToTable } from 'react-json-to-table';
import { httpGET } from '../utils/httpUtils';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Row, Col, Button} from 'react-bootstrap';
import {Container} from 'react-bootstrap';

export default class Developer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
        // [
        //   {
        //     "SprintName": "Sprint #1",
        //     "SprintDescription": "System release #1",
        //     "SprintStartDate": "2019-02-04",
        //     "SprintEndDate": "2019-02-09",
        //     "Tasks": [
        //       {
        //         "TaskName": "Task #1",
        //         "TaskDescription": "Coding backend",
        //         "TaskStartDate": "2019-02-04",
        //         "TaskEndDate": "2019-02-09",
        //         "Tags": [{ "id": "Python", "text": "Python" }, { "id": "SQL", "text": "SQL" }]
        //       }
        //     ]
        //   },
        //   {
        //     "SprintName": "Sprint #2",
        //     "SprintDescription": "System release #2",
        //     "SprintStartDate": "2019-02-11",
        //     "SprintEndDate": "2019-02-16",
        //     "Tasks": [
        //       {
        //         "TaskName": "Task #1",
        //         "TaskDescription": "Coding frontend",
        //         "TaskStartDate": "2019-02-11",
        //         "TaskEndDate": "2019-02-16",
        //         "Tags": [{ "id": "Python", "text": "Python" }, { "id": "SQL", "text": "SQL" }]
        //       }
        //     ]
        //   },
        //   {
        //     "SprintName": "Sprint #3",
        //     "SprintDescription": "Final system release",
        //     "SprintStartDate": "2019-02-18",
        //     "SprintEndDate": "2019-02-23",
        //     "Tasks": [
        //       {
        //         "TaskName": "Task #1",
        //         "TaskDescription": "Integrating backend and frontend",
        //         "TaskStartDate": "2019-02-18",
        //         "TaskEndDate": "2019-02-23",
        //         "Tags": [{ "id": "Python", "text": "Python" }, { "id": "SQL", "text": "SQL" }]
        //       }
        //     ]
        //   },
        //   {
        //     "SprintName": "Sprint #1",
        //     "SprintDescription": "System release #1",
        //     "SprintStartDate": "2019-02-25",
        //     "SprintEndDate": "2019-03-02",
        //     "Tasks": [
        //       {
        //         "TaskName": "Task #1",
        //         "TaskDescription": "Coding backend",
        //         "TaskStartDate": "2019-02-25",
        //         "TaskEndDate": "2019-03-02",
        //         "Tags": [{ "id": "Java", "text": "Java" }, { "id": "SQL", "text": "SQL" }]
        //       }
        //     ]
        //   },
        //   {
        //     "SprintName": "Sprint #2",
        //     "SprintDescription": "System release #2",
        //     "SprintStartDate": "2019-03-04",
        //     "SprintEndDate": "2019-03-09",
        //     "TasksList": [
        //       {
        //         "TaskName": "Task #1",
        //         "TaskDescription": "Coding frontend",
        //         "TaskStartDate": "2019-03-04",
        //         "TaskEndDate": "2019-03-09",
        //         "Tags": [{ "id": "Java", "text": "Java" }, { "id": "SQL", "text": "SQL" }]
        //       }
        //     ]
        //   },
        //   {
        //     "SprintName": "Sprint #3",
        //     "SprintDescription": "Final system release",
        //     "SprintStartDate": "2019-03-11",
        //     "SprintEndDate": "2019-03-16",
        //     "TasksList": [
        //       {
        //         "TaskName": "Task #1",
        //         "TaskDescription": "Integrating backend and frontend",
        //         "TaskStartDate": "2019-03-11",
        //         "TaskEndDate": "2019-03-16",
        //         "Tags": [{ "id": "Java", "text": "Java" }, { "id": "SQL", "text": "SQL" }]
        //       }
        //     ]
        //   }
        // ]
    }
  }

  componentWillMount () {
    httpGET('http://localhost:3001/projects')
    .then(response => {
      console.log(response.data);


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
          <div className="card card-w-title">
			      <h1>Developer Dashboard</h1>
            <div className="p-col-12">
              <p style={{ marginTop: '-20px', marginBottom:'-25px', fontWeight:'bold'}}>You have been assigned to these following tasks:</p>
            </div>
            {
              this.state.data && <JsonToTable json={this.state.data} />
            }
          </div>
        </div>
      </div>
    );
  }
}
