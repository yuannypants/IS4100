import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from "@fortawesome/free-solid-svg-icons";
import {Row, Col, Button, Container, InputGroup, FormControl } from 'react-bootstrap';
import { httpGET, httpPOST, httpUPDATE } from '../utils/httpUtils'
import moment from 'moment';

const ls = window.localStorage;

export default class EditSprint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO
      currentProjectData: {},
      sprintsList: [],
      currentSprintData: {},
      tasksList: []
    }

    this.generateTasksView = this.generateTasksView.bind(this);
    this.generateSprintDetails = this.generateSprintDetails.bind(this);
    this.onClickDeleteTask = this.onClickDeleteTask.bind(this);
    this.onClickAddNewTask = this.onClickAddNewTask.bind(this);
    this.onClickEditTask = this.onClickEditTask.bind(this);

  }

  componentWillMount () {
    let currentProjectId = ls.getItem("currentProjectId");
    let currentSprintId = parseInt(ls.getItem("currentSprintId"),10);

    if (currentProjectId !== null) {
      httpGET('http://localhost:3001/projects?id=' + currentProjectId)
      .then(response => {
        // console.log(response.data);
        let retrievedProject = response.data[0];

        if (currentSprintId !== null) {
          this.setState({
            currentProjectData: retrievedProject,
            sprintsList: retrievedProject.sprints,
            currentSprintData: retrievedProject.sprints.filter(sprint => {return sprint.id === currentSprintId})[0],
            tasksList: retrievedProject.sprints.filter(sprint => {return sprint.id === currentSprintId})[0].tasks
          })
        } else {
          this.setState({
            currentProjectData: retrievedProject,
            sprintsList: retrievedProject.sprints,
            currentSprintData: {
              name: "",
              description: "",
              startDateTime: moment().format(),
              endDateTime: moment().format(),
              cost: 0,
              tasks: [],
            },
            tasksList: []
          })
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({error: 'An error with the server was encountered.'})
      });
    } else {
      window.location = "Projects"
    }
  }

  generateTasksView() {
    return this.state.tasksList.map(task => {
      let expectedDuration = moment(task.endDateTime).diff(moment(task.startDateTime), "days");
      return (
        <div className="p-grid" key={task.id}>
          <hr/>
          <div className="p-col-4">
            <b>{ task.name } </b> <br/>
            <i>{ task.description }</i>
          </div>
          <div className="p-col-3">
            <b>Expected Duration</b> <br/>
            { expectedDuration } Days
          </div>
          <div className="p-col-3">
            <b>Expected Costs</b> <br/>
            $ { task.cost }
          </div>
          <div className="p-col-2">
            <Button onClick={() => this.onClickEditTask()} variant='warning' style={{marginRight: '5px'}}>
              <FontAwesomeIcon icon={fa.faEdit} />
            </Button>

            <Button onClick={(e) => this.onClickDeleteTask(task.id)} variant='danger' style={{marginRight: '5px'}}>
               <FontAwesomeIcon icon={fa.faTrash} />
            </Button>
          </div>
          <hr/>
        </div>
      )
    })
  }

  generateSprintDetails() {
    let currentSprintData = this.state.currentSprintData;
    return (
      currentSprintData && (
        <div className="p-grid">
          <div className="p-col-6">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
              <InputGroup.Text id="sprint_name">Sprint Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl placeholder="Name of sprint" aria-label="Sprint name" aria-describedby="sprint_name" value={ currentSprintData.name } />
            </InputGroup>
          </div>
          <div className="p-col-6"> </div>

          <div className="p-col-6">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
              <InputGroup.Text id="sprint_startDateTime">Start Date</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl placeholder="Sprint Due Date" aria-label="Sprint due date" aria-describedby="sprint_startDateTime" value={ moment(currentSprintData.startDateTime).format('L') } />
            </InputGroup>
          </div>
          <div className="p-col-6"> </div>

          <div className="p-col-5">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
              <InputGroup.Text id="sprint_cost">Baseline Budget</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl placeholder="Baseline Sprint Budget ($)" aria-label="Baseline sprint cost" aria-describedby="sprint_cost" value={ currentSprintData.cost }/>
            </InputGroup>
          </div>
          <div className="p-col-3">
            <Button variant='info'>
              Suggest Budget &nbsp;
            </Button>
          </div>

          <div className="p-col-4" style={{ fontSize: '18px'}}>
            <b> Expected Total Cost: </b> $
            {
              this.state.tasksList ?
                this.state.tasksList.reduce((cumulativeCost, task) => {return cumulativeCost + task.cost}, 0) : 0
            }
          </div>

          <div className="p-col-5">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
              <InputGroup.Text id="sprint_endDateTime">Baseline Duration</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl placeholder="Baseline Sprint Duration (hrs)" aria-label="Baseline sprint duration" aria-describedby="sprint_endDateTime" value={ moment(currentSprintData.endDateTime).format('L') } />
            </InputGroup>
          </div>
          <div className="p-col-3">
            <Button variant='info'>
              Suggest Duration
            </Button>
          </div>
          <div className="p-col-4" style={{ 'fontSize': '18px'}}>
            <b> Expected Total Duration: </b>
            {
              this.state.tasksList &&
                this.state.tasksList.reduce((cumulativeCost, task) => {return cumulativeCost + moment(task.endDateTime).diff(moment(task.startDateTime), "days")}, 0)
            } Days
          </div>
        </div>
      )
    )
  }

  onClickDeleteTask(taskId) {
    if (confirm("Are you sure you want to delete this task?")) {
      let currentProjectId = ls.getItem("currentProjectId");
      let newTasksList = this.state.tasksList.filter(task => {return parseInt(task.id,10) !== parseInt(taskId,10)});
      let newSprintData = this.state.currentSprintData;
      let newProjectData = this.state.currentProjectData;

      newSprintData.tasks = newTasksList;

      let index = newProjectData.sprints.findIndex(element => parseInt(element.id,10) === parseInt(newSprintData.id));

      newProjectData.sprints[index] = newSprintData;

      httpUPDATE('http://localhost:3001/projects/' + currentProjectId, newProjectData)
      .then(response => {
        console.log(response.data);
        this.setState({tasksList: newTasksList, currentSprintData: newSprintData, currentProjectData: newProjectData})
      })
      .catch(err => {
        console.log(err);
        this.setState({error: 'An error with the server was encountered.'})
      });
    }
  }

  onClickAddNewTask() {

  }

  onClickEditTask(taskId) {

  }

  // Displays the HTML to the user
  render() {
    return (
      <div className="p-grid">
        <Helmet>
          <title>Add/Edit Sprint</title>
          <meta name="description" content="Add/Edit Sprint" />
        </Helmet>
        <div className="p-col-10 p-offset-1">
          <div className="card card-w-title">
            <div className="p-grid">
              <div className="p-col-8" style={{ textAlign: 'center'}}>
                <p style={{fontSize: "24px", fontWeight: 600}}>Tasks{ " in " + ls.getItem("currentSprintName") + " for "+ ls.getItem("currentProjectName")}</p>
              </div>
              <div className="p-col-2">
                <Button onClick={() => this.onClickAddNewTask()} style={{marginRight: '5px'}}>
                  <FontAwesomeIcon icon={fa.faPlus} /> &nbsp; New Task
                </Button>
              </div>
              <div className="p-col-2">
                <Button onClick={() => this.onClickEditTask()} variant='info' style={{marginRight: '5px'}}>
                  Update Sprint
                </Button>
              </div>
            </div>
            <hr/>
            {
              this.generateSprintDetails()
            }
            <hr/>
            {
              // TODO
              this.state.tasksList && this.generateTasksView()
            }
          </div>
        </div>
      </div>
    );
  }
}
