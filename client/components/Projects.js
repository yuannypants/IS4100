import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { httpGET } from '../utils/httpUtils';

const ls = window.localStorage;

export default class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectsList: []
    }

    this.generateProjectView = this.generateProjectView.bind(this);
    this.onClickGoToProject = this.onClickGoToProject.bind(this);
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
        <Row style={{ padding: "10px 0 10px 0" }} key={project.id}>
          <Col className="col-12">
            {/* .name and .description based on project object */ }
            <b>{ project.name } </b><br/>
            <i>{ project.description }</i>

            <Button
              className='btn btn-success'
              style={{ float:"right", marginTop:'-20px' }}
              onClick={() => this.onClickGoToProject(project.id, project.name)}
            >
              { /* Search for the icon on Font-Awesome website https://fontawesome.com/icons?d=gallery e.g. "door-open" becomes fa.faDoorOpen */ }
              <FontAwesomeIcon icon={fa.faSignInAlt} /> &nbsp; Access Project
            </Button>
          </Col>
          <div className='col-md-12'><hr/></div> { /* Divider line between 2 projects */ }
        </Row>
      )
    })
  }

  onClickGoToProject(projectId, projectName) {
    ls.setItem("currentProjectId",projectId);
    ls.setItem("currentProjectName",projectName);
    window.location = "Sprints"
  }

  render() {
    return (
      <Container>
        <Helmet>
          <title>Project Manager Dashboard</title>
          <meta name="description" content="Settings" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
            <Row style={{ textAlign : 'center'}}>
                <Col className="col-12"><h1>Project Manager Dashboard</h1></Col>
            </Row>
            {
              this.state.projectsList && this.generateProjectView() // Make sure there are projects, then generate the view for it
            }
          </div>
        </div>
      </Container>
    );
  }
}
