import moment from 'moment'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { httpGET, httpPOST } from '../utils/httpUtils';

const ls = window.localStorage;

export default class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectsList: [],

      dialogVisible: false,
      projectName: "",
      projectDescription: ""
    }

    this.generateProjectView = this.generateProjectView.bind(this);
    this.onClickGoToProject = this.onClickGoToProject.bind(this);
    this.onClickAddNewProject = this.onClickAddNewProject.bind(this);
  }

  componentWillMount () {
    httpGET('http://localhost:3001/projects')
    .then(response => {
      console.log(response.data);
      let retrievedProjects = response.data;
      this.setState({projectsList:retrievedProjects})
    })
     .catch(err => {
      console.log(err);
      this.setState({error: 'An error with the server was encountered.'})
    });
  }

  // Generate the html for the page here
  generateProjectView() {
    // if x = [1,2], then y=x.map(function(item) { return 2 * item }); gives [2,4]
    // Note: "function(item) { ...}" more or less same as "item => {...}"
    return this.state.projectsList.map(project => {
      return (
        <div className="p-grid"  key={project.id}>
          <div className="col-10">
            {/* .name and .description based on project object */ }
            <b>{ project.name } </b><br/>
            <i>{ project.description }</i>
          </div>
          <div className="col-2">
            <Button className='btn btn-success' onClick={() => this.onClickGoToProject(project.id, project.name)} style={{width: '100%'}} >
              <FontAwesomeIcon icon={fa.faSignInAlt} /> &nbsp; Access Project
            </Button>
          </div>
          <div className='col-md-12'><hr/></div> { /* Divider line between 2 projects */ }
        </div>
      )
    })
  }

  onClickGoToProject(projectId, projectName) {
    ls.setItem("currentProjectId",projectId);
    ls.setItem("currentProjectName",projectName);
    window.location = "Sprints"
  }

  onClickAddNewProject() {
    if (confirm("Confirm to add new project?")) {
      let data = {
        name: this.state.projectName,
        description: this.state.projectDescription,
        startDateTime: moment().format(),
        endDateTime: moment().format(),
        sprints: []
      }

      httpPOST('http://localhost:3001/projects',data)
      .then(response => {
        console.log(response.data);
        window.location = "Projects";
      })
       .catch(err => {
        console.log(err);
        this.setState({error: 'An error with the server was encountered.'})
      });
    }
  }

  render() {
    return (
      <div className="p-grid">
        <Helmet>
          <title>Project Manager Dashboard</title>
          <meta name="description" content="Settings" />
        </Helmet>
        <div className="p-col-10 p-offset-1">
          <div className="card card-w-title">
          <h1>Project Manager Dashboard</h1>
          {
            this.state.projectsList && this.generateProjectView() // Make sure there are projects, then generate the view for it
          }
          <div className="p-col-2 p-offset-5">
            <Button className='btn btn-success' onClick={() => this.setState({dialogVisible:true})} style={{width: '100%'}} >
              Add New Project
            </Button>
          </div>
          </div>
        </div>
        <Dialog header="Add New Project" visible={this.state.dialogVisible} modal={true} onHide={(e) => this.setState({dialogVisible: false})}>
          <div className="p-grid">
            <div className="p-col-4">
              <b>Project Name</b>
            </div>
            <div className="p-col-8">
              <InputText style={{width: '100%'}} value={this.state.projectName} onChange={(e) => this.setState({projectName: e.target.value})} />
            </div>
            <div className="p-col-4">
              <b>Project Description</b>
            </div>
            <div className="p-col-8">
              <InputText style={{width: '100%'}} value={this.state.projectDescription} onChange={(e) => this.setState({projectDescription: e.target.value})} />
            </div>
            <div className="p-col-2 p-offset-5">
              <Button style={{width: '100%'}} onClick={() => this.onClickAddNewProject()}>
                Create
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
