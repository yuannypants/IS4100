import { InputText } from 'primereact/inputtext'
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from "@fortawesome/free-solid-svg-icons";
import {Row, Col, Button, Container, InputGroup, FormControl } from 'react-bootstrap';
import { httpGET, httpPOST, httpUPDATE } from '../utils/httpUtils';
import { WithContext as ReactTags } from 'react-tag-input';
import moment from 'moment';
import './Tags.css';

const ls = window.localStorage;


const KeyCodes = {
  comma: 188,
  enter: 13,
};
 
const delimiters = [KeyCodes.comma, KeyCodes.enter];


export default class EditSprint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO
      currentProjectData: {},
      sprintsList: [],
      currentSprintData: {},
      tasksList: [],

      sprintName: "",
      sprintDescription: "",
      sprintStartDateTime: moment().format("L"),
      sprintDuration: "0",
      tags: [
        { id: 'React', text: 'React' },
				{ id: 'Scripting', text: 'Scripting' }
      ]
    }

    this.handleDelete = this.handleDelete.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
		this.handleDrag = this.handleDrag.bind(this);
		this.generateTasksView = this.generateTasksView.bind(this);
    this.generateSprintDetails = this.generateSprintDetails.bind(this);
    this.onClickEditSprint = this.onClickEditSprint.bind(this);
    this.onClickDeleteTask = this.onClickDeleteTask.bind(this);
    this.onClickAddNewTask = this.onClickAddNewTask.bind(this);
    this.onClickEditTask = this.onClickEditTask.bind(this);

  }

  handleDelete(i) {
		const { tags } = this.state;
		this.setState({
		 tags: tags.filter((tag, index) => index !== i),
		});
  }

  handleAddition(tag) {
		this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
		const tags = [...this.state.tags];
		const newTags = tags.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		// re-render
		this.setState({ tags: newTags });
  }

  componentWillMount () {
    let currentProjectId = ls.getItem("currentProjectId");
    let currentSprintId = parseInt(ls.getItem("currentSprintId"),10);

    if (currentProjectId !== null) {
      httpGET('http://localhost:3001/projects?id=' + currentProjectId)
      .then(response => {
        console.log(response.data);
        let retrievedProject = response.data[0];

        if (currentSprintId !== null) {
          let currentSprintData = retrievedProject.sprints.filter(sprint => {return sprint.id === currentSprintId})[0];
          this.setState({
            currentProjectData: retrievedProject,
            sprintsList: retrievedProject.sprints,
            currentSprintData: currentSprintData,
            tasksList: retrievedProject.sprints.filter(sprint => {return sprint.id === currentSprintId})[0].tasks,


            sprintName: currentSprintData.name,
            sprintDescription: currentSprintData.description,
            sprintStartDateTime: moment(currentSprintData.startDateTime).format("L"),
            sprintDuration: moment(currentSprintData.endDateTime).diff(moment(currentSprintData.startDateTime), "days")
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
    const { tags, suggestions } = this.state;
    return this.state.tasksList.map(task => {
      let expectedDuration = moment(task.endDateTime).diff(moment(task.startDateTime), "days");
      return (
        <div className="p-grid" key={task.id}>
          <hr/>
          <div className="p-col-3">
            <b>{ task.name } </b> <br/>
            <i>{ task.description }</i>
          </div>
          <div className="p-col-2">
            <b>Expected Duration</b> <br/>
            { expectedDuration } Days
          </div>
          <div className="p-col-2">
            <b>Expected Costs</b> <br/>
            $ { task.cost }
          </div>

          <div className='p-col-3'>
                <b> Tags </b> <br/>
                <ReactTags
									tags={tags}
									suggestions={suggestions}
									handleDelete={this.handleDelete}
									handleAddition={this.handleAddition}
									handleDrag={this.handleDrag}
                  delimiters={delimiters}
                  readOnly={true} />
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
          <div className="p-col-2">
            <b>Sprint Name</b>
          </div>
          <div className="p-col-4">
            <InputText style={{width: '100%'}} value={this.state.sprintName} onChange={(e) => this.setState({sprintName: e.target.value})} />
          </div>
          <div className="p-col-2">
            <b>Sprint Description</b>
          </div>
          <div className="p-col-4">
            <InputText style={{width: '100%'}} value={this.state.sprintDescription} onChange={(e) => this.setState({sprintDescription: e.target.value})} />
          </div>
          <div className="p-col-2">
            <b>Start Date</b>
          </div>
          <div className="p-col-4">
            <InputText style={{width: '100%'}} value={this.state.sprintStartDateTime} onChange={(e) => this.setState({sprintStartDateTime: e.target.value})} />
          </div>
          <div className="p-col-2">
            <b>Duration (days)</b>
          </div>
          <div className="p-col-4">
            <InputText style={{width: '100%'}} value={this.state.sprintDuration} onChange={(e) => this.setState({sprintDuration: e.target.value})} />
          </div>

          <div className="p-col-4" style={{ fontSize: '18px'}}>
            <b> Expected Total Cost: </b> $
            {
              this.state.tasksList ?
                this.state.tasksList.reduce((cumulativeCost, task) => {return cumulativeCost + task.cost}, 0) : 0
            }
          </div>

          <div className="p-col-3">
            <Button variant='info'>
              View Suggested Budget &nbsp;
            </Button>
          </div>
          <div className="p-col-5"> </div>

          <div className="p-col-4" style={{ 'fontSize': '18px'}}>
            <b> Expected Total Duration: </b>
            {
              this.state.tasksList &&
              this.state.tasksList.reduce((cumulativeCost, task) => {return cumulativeCost + moment(task.endDateTime).diff(moment(task.startDateTime), "days")}, 0)
            } Days
          </div>

          <div className="p-col-3">
            <Button variant='info'>
              View Suggested Duration
            </Button>
          </div>
          <div className="p-col-5"> </div>
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

  onClickEditSprint() {
    if (confirm("Are you sure you want to edit this sprint?")) {
      let currentProjectId = ls.getItem("currentProjectId");
      let newSprintData = this.state.currentSprintData;
      let newProjectData = this.state.currentProjectData;

      newSprintData.name = this.state.sprintName;
      newSprintData.description = this.state.sprintDescription;
      newSprintData.startDateTime = moment(this.state.sprintStartDateTime).startOf('day').format();
      newSprintData.endDateTime = moment(this.state.sprintStartDateTime).add(parseInt(this.state.sprintDuration,10),'days').format();

      let index = newProjectData.sprints.findIndex(element => parseInt(element.id,10) === parseInt(newSprintData.id));

      newProjectData.sprints[index] = newSprintData;

      httpUPDATE('http://localhost:3001/projects/' + currentProjectId, newProjectData)
      .then(response => {
        console.log(response.data);
        this.setState({currentSprintData: newSprintData, currentProjectData: newProjectData})
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
              <h1>Tasks{ " in " + ls.getItem("currentSprintName") + " for "+ ls.getItem("currentProjectName")}</h1>
              {
                this.generateSprintDetails()
              }
              <div className="p-col-4 p-offset-8">
                <Button onClick={() => this.onClickAddNewTask()} style={{marginRight: '5px'}}>
                  <FontAwesomeIcon icon={fa.faPlus} /> &nbsp;New Task
                </Button>
                &nbsp;
                <Button onClick={() => this.onClickEditSprint()} variant='info' style={{marginRight: '5px'}}>
                  Update Sprint
                </Button>
              </div>
              <div className="p-col-12"><hr/></div>
              <div className="p-col-12">
              {
                // TODO
                this.state.tasksList && this.generateTasksView()
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
