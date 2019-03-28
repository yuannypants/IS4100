import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { httpGET } from '../../utils/httpUtils'
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import firebase from 'firebase';


firebase.initializeApp({
  apiKey: "AIzaSyAIn9kS-Kh3PkUfSTQ--tAgTDptcSNbDyM",
  authDomain: "charity-e8ccd.firebaseapp.com",
  databaseURL: "https://charity-e8ccd.firebaseio.com",
  projectId: "charity-e8ccd",
  storageBucket: "charity-e8ccd.appspot.com",
  messagingSenderId: "212836409307"
});
const db = firebase.database();

export default class DonationDrive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    let url = 'http://localhost:3000/api/private/DonationDrive';
    httpGET(url)
      .then(response => {
         console.log(JSON.stringify(response, null, 2));
        let dd = response.data;
        let dataToRender = [];
        for(let donationDrive of dd)
        {
        db.ref('/DonationDrive/' + donationDrive.id).once('value').then(function(snapshot) {
          var donationDriveName = (snapshot.val() && snapshot.val()) || 'Anonymous';
          dataToRender.push({
            uen: donationDrive.charitableOrganisation.uen,
            driveName: donationDrive.donationDriveName,
          })
        });
      }
       
        this.setState({ data: dataToRender });
        console.log(this.state.data);
      })
  }
  render() {

    const header = (
      <img alt="Card" src='showcase/resources/demo/images/usercard.png'/>
  );
  const footer = (
      <span>
          <Button label="Save" icon="pi pi-check"/>
          <Button label="Cancel" icon="pi pi-times" className="p-button-secondary"/>
      </span>
  );
    return (
      <div>
        <Helmet>
          <title>View Donation Drives</title>
          <meta name="description" content="View Donation Drives" />
        </Helmet>
        <h1>View Donation Drives</h1>
        <br/>

        <Card title={this.state.data && this.state.data.uen} subTitle="Subtitle" style={{width: '360px'}} className="ui-card-shadow" footer={footer} header={header}>
                        <div>{this.state.data && this.state.data.driveName}</div>
                    </Card>
        <p>
          {
            this.state.data && JSON.stringify(this.state.data)
          }
        </p>
      

      </div>
    );
  }
}
