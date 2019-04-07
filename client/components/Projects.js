import React, {Component} from 'react';
import Helmet from 'react-helmet';
// DONT REMOVE - BOOTSTRAP AND FONT-AWESOME
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from "@fortawesome/free-solid-svg-icons";
// END OF DON'T REMOVE
// NEED TO IMPORT STUFF FROM REACT-BOOTSTRAP
import {Row, Col, Button} from 'react-bootstrap';
import { JsonToTable } from 'react-json-to-table';
import {Container} from 'react-bootstrap';

// Class for Projects
export default class Projects extends Component {
  // Creates a Projects object that is a component of the page
  constructor(props) {
    // Required to be a component (call superclass component)
    super(props);
    // Number of dummy projects
    const NUM_PROJECTS = 5;
    // Auto-populate a list of projects
    let projects = [];
    for (var i = 1; i <= NUM_PROJECTS; i++) {
        // Add a new project labelled i (new object)
        projects.push({
            name: "Project #" + i ,
            description: "Project description #" + i,
        })
    }
    // State of the Project object (i.e. state of the page)
    // can be used to access object attributes in the render() function
    this.state = {
      'projects': projects
    }
  }
  // Yes it will
  componentWillMount () {}


  // Generate the html for the page here
  generateProjectView(projects) {
    // if x = [1,2], then y=x.map(function(item) { return 2 * item }); gives [2,4]
    // Note: "function(item) { ...}" more or less same as "item => {...}"
    return projects.map((project) => {
        return (
            <Row style={{ padding: "10px 0 10px 0" }}>
                <Col md={{ span: 12 }}>
                    {/* .name and .description based on project object */ } 
                    <b>{ project.name } </b> <br/>
                    <i> { project.description } </i>
                
					<a href='/Sprints' style={{ 'float': 'right', 'marginTop':'-20px' }}>
						<Button class='btn btn-success'>
							{ /* Serarch for the icon on Font-Awesome website 
								 https://fontawesome.com/icons?d=gallery
								 e.g. "door-open" becomes fa.faDoorOpen
							   */ } 
							<FontAwesomeIcon icon={fa.faSignInAlt} /> &nbsp;
							Access Project
						</Button>
                    </a>
				</Col>
                
                { /* Divider line between 2 projects */ } 
                <div class='col-md-12'><hr/></div>
            </Row>
        )
    })
  }

  // Displays the HTML to the user
  render() {
    return (
      <Container>
        <Helmet>
          <title>Project Manager Dashboard</title>
          <meta name="description" content="Settings" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
            <Row style={{ 'text-align' : 'center'}}>
                <Col md={{span:12}}> <h1>Project Manager Dashboard</h1> <br/> </Col>
            </Row>
            {
              // Make sure there are projects, then generate the view for it
              this.state.projects && this.generateProjectView(this.state.projects)
            }
          </div>
        </div>
      </Container>
    );
  }
}
