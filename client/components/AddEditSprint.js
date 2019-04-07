import React, {Component} from 'react';
import Helmet from 'react-helmet';
// DONT REMOVE - BOOTSTRAP AND FONT-AWESOME
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from "@fortawesome/free-solid-svg-icons";
// END OF DON'T REMOVE
// NEED TO IMPORT STUFF FROM REACT-BOOTSTRAP
import {Row, Col, Button, Container, InputGroup, FormControl } from 'react-bootstrap';
import { JsonToTable } from 'react-json-to-table';

// Class for AddEditSprint
export default class AddEditSprint extends Component {
  // Creates a AddEditSprint object that is a component of the page
  constructor(props) {
    // Required to be a component (call superclass component)
    super(props);
    // Number of dummy tasks
    const NUM_TASKS = 2;
    // Auto-populate a list of tasks
    let tasks = [];
    let duration = [7, 7]
    let costs = [200, 900]
    for (var i = 1; i <= NUM_TASKS; i++) {
        // Add a new task labelled i (new object)
        tasks.push({
            name: "Task #" + i ,
            description: "Task description #" + i,
            expected_duration: duration[i - 1],
            expected_cost: costs[i - 1]
        })
    }
    // State of the Sprint object (i.e. state of the page)
    // can be used to access object attributes in the render() function
    this.state = {
      // TODO
      'tasks': tasks,
      'sprint_details' : {
          name: 'Sprint #1',
          due_date: '22 Apr 2019',
          baseline_budget:'',
          baseline_duration:''
      }
    }
  }
  // Yes it will
  componentWillMount () {}

  // Remove a task on the fly
  removeTask(taskName) {
      // New list of tasks
      /*let new_tasks = [...this.state.tasks];
      for (let i = 0; i < this.state.tasks.length; i++) {
          if (new_tasks[i].name == taskName) {
              // Deletes the item at index i
              new_tasks.splice(i, 1);
              break;
          }
      }*/
      this.setState({ 'tasks': this.state.tasks.filter(task => {
          return task.name !== taskName;
      }) });
  }


  // Generate the html for the page here
  generateTasksView(tasks) {
    // if x = [1,2], then y=x.map(function(item) { return 2 * item }); gives [2,4]
    // Note: "function(item) { ...}" more or less same as "item => {...}"
    return tasks.map((task) => {
        return (
            <Row style={{ padding: "10px 0 10px 0" }}>
                <Col md={{ span: 4 }}>
                    {/* .name and .description based on task object */ } 
                    <b>{ task.name } </b> <br/>
                    <i> { task.description } </i>
                </Col>
                <Col md={{ span: 3 }}>
                    {/* .name and .description based on task object */ } 
                    <b>Expected Duration</b> <br/>
                    { task.expected_duration } Days
                </Col>
                <Col md={{ span: 3 }}>
                    {/* .name and .description based on task object */ } 
                    <b>Expected Costs</b> <br/>
                    $ { task.expected_cost } 
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

                    <Button variant='danger' onClick={(e) => this.removeTask(task.name, e)}>
                           <FontAwesomeIcon icon={fa.faTrash} />
                    </Button>
                    
                </Col>
                { /* Divider line between 2 tasks */ } 
                <div class='col-md-12'><hr/></div>
            </Row>
        )
    })
  }

  generateSprintDetails(details) {
      return (
        <Row>
            <Col md={{ span: 6 }}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="sprint_name">Sprint Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder="Name of sprint"
                    aria-label="Sprint name" aria-describedby="sprint_name"
                    value={ details.name }
                    />
                </InputGroup>
            </Col>
            <Col md={{ span: 6}}></Col>

            <Col md={{ span: 6 }}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="sprint_due_date">Due Date</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder="Sprint Due Date"
                    aria-label="Sprint due date" aria-describedby="sprint_due_date"
                    value={ details.due_date }
                    />
                </InputGroup>
            </Col>
            <Col md={{ span: 6}}></Col>
        
            <Col md={{ span:6}}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="sprint_baseline_budget">Baseline Budget</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder="Baseline Sprint Budget ($)"
                    aria-label="Baseline sprint budget" aria-describedby="sprint_baseline_budget"
                    value={ details.baseline_budget }
                    />
                </InputGroup>
            </Col>
            <Col md={{ span: 2 }}>
                <Button variant='info'>
                        Suggest Budget &nbsp;
                </Button>
            </Col>

            <Col md={{ span: 4 }} style={{ 'fontSize': '18px'}}>
                    <b> Expected Total Cost: </b> $
                    { /* Sums up every cost in list of tasks */
                      /* reduce --> reduces a list to a single value */
                        this.state.tasks.reduce((accum, x) => {
                        return accum + x.expected_cost; }, 0) }
            </Col>

            <Col md={{ span: 6 }}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="sprint_baseline_duration">Baseline Duration</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder="Baseline Sprint Duration (hrs)"
                    aria-label="Baseline sprint duration" aria-describedby="sprint_baseline_duration"
                    value={ details.baseline_duration }
                    />
                </InputGroup>
            </Col>
            <Col md={{ span: 2 }}>
                <Button variant='info'>
                        Suggest Duration
                </Button>
            </Col>
            <Col md={{ span: 4  }} style={{ 'fontSize': '18px'}}>
                    <b> Expected Total Duration: </b> 
                    { /* Sums up every duration in list of tasks */
                      /* reduce --> reduces a list to a single value */
                        this.state.tasks.reduce((accum, x) => {
                        return accum + x.expected_duration; }, 0) } Days
            </Col>
        </Row>
      )
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
                    <h1> Tasks </h1>
                </Col>
                <Col md={{span:4}} >
                    <a href='/AddEditSprint'>
                        <Button>
                            <FontAwesomeIcon icon={fa.faPlus} /> &nbsp;
                            New Task
                        </Button>
                    </a>
                    &nbsp;
                    <a href='/SprintStatistics'>
                        <Button variant='info'>
                            Update Sprint
                        </Button>
                    </a>
                </Col>
            </Row>
            <hr/>

            {
              this.generateSprintDetails(this.state.sprint_details)
            }
            {
              // TODO
              this.state.tasks && this.generateTasksView(this.state.tasks)
            }
          </Col>
        </Row>
      </Container>
    );
  }
}
