import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from "@fortawesome/free-solid-svg-icons";
import {Row, Col, Button, Container} from 'react-bootstrap';
import { httpGET, httpPOST, httpUPDATE } from '../utils/httpUtils'
import moment from 'moment';

const ls = window.localStorage;

export default class Sprints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProjectData: {},
      sprintsList: [],

      dialogVisible: false,
      sprintName: "",
      sprintDescription: "",
      sprintStartDateTime: moment().format("L"),
      sprintDuration: "0"
    }

    this.generateSprintsView = this.generateSprintsView.bind(this);
    this.onClickDeleteSprint = this.onClickDeleteSprint.bind(this);
    this.onClickAddNewSprint = this.onClickAddNewSprint.bind(this);
    this.onClickViewIndustryStatistics = this.onClickViewIndustryStatistics.bind(this);
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
        <div className="p-grid" key={sprint.id}>
            <div className="p-col-4">
              <b>{ sprint.name }</b> <br/>
              <i>{ sprint.description }</i>
            </div>
            <div className="p-col-3">
              <b>Expected Duration</b><br/>
              { expectedDuration } Days
            </div>
            <div className="p-col-3">
              <b>Expected Costs</b> <br/>
              ${ sprint.cost }
            </div>
            <div className="p-col-2" >
              <Button onClick={() => this.onClickEditSprint(sprint.id, sprint.name)} variant='warning' style={{marginRight: '5px'}}>
                <FontAwesomeIcon icon={fa.faEdit} />
              </Button>
              <Button onClick={() => this.onClickDeleteSprint(sprint.id)} variant='danger' style={{marginRight: '5px'}}>
                <FontAwesomeIcon icon={fa.faTrash} />
              </Button>
            </div>
            <div className="col-md-12"><hr/></div>
        </div>
      )
    })
  }

  onClickAddNewSprint() {
    if (confirm("Confirm to add new sprint?")) {
      let data = {
        name: this.state.sprintName,
        description: this.state.sprintDescription,
        startDateTime: moment(this.state.sprintStartDateTime).startOf('day').format(),
        endDateTime: moment(this.state.sprintStartDateTime).add(parseInt(this.state.sprintDuration,10),'days').format(),
        cost: 0,
        tasks: []
      }

      let currentProjectId = ls.getItem("currentProjectId");
      let newSprintsList = this.state.sprintsList;
      data.id = newSprintsList.length+1;
      newSprintsList.push(data);
      console.log(newSprintsList);
      let newProjectData = this.state.currentProjectData;
      console.log(newProjectData);

      newProjectData.sprints = newSprintsList;

      console.log(newProjectData);

      httpUPDATE('http://localhost:3001/projects/' + currentProjectId, newProjectData)
      .then(response => {
        console.log(response.data);
        window.location = "Sprints";
      })
       .catch(err => {
        console.log(err);
        this.setState({error: 'An error with the server was encountered.'})
      });
    }
  }

  onClickViewIndustryStatistics() {
    window.location = "IndustryStats"
  }

  onClickEditSprint(sprintId, sprintName) {
    ls.setItem("currentSprintId",sprintId)
    ls.setItem("currentSprintName", sprintName);
    window.location = "EditSprint"
  }

  onClickDeleteSprint(sprintId) {
    if (confirm("Are you sure you want to delete this sprint?")) {
      let currentProjectId = ls.getItem("currentProjectId");
      let newSprintsList = this.state.sprintsList.filter(sprint => {return sprint.id !== sprintId});
      let newProjectData = this.state.currentProjectData;

      newProjectData.sprints = newSprintsList

      httpUPDATE('http://localhost:3001/projects/' + currentProjectId, newProjectData)
      .then(response => {
        console.log(response.data);
        this.setState({sprintsList: newSprintsList, currentProjectData: newProjectData})
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
      <div className="p-grid">
        <Helmet>
          <title>Sprints</title>
          <meta name="description" content="Sprints" />
        </Helmet>
        <div className="p-col-10 p-offset-1">
          <div className="card card-w-title">
            <h1 style={{ textAlign : 'center'}}>Sprints{ " for " + ls.getItem("currentProjectName")}</h1>
            <div className="p-grid">
              <div className="p-col-3">
                <Button onClick={() => this.setState({dialogVisible: true})} style={{width: '100%'}}>
                  <FontAwesomeIcon icon={fa.faPlus} /> &nbsp;New Sprint
                </Button>
              </div>
              <div className="p-col-3">
                <Button onClick={() => this.onClickViewIndustryStatistics()} variant='info' style={{width: '100%'}}>
                  <FontAwesomeIcon icon={fa.faPlus} /> &nbsp;Industry Statistics
                </Button>
              </div>
              <div className="p-col-3 p-offset-3">
                  <b>Total Cost:</b> $
                  {
                    this.state.sprintsList &&
                      this.state.sprintsList.reduce((cumulativeCost, sprint) => { return cumulativeCost + sprint.cost }, 0)
                  }
              </div>
              <div className="p-col-12"><hr/></div>
              <div className="p-col-12">
              {
                // TODO
                this.state.sprintsList && this.generateSprintsView()
              }
              </div>
            </div>
          </div>
        </div>
        <Dialog header="Add New Sprint" visible={this.state.dialogVisible} modal={true} onHide={(e) => this.setState({dialogVisible: false})}>
          <div className="p-grid">
            <div className="p-col-4">
              <b>Sprint Name</b>
            </div>
            <div className="p-col-8">
              <InputText style={{width: '100%'}} value={this.state.sprintName} onChange={(e) => this.setState({sprintName: e.target.value})} />
            </div>
            <div className="p-col-4">
              <b>Sprint Description</b>
            </div>
            <div className="p-col-8">
              <InputText style={{width: '100%'}} value={this.state.sprintDescription} onChange={(e) => this.setState({sprintDescription: e.target.value})} />
            </div>
            <div className="p-col-4">
              <b>Start Date</b>
            </div>
            <div className="p-col-8">
              <InputText style={{width: '100%'}} value={this.state.sprintStartDateTime} onChange={(e) => this.setState({sprintStartDateTime: e.target.value})} />
            </div>
            <div className="p-col-4">
              <b>Duration (days)</b>
            </div>
            <div className="p-col-8">
              <InputText style={{width: '100%'}} value={this.state.sprintDuration} onChange={(e) => this.setState({sprintDuration: e.target.value})} />
            </div>
            <div className="p-col-2 p-offset-5">
              <Button style={{width: '100%'}} onClick={() => this.onClickAddNewSprint()}>
                Create
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
