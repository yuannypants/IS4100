import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { PickList } from 'primereact/picklist'
import React, {Component} from 'react';
import DateTime from 'react-datetime'
import Helmet from 'react-helmet';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from "@fortawesome/free-solid-svg-icons";
import {Row, Col, Button, Container, InputGroup, FormControl } from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input'
import { httpGET, httpPOST, httpUPDATE } from '../utils/httpUtils'
import moment from 'moment';
import Calendar from './Calendar'

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
      currentProjectData: {},
      sprintsList: [],
      currentSprintData: {},
      tasksList: [],

      events: [],

      sprintName: "",
      sprintDescription: "",
      sprintStartDateTime: moment().format("L"),
      sprintDuration: "0",
      sprintBaselineCost: "0",
      sprintBaselineDuration: "0",

      dialogVisible: false,

      taskId: null,
      taskName: "",
      taskDescription: "",
      taskStartDateTime: moment().format("L"),
      taskDuration: "0",
      taskTags: [],
      taskResources: [],

      usersList: [],
      srcUsersList: [],
      dstUsersList: [],
    }

    this.generateTasksView = this.generateTasksView.bind(this);
    this.generateSprintDetails = this.generateSprintDetails.bind(this);
    this.onClickEditSprint = this.onClickEditSprint.bind(this);
    this.onClickDeleteTask = this.onClickDeleteTask.bind(this);
    this.onClickAddNewTask = this.onClickAddNewTask.bind(this);
    this.onClickEditTask = this.onClickEditTask.bind(this);
    this.onClickSaveTask = this.onClickSaveTask.bind(this);
    this.usersTemplate = this.usersTemplate.bind(this);
    this.onPickListChange = this.onPickListChange.bind(this);

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
            sprintBaselineCost: retrievedProject.sprints.filter(sprint => {return sprint.id === currentSprintId})[0].tasks.reduce((cumulativeCost, task) => {return cumulativeCost + task.cost}, 0),
            sprintBaselineDuration: retrievedProject.sprints.filter(sprint => {return sprint.id === currentSprintId})[0].tasks.reduce((cumulativeCost, task) => {return cumulativeCost + moment(task.endDateTime).diff(moment(task.startDateTime), "days")}, 0),

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

      httpGET('http://localhost:3001/users')
      .then(response => {
        console.log(response.data);
        this.setState({usersList: response.data});

      })
       .catch(err => {
        console.log(err);
        this.setState({error: 'An error with the server was encountered.'})
      });

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


    } else {
      window.location = "Projects"
    }
  }

  generateTasksView() {
    return this.state.tasksList.map(task => {
      let expectedDuration = moment(task.endDateTime).diff(moment(task.startDateTime), "days");
      let resources = task.resources.map(resource => {
        return (
          <div key={resource.id} style={{border:'0.5px solid black', padding:'5px 8px', margin: '0px 2px 4px 0px'}}>
            <span>Name: <b>{ resource.nickname }</b></span><br/>
            <span>Hourly rate: { resource.wageRate }, Overtime rate: { resource.wageRate2 }</span>
            <ReactTags
              tags={resource.tags}
              delimiters={delimiters}
              readOnly={true} />
          </div>
        )
      })

      return (
        <div className="p-grid" key={task.id}>
          <hr/>
          <div className="p-col-2">
            <b>{ task.name } </b> <br/>
            <i>{ task.description }</i>
          </div>
          <div className="p-col-2">
            <b>Expected Duration</b> <br/>
            { expectedDuration } Days <br/>
            Start: { moment(task.startDateTime).format("L") } <br/>
            End: { moment(task.endDateTime).format("L") }
          </div>
          <div className="p-col-2">
            <b>Expected Costs</b> <br/>
            $ { task.cost }
          </div>
          <div className="p-col-4">
            <b>Allocated resources</b> <br/>
            { resources }
          </div>
          <div className="p-col-2">
            <Button onClick={() => this.onClickEditTask(task.id)} variant='warning' style={{height: '40px', width: '40px', margin: '0px 5px 5px 0px'}}>
              <FontAwesomeIcon icon={fa.faEdit} />
            </Button>

            <Button onClick={(e) => this.onClickDeleteTask(task.id)} variant='danger' style={{height: '40px', width: '40px', margin: '0px 5px 5px 0px'}}>
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
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon" style={{width: '240px'}}>
                Sprint Name
              </span>
              <InputText style={{width: '100%'}} value={this.state.sprintName} onChange={(e) => this.setState({sprintName: e.target.value})} />
            </div>
          </div>
          <div className="p-col-6"> </div>

          <div className="p-col-6">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon" style={{width: '240px'}}>
                Sprint Description
              </span>
              <InputText style={{width: '100%'}} value={this.state.sprintDescription} onChange={(e) => this.setState({sprintDescription: e.target.value})} />
            </div>
          </div>
          <div className="p-col-6"> </div>

          <div className="p-col-6">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon" style={{width: '240px'}}>
                Duration (days)
              </span>
              <InputText style={{width: '100%'}} value={this.state.sprintDuration} onChange={(e) => this.setState({sprintDuration: e.target.value})} />
            </div>
          </div>
          <div className="p-col-6"> </div>

          <div className="p-col-6">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <div style={{width: '153px'}}>Start Date</div>
              </span>
              <DateTime style={{width: '240px'}} value={this.state.sprintStartDateTime} onChange={moment => this.setState({sprintStartDateTime: moment.format("L")})} />
            </div>
          </div>
          <div className="p-col-6"> </div>

          <div className="p-col-6">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon" style={{width: '240px'}}>
                Baseline Cost
              </span>
              <InputText style={{width: '100%'}} value={this.state.sprintBaselineCost} onChange={(e) => this.setState({sprintBaselineCost: e.target.value})} />
            </div>
          </div>
          <div className="p-col-4">
            <Button variant='info' style={{width: '100%'}} onClick={() => {
              this.state.tasksList.length > 0 ? alert("Based on the work tags detected in the tasks, the industry average budget for this task is $420.") : alert("No tasks/tags to derive data from.")
            }}>
              View Industry Standard Baseline Cost &nbsp;
            </Button>
          </div>
          <div className="p-col-2">
          </div>

          <div className="p-col-6">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon" style={{width: '240px'}}>
                Baseline Duration
              </span>
              <InputText style={{width: '100%'}} value={this.state.sprintBaselineDuration} onChange={(e) => this.setState({sprintBaselineDuration: e.target.value})} />
            </div>
          </div>
          <div className="p-col-4">
            <Button variant='info' style={{width: '100%'}} onClick={() => {
              this.state.tasksList.length > 0 ? alert("Based on the work tags detected in the tasks, the industry average sprint time is 5 days.") : alert("No tasks/tags to derive data from.")
            }}>
              View Industry Standard Baseline Duration
            </Button>
          </div>
          <div className="p-col-2">
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
    this.setState({
      dialogVisible: true,

      taskId: null,
      taskName: "",
      taskDescription: "",
      taskStartDateTime: moment().format("L"),
      taskDuration: "0",
      srcUsersList: this.state.usersList,
      dstUsersList: []
    });
  }

  onClickEditTask(taskId) {
    let index = this.state.tasksList.findIndex(element => parseInt(element.id,10) === parseInt(taskId));
    let taskInfo = this.state.tasksList[index];
    let expectedDuration = moment(taskInfo.endDateTime).diff(moment(taskInfo.startDateTime), "days");

    this.setState({
      dialogVisible: true,

      taskId: taskId,
      taskName: taskInfo.name,
      taskDescription: taskInfo.description,
      taskStartDateTime: moment(taskInfo.startDateTime).format("L"),
      taskDuration: expectedDuration,
      srcUsersList: this.state.usersList,
      dstUsersList: []
    });
  }

  onClickSaveTask() {
    if (confirm("Confirm to save task?")) {
      let currentProjectId = ls.getItem("currentProjectId");
      let currentProjectName = ls.getItem("currentProjectName");
      let currentSprintId = ls.getItem("currentSprintId");
      let currentSprintName = ls.getItem("currentSprintName");
      let newTasksList = this.state.tasksList;

      if (this.state.taskId) { // Save

      } else { // Add
        newTasksList.push({
          name: this.state.taskName,
          description: this.state.taskDescription,
          startDateTime: moment(this.state.taskStartDateTime).startOf('day').format(),
          endDateTime: moment(this.state.taskStartDateTime).add(parseInt(this.state.taskDuration,10),'days').format(),
          cost: parseInt(this.state.taskDuration,10) * 80,
          tags: [],
          resources: this.state.dstUsersList,
          id: this.state.tasksList.length + 1
        })
      }

      let newSprintData = this.state.currentSprintData;
      let newProjectData = this.state.currentProjectData;

      newSprintData.tasks = newTasksList;

      let index = newProjectData.sprints.findIndex(element => parseInt(element.id,10) === parseInt(newSprintData.id));

      newProjectData.sprints[index] = newSprintData;

      httpUPDATE('http://localhost:3001/projects/' + currentProjectId, newProjectData)
      .then(response => {
        console.log(response.data);
        this.setState({tasksList: newTasksList, currentSprintData: newSprintData, currentProjectData: newProjectData, dialogVisible: false})
        alert("The task has been successfully created.")
      })
       .catch(err => {
        console.log(err);
        this.setState({error: 'An error with the server was encountered.'})
      });

      let eventIdStart = this.state.events.length;

      for (let user of this.state.dstUsersList) {
        eventIdStart++;
        let newEvent = {
          id: eventIdStart,
          userId: user.id,
          username: user.nickname,
          projectId: currentProjectId,
          projectName: currentProjectName,
          sprintId: currentSprintId,
          sprintName: currentSprintName,
          taskId: this.state.tasksList.length + 1,
          taskName: this.state.taskName,
          startDateTime: moment(this.state.taskStartDateTime).startOf('day').format(),
          endDateTime: moment(this.state.taskStartDateTime).add(parseInt(this.state.taskDuration,10),'days').format()
        }

        let newCalendarEvent = this.state.events;
        newCalendarEvent.push({
          title: currentProjectName + ": " + currentSprintName + " - " + this.state.taskName + " (" + user.nickname + ")",
          start: moment(this.state.taskStartDateTime).startOf('day').toDate(),
          end: moment(this.state.taskStartDateTime).add(parseInt(this.state.taskDuration,10),'days').toDate()
        });

        this.setState({events: newCalendarEvent});

        httpPOST('http://localhost:3001/calendar', newEvent)
        .then(response2 => {
          console.log(response2.data);
          this.setState({tasksList: newTasksList, currentSprintData: newSprintData, currentProjectData: newProjectData})
        })
         .catch(err => {
          console.log(err);
          this.setState({error: 'An error with the server was encountered.'})
        });
      }
    }
  }

  onPickListChange(event) {
    this.setState({
      srcUsersList: event.source,
      dstUsersList: event.target
    });
  }

  usersTemplate(user) {
    return (
      <div className="p-clearfix" style={{fontSize: '13px',margin: '2px 5px 0 0'}}>
        <p>
          <b>Name:</b> {user.nickname}
        </p>
        <p>
          <b>Hourly Rate:</b> ${user.wageRate}.00
        </p>
        <p>
          <b>Overtime Rate:</b> ${user.wageRate2}.00
        </p>
        <ReactTags
          tags={user.tags}
          delimiters={delimiters}
          readOnly={true}
        />
      </div>
    );
  }

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
              <div className="p-col-3" style={{width: '100%'}}>
                <Button onClick={() => this.onClickAddNewTask()} style={{marginRight: '5px'}}>
                  <FontAwesomeIcon icon={fa.faPlus} /> &nbsp;New Task
                </Button>
                <Button onClick={() => this.onClickEditSprint()} variant='info' style={{marginRight: '5px'}}>
                  Update Sprint
                </Button>
              </div>
              <div className="p-col-12"><hr/></div>
              <div className="p-col-12">
              {
                this.state.tasksList && this.generateTasksView()
              }
              </div>
            </div>
          </div>
        </div>

        <div className="p-col-10 p-offset-1">
          <div className="card card-w-title" style={{height: window.innerHeight}}>
            <Calendar events={this.state.events}/>
          </div>
        </div>

        <Dialog
          header="Edit Task"
          visible={this.state.dialogVisible}
          modal={true}
          onHide={(e) => this.setState({dialogVisible: false})}
          style={{width: window.innerWidth * 0.8}}
        >
          <div className="p-grid">
            <div className="p-col-4">
              <b>Task Name</b>
            </div>
            <div className="p-col-8">
              <InputText style={{width: '100%'}} value={this.state.taskName} onChange={(e) => this.setState({taskName: e.target.value})} />
            </div>

            <div className="p-col-4">
              <b>Task Description</b>
            </div>
            <div className="p-col-8">
              <InputText style={{width: '100%'}} value={this.state.taskDescription} onChange={(e) => this.setState({taskDescription: e.target.value})} />
            </div>

            <div className="p-col-4">
              <b>Start Date</b>
            </div>
            <div className="p-col-8">
              <DateTime style={{width: '100%'}} value={this.state.taskStartDateTime} onChange={moment => this.setState({taskStartDateTime: moment.format("L")})} />
              {/*<InputText style={{width: '100%'}} value={this.state.taskStartDateTime} onChange={(e) => this.setState({taskStartDateTime: e.target.value})} />*/}
            </div>

            <div className="p-col-4">
              <b>Duration (days)</b>
            </div>
            <div className="p-col-8">
              <InputText style={{width: '100%'}} value={this.state.taskDuration} onChange={(e) => this.setState({taskDuration: e.target.value})} keyfilter="pint" />
            </div>

            <div className="p-col-12">
              <PickList
                source={this.state.srcUsersList}
                target={this.state.dstUsersList}
                itemTemplate={this.usersTemplate}
                sourceHeader="Available Personnel"
                targetHeader="Selected Personnel"
                responsive={true}
                sourceStyle={{height: '250px'}}
                targetStyle={{height: '250px'}}
                onChange={this.onPickListChange}>

              </PickList>
            </div>

            <div className="p-col-2 p-offset-5">
              <Button style={{width: '100%'}} onClick={() => this.onClickSaveTask()}>
                Save
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
