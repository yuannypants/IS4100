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
      data: [
        {
          "Activity":"Task A",
          "Work allocated (%)":"70",
          "Duration (Hr)":"20",
		  "Request Addition Hours":"4",
        },
        {
          "Activity":"Task B",
          "Work allocated (%)":"50",
          "Duration (Hr)":"10",
		  "Request Addition Hours":"2",
        },
        {
          "Activity":"Task C",
          "Work allocated (%)":"20",
          "Duration (Hr)":"5",
		  "Request Addition Hours":"1",
        }
      ],
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
      <Container>
        <Helmet>
          <title>Developer Dashboard</title>
          <meta name="description" content="Home" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
			<Row style={{ 'text-align' : 'center'}}>
                <Col md={{span:12}}> <h1>Developer Dashboard</h1> <br/> </Col>
            </Row>
			<Row style={{ 'marginTop' : '-20px', 'marginBottom':'-25px', 'fontWeight':'bold'}}>
                <Col md={{span:12}}> <p>Current Tasks Assigned</p> <br/> </Col>
            </Row>
            {
              this.state.data && <JsonToTable json={this.state.data} />
            }
          </div>
        </div>
      </Container>
    );
  }
}
