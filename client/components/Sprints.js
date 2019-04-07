import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from "@fortawesome/free-solid-svg-icons";
import {Row, Col, Button, Container} from 'react-bootstrap';
import { httpGET, httpUPDATE } from '../utils/httpUtils';
import moment from 'moment';

const ls = window.localStorage;

export default class Sprints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO
      currentProjectData: {},
      sprintsList: []
    }

    this.generateSprintsView = this.generateSprintsView.bind(this);
    this.onClickDeleteSprint = this.onClickDeleteSprint.bind(this);
    this.onClickAddNewSprint = this.onClickAddNewSprint.bind(this);
    this.onClickViewPastStatistics = this.onClickViewPastStatistics.bind(this);
    this.onClickEditSprint = this.onClickEditSprint.bind(this);
  }

  componentWillMount () {
    let currentProjectId = ls.getItem("currentProjectId");
    if (currentProjectId !== null) {
      httpGET('http://localhost:3001/projects?id=' + currentProjectId)
      .then(response => {
        console.log(response.data);
        let retrievedProject = response.data[0];
        this.setState({currentProjectData: retrievedProject, sprintsList: retrievedProject.sprints})
      })
      .catch(err => {
        console.log(err);
        this.setState({error: 'An error with the server was encountered.'})
      });
    } else {
      window.location = "Projects"
    }
  }

  generateSprintsView() {
    return this.state.sprintsList.map(sprint => {
      let expectedDuration = moment(sprint.endDateTime).diff(moment(sprint.startDateTime), "days");
      return (
        <Row style={{ padding: "10px 0 10px 0" }} key={sprint.id}>
          <Col className="p-col-4">
            <b>{ sprint.name }</b> <br/>
            <i>{ sprint.description }</i>
          </Col>
          <Col className="p-col-3">
            <b>Expected Duration</b><br/>
            { expectedDuration } Days
          </Col>
          <Col className="p-col-3">
            <b>Expected Costs</b> <br/>
            ${ sprint.budget }
          </Col>
          <Col className="p-col-2" style={{ 'float': 'right', 'marginLeft':'60px'}}>
            <Button onClick={() => this.onClickEditSprint()} variant='warning' style={{marginRight: '5px'}}>
                <FontAwesomeIcon icon={fa.faEdit} />
            </Button>

            <Button onClick={() => this.onClickDeleteSprint(sprint.id)} variant='danger' style={{marginRight: '5px'}}>
              <FontAwesomeIcon icon={fa.faTrash} />
            </Button>

          </Col>
          <div className='col-md-12'><hr/></div>
        </Row>
      )
    })
  }

  onClickAddNewSprint() {
    window.location = "AddEditSprint"
  }

  onClickViewPastStatistics() {
    window.location = "SprintStatistics"
  }

  onClickEditSprint(sprintId) {
    ls.setItem("currentSprintId",sprintId)
    window.location = "AddEditSprint"
  }

  onClickDeleteSprint(sprintId) {
    if (confirm("Are you sure you want to delete this sprint?")) {
      let currentProjectId = ls.getItem("currentProjectId");
      let newSprintsList = this.state.sprintsList.filter(sprint => {return sprint.id !== sprintId});
      let currentProjectData = this.state.currentProjectData;

      currentProjectData.sprints = newSprintsList

      httpUPDATE('http://localhost:3001/projects/' + currentProjectId, currentProjectData)
      .then(response => {
        console.log(response.data);
        this.setState({sprintsList: newSprintsList, currentProjectData: currentProjectData})
      })
       .catch(err => {
        console.log(err);
        this.setState({error: 'An error with the server was encountered.'})
      });
    }
  }

  // Displays the HTML to the user
  render() {
    return (
      <Container>
        <Helmet>
          <title>Sprints</title>
          <meta name="description" content="Sprints" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
            <Row>
              <Col className="p-col-12">
              <Row>
                <Col className="p-col-12" style={{ textAlign : 'center'}}>
                  <h1>Sprints{ " for " + ls.getItem("currentProjectName")}</h1>
                </Col>
              </Row>

              <Row>
                <Col className="p-col-12" >
                  <Button onClick={() => this.onClickAddNewSprint()} style={{marginRight: '5px'}}>
                    <FontAwesomeIcon icon={fa.faPlus} /> &nbsp;New Sprint
                  </Button>
                  <Button onClick={() => this.onClickViewPastStatistics()} variant='info' style={{marginRight: '5px'}}>
                    <FontAwesomeIcon icon={fa.faPlus} /> &nbsp;Past Statistics
                  </Button>
                  <span style={{float:'right'}}>
                    <b>Total Cost:</b> $
                    {
                      this.state.sprintsList ?
                        this.state.sprintsList.reduce((cumulativeCost, sprint) => { return cumulativeCost + sprint.budget }, 0) : 0
                    }
                  </span>
                </Col>
              </Row>
              <hr/>
              {
                // TODO
                this.state.sprintsList && this.generateSprintsView()
              }
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    );
  }
}
