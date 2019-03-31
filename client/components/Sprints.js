import React, {Component} from 'react';
import Helmet from 'react-helmet';
// DONT REMOVE - BOOTSTRAP AND FONT-AWESOME
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from "@fortawesome/free-solid-svg-icons";
// END OF DON'T REMOVE
// NEED TO IMPORT STUFF FROM REACT-BOOTSTRAP
import {Row, Col, Button, Container} from 'react-bootstrap';
import { JsonToTable } from 'react-json-to-table';

// Class for Sprints
export default class Sprints extends Component {
  // Creates a Sprints object that is a component of the page
  constructor(props) {
    // Required to be a component (call superclass component)
    super(props);
    // Number of dummy sprints
    const NUM_SPRINTS = 5;
    // Auto-populate a list of sprints
    let sprints = [];
    let duration = [14, 14, 14, 14, 14]
    let costs = [100, 200, 300, 400, 500]
    for (var i = 1; i <= NUM_SPRINTS; i++) {
        // Add a new sprint labelled i (new object)
        sprints.push({
            name: "Sprint #" + i ,
            description: "Sprint description #" + i,
            expected_duration: duration[i - 1],
            expected_cost: costs[i - 1]
        })
    }
    // State of the Sprint object (i.e. state of the page)
    // can be used to access object attributes in the render() function
    this.state = {
      // TODO
      'sprints': sprints
    }
  }
  // Yes it will
  componentWillMount () {}

  // Remove a sprint on the fly
  removeSprint(sprintName) {
      // New list of sprints
      /*let new_sprints = [...this.state.sprints];
      for (let i = 0; i < this.state.sprints.length; i++) {
          if (new_sprints[i].name == sprintName) {
              // Deletes the item at index i
              new_sprints.splice(i, 1);
              break;
          }
      }*/
      this.setState({ 'sprints': this.state.sprints.filter(sprint => {
          return sprint.name !== sprintName;
      }) });
  }


  // Generate the html for the page here
  generateSprintsView(sprints) {
    // if x = [1,2], then y=x.map(function(item) { return 2 * item }); gives [2,4]
    // Note: "function(item) { ...}" more or less same as "item => {...}"
    return sprints.map((sprint) => {
        return (
            <Row style={{ padding: "10px 0 10px 0" }}>
                <Col md={{ span: 4 }}>
                    {/* .name and .description based on sprint object */ } 
                    <b>{ sprint.name } </b> <br/>
                    <i> { sprint.description } </i>
                </Col>
                <Col md={{ span: 3 }}>
                    {/* .name and .description based on sprint object */ } 
                    <b>Expected Duration</b> <br/>
                    { sprint.expected_duration } Days
                </Col>
                <Col md={{ span: 3 }}>
                    {/* .name and .description based on sprint object */ } 
                    <b>Expected Costs</b> <br/>
                    $ { sprint.expected_cost } 
                </Col>
                <Col md={{ span: 2 }}>
                    <a href='/AddEditSprint'>
                    <Button variant='warning'>
                        { /* Serarch for the icon on Font-Awesome website 
                             https://fontawesome.com/icons?d=gallery
                             e.g. "door-open" becomes fa.faDoorOpen
                           */ } 
                        <FontAwesomeIcon icon={fa.faEdit} />
                    </Button>
                    &nbsp;
                    </a>

                    <Button variant='danger' onClick={(e) => this.removeSprint(sprint.name, e)}>
                           <FontAwesomeIcon icon={fa.faTrash} />
                    </Button>
                    
                </Col>
                { /* Divider line between 2 sprints */ } 
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
          <title>Home</title>
          <meta name="description" content="Settings" />
        </Helmet>
        <Row>
            <Col md={{span:12}}>
            <Row>
                <Col md={{span:8}} style={{ 'text-align' : 'center'}}> 
                    <h1> Sprints </h1>
                </Col>
                <Col md={{span:4}} >
                    <a href='/AddEditSprint'>
                        <Button>
                            <FontAwesomeIcon icon={fa.faPlus} /> &nbsp;
                            New Sprint
                        </Button>
                    </a>
                    &nbsp;
                    <a href='/SprintStatistics'>
                        <Button variant='info'>
                            <FontAwesomeIcon icon={fa.faPlus} /> &nbsp;
                            Past Statistics
                        </Button>
                    </a>
                </Col>
                <Col md={{ span: 3, offset: 9 }} style={{ 'fontSize': '20px'}}>
                    <b> Total Cost: </b> $
                    { /* Sums up every cost in list of sprints */
                      /* reduce --> reduces a list to a single value */
                        this.state.sprints.reduce((accum, x) => {
                        return accum + x.expected_cost; }, 0) }
                </Col>
            </Row>
            <hr/>

            {
              // TODO
              this.state.sprints && this.generateSprintsView(this.state.sprints)
            }
          </Col>
        </Row>
      </Container>
    );
  }
}
