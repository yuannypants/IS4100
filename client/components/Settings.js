import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { JsonToTable } from 'react-json-to-table';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Row, Col, Button} from 'react-bootstrap';
import NumberFormat from "react-number-format";
import { WithContext as ReactTags } from 'react-tag-input';
import './Tags.css';
import {Container} from 'react-bootstrap';


const KeyCodes = {
  comma: 188,
  enter: 13,
};
 
const delimiters = [KeyCodes.comma, KeyCodes.enter];


export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
		tags: [
			{ id: 'Python', text: 'Python' },
			{ id: "Java", text: "Java" },
			{ id: "SQL", text: "SQL" },
			{ id: "English", text: "English" },
			{ id: 'Chinese', text: 'Chinese' }
		],
		suggestions: [
			{ id: 'JavaScript', text: 'JavaScript' },
			{ id: 'PHP', text: 'PHP' },
			{ id: 'React', text: 'React' },
			{ id: 'Angular', text: 'Angular' },
			{ id: "Html", text: "Html" },
			{ id: 'JQuery', text: 'JQuery' },
			{ id: 'Scripting', text: 'Scripting' }
		]
	};
	this.handleDelete = this.handleDelete.bind(this);
	this.handleAddition = this.handleAddition.bind(this);
	this.handleDrag = this.handleDrag.bind(this);
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

  onUpdatePassword() {
	alert('Your password has been successfully updated!');
	window.location.href = '/Settings'; // Redirects to same user settings page
  }

  render() {
	const { tags, suggestions } = this.state;
    return (
      <Container>
        <Helmet>
          <title>User Settings</title>
          <meta name="description" content="Settings" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
            <Row style={{ 'text-align' : 'center'}}>
                <Col md={{span:12}}> <h1>User Settings</h1> <br/> </Col>
            </Row>
            
			<Row style={{ 'fontWeight':'bold'}}>
                <Col md={{span:12}}>Name: <span style={{'marginLeft':'97px'}}/>
				<input type='text' disabled='disabled' value={localStorage.getItem("username")}></input> <br/> </Col>
            </Row> <br/>
						
			<Row style={{ 'fontWeight':'bold'}}>
                <Col md={{span:12}}>Wages ($/hr): <span style={{'marginLeft':'43.5px'}}/>
					<input type='text' disabled='disabled' value='$80.00'></input>
				<br/> 
				</Col>
            </Row> <br/>
			
			<Row style={{ 'fontWeight':'bold'}}>
                <Col>Skills: 
					<div style={{'marginLeft':'150px', 'marginTop':'-24px'}}>
						<ReactTags 
							tags={tags}
							suggestions={suggestions}
							handleDelete={this.handleDelete}
							handleAddition={this.handleAddition}
							handleDrag={this.handleDrag}
							delimiters={delimiters} />
					</div>
				</Col>
            </Row> <br/>
			
			<Row style={{ 'fontWeight':'bold'}}>
                <Col md={{span:12}}>Change Password: <span style={{'marginLeft':'10px'}}/>
					<input type='password'></input> <span style={{'marginLeft':'5px'}}/>
					<button className="p-link layout-menu-button" onClick={this.onUpdatePassword} style={{'backgroundColor':'lightGray', 'height': '30px', 'width':'66px', 'fontWeight':'bold'}}>
						<span style={{'marginLeft':'7px'}}>Update</span>
					</button>
					<br/> 
				</Col>
            </Row>
			
          </div>
        </div>
      </Container>
    );
  }
}
