import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Row, Col, Button} from 'react-bootstrap';
import NumberFormat from "react-number-format";
import { WithContext as ReactTags } from 'react-tag-input';
import './Tags.css';
import {Container} from 'react-bootstrap';
import { httpUPDATE } from '../utils/httpUtils'

const ls = window.localStorage;

const KeyCodes = {
  comma: 188,
  enter: 13,
};
 
const delimiters = [KeyCodes.comma, KeyCodes.enter];


export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	username: '',
			wageRate: '0',
			wageRate2: '0',
			skills: '',
			password: '',
			tags: [],
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
		this.onClickMakeChanges = this.onClickMakeChanges.bind(this);
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

	onClickMakeChanges() {
  	if (this.state.password==="admin") {
			let newUserData = JSON.parse(ls.getItem("userData"));
			newUserData.wageRate = this.state.wageRate;
			newUserData.tags = this.state.tags;

			httpUPDATE('http://localhost:3001/users/' + newUserData.id, newUserData)
			.then(response => {
				console.log(response.data);
				ls.setItem('userData', JSON.stringify(newUserData));
				window.location.href = '/Settings'; // Redirects to same user settings page
			})
			 .catch(err => {
				console.log(err);
				this.setState({error: 'An error with the server was encountered.'})
			});
		} else {
			alert('The admin password is incorrect. Please try again.');
		}
  }

  componentWillMount () {
  	let userData = ls.getItem("userData");
  	if (userData) {
			userData = JSON.parse(userData);

			console.log(userData);
			this.setState({
				username: userData.username,
				wageRate: userData.wageRate,
				wageRate2: userData.wageRate2,
				tags: userData.tags
			})
		} else {
			window.location = "Login"
		}
	}

	render() {
		const { tags, suggestions } = this.state;
    return (
			<div className="p-grid">
        <Helmet>
          <title>User Settings</title>
          <meta name="description" content="Settings" />
        </Helmet>
				<div className="p-col-10 p-offset-1">
          <div className="card card-w-title">
						<h1>User Settings</h1>

						<div className="p-grid">
							<div className="p-col-2">
								<span><b>Name: </b></span>
							</div>
							<div className="p-col-4">
								<InputText style={{width: '100%'}} value={this.state.username} readOnly disabled/>
							</div>
							<div className="p-col-6"></div>

							<div className="p-col-2">
								<span><b>Wage Rate ($/h): </b></span>
							</div>
							<div className="p-col-4">
								<InputText style={{width: '100%'}} value={this.state.wageRate} onChange={(e) => this.setState({wageRate: e.target.value})}/>
							</div>
							<div className="p-col-6"></div>

							<div className="p-col-2">
								<span><b>Overtime Wage Rate ($/h): </b></span>
							</div>
							<div className="p-col-4">
								<InputText style={{width: '100%'}} value={this.state.wageRate2} onChange={(e) => this.setState({wageRate2: e.target.value})}/>
							</div>
							<div className="p-col-6"></div>

							<div className="p-col-2">
								<span><b>Skills: </b></span>
							</div>
							<div className="p-col-4">
								<ReactTags
									tags={tags}
									suggestions={suggestions}
									handleDelete={this.handleDelete}
									handleAddition={this.handleAddition}
									handleDrag={this.handleDrag}
									delimiters={delimiters} />
							</div>
							<div className="p-col-6"></div>

							<div className="p-col-2">
								<span><b>Admin Password: </b></span>
							</div>
							<div className="p-col-4">
								<Password style={{width: '100%'}} value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} feedback={false}/>
							</div>
							<div className="p-col-6"> </div>
							<div className="p-col-2">
								<Button onClick={() => this.onClickMakeChanges()}>Save Changes</Button>
							</div>
							<div className="p-col-10"> </div>
						</div>
          </div>
        </div>
      </div>
    );
  }
}
