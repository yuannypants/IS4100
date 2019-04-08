import { Chart } from 'primereact/chart';
import {Dropdown} from 'primereact/dropdown';
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { JsonToTable } from 'react-json-to-table';
import { httpGET } from '../utils/httpUtils';
import {Container} from 'react-bootstrap';

export default class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenGraph: "cumulative",
      chosenTag: "all"
    }
  }

  componentWillMount () {

  }

  render() {
    let graphData = [
      {
        labels: ['4 Feb', '11 Feb', '18 Feb', '25 Feb', '4 Mar', '11 Mar', '18 Mar'],
        datasets: [
          {
            label: 'Data Analytics Project',
            data: [410, 840, 1290, 1720, 2100, 2570, 3010],
            fill: false,
            borderColor: '#42A5F5'
          },
          {
            label: 'Enterprise Solutions for NUS Project',
            data: [360, 730, 1080, 1400, 1770, 2000, 2300],
            fill: false,
            borderDash: [5, 5],
            borderColor: '#66BB6A'
          },
          {
            label: 'Industry Average',
            data: [380, 750, 1290, 1600, 1800, 2100, 2500],
            fill: true,
            borderColor: '#FFA726',
            backgroundColor: '#FFCC80'
          }
        ]
      },
      {
        labels: ['4 Feb', '11 Feb', '18 Feb', '25 Feb', '4 Mar', '11 Mar', '18 Mar'],
        datasets: [
          {
            label: 'Enterprise Solutions for NUS Project',
            data: [360, 730, 1080, 1400, 1770, 2000, 2300],
            fill: false,
            borderDash: [5, 5],
            borderColor: '#66BB6A'
          },
          {
            label: 'Industry Average',
            data: [380, 750, 1290, 1600, 1800, 2100, 2500],
            fill: true,
            borderColor: '#FFA726',
            backgroundColor: '#FFCC80'
          }
        ]
      },
      {
        labels: ['4 Feb', '11 Feb', '18 Feb', '25 Feb', '4 Mar', '11 Mar', '18 Mar'],
        datasets: [
          {
            label: 'Data Analytics Project',
            data: [410, 840, 1290, 1720, 2100, 2570, 3010],
            fill: false,
            borderColor: '#42A5F5'
          },
          {
            label: 'Industry Average',
            data: [380, 750, 1290, 1600, 1800, 2100, 2500],
            fill: true,
            borderColor: '#FFA726',
            backgroundColor: '#FFCC80'
          }
        ]
      },
      {
        labels: ['4 Feb', '11 Feb', '18 Feb', '25 Feb', '4 Mar', '11 Mar', '18 Mar'],
        datasets: [
          {
            label: 'Data Analytics Project',
            data: [410, 840, 1290, 1720, 2100, 2570, 3010],
            fill: false,
            borderColor: '#42A5F5'
          },
          {
            label: 'Enterprise Solutions for NUS Project',
            data: [360, 730, 1080, 1400, 1770, 2000, 2300],
            fill: false,
            borderDash: [5, 5],
            borderColor: '#66BB6A'
          },
          {
            label: 'Industry Average',
            data: [380, 750, 1290, 1600, 1800, 2100, 2500],
            fill: true,
            borderColor: '#FFA726',
            backgroundColor: '#FFCC80'
          }
        ]
      },
      {
        labels: ['4 Feb', '11 Feb', '18 Feb', '25 Feb', '4 Mar', '11 Mar', '18 Mar'],
        datasets: [
          {
            label: 'Data Analytics Project',
            data: [410, 430, 450, 430, 380, 470, 440],
            fill: false,
            borderColor: '#42A5F5'
          },
          {
            label: 'Enterprise Solutions for NUS Project',
            data: [360, 370, 350, 320, 370, 230, 300],
            fill: false,
            borderDash: [5, 5],
            borderColor: '#66BB6A'
          },
          {
            label: 'Industry Average',
            data: [380, 370, 540, 310, 200, 300, 400],
            fill: true,
            borderColor: '#FFA726',
            backgroundColor: '#FFCC80'
          }
        ]
      },
      {
        labels: ['4 Feb', '11 Feb', '18 Feb', '25 Feb', '4 Mar', '11 Mar', '18 Mar'],
        datasets: [
          {
            label: 'Enterprise Solutions for NUS Project',
            data: [360, 370, 350, 320, 370, 230, 300],
            fill: false,
            borderDash: [5, 5],
            borderColor: '#66BB6A'
          },
          {
            label: 'Industry Average',
            data: [380, 370, 540, 310, 200, 300, 400],
            fill: true,
            borderColor: '#FFA726',
            backgroundColor: '#FFCC80'
          }
        ]
      },
      {
        labels: ['4 Feb', '11 Feb', '18 Feb', '25 Feb', '4 Mar', '11 Mar', '18 Mar'],
        datasets: [
          {
            label: 'Data Analytics Project',
            data: [410, 430, 450, 430, 380, 470, 440],
            fill: false,
            borderColor: '#42A5F5'
          },
          {
            label: 'Industry Average',
            data: [380, 370, 540, 310, 200, 300, 400],
            fill: true,
            borderColor: '#FFA726',
            backgroundColor: '#FFCC80'
          }
        ]
      },
      {
        labels: ['4 Feb', '11 Feb', '18 Feb', '25 Feb', '4 Mar', '11 Mar', '18 Mar'],
        datasets: [
          {
            label: 'Data Analytics Project',
            data: [410, 430, 450, 430, 380, 470, 440],
            fill: false,
            borderColor: '#42A5F5'
          },
          {
            label: 'Enterprise Solutions for NUS Project',
            data: [360, 370, 350, 320, 370, 230, 300],
            fill: false,
            borderDash: [5, 5],
            borderColor: '#66BB6A'
          },
          {
            label: 'Industry Average',
            data: [380, 370, 540, 310, 200, 300, 400],
            fill: true,
            borderColor: '#FFA726',
            backgroundColor: '#FFCC80'
          }
        ]
      }
    ]

    const graphOptions = [
      {label: "Cumulative", value: "cumulative"},
      {label: "Periodic", value: "periodic"},
    ]

    const tagOptions = [
      {label: "All", value: "all"},
      {label: "Java", value: "java"},
      {label: "Python", value: "python"},
      {label: "SQL", value: "sql"},
    ]

    console.log("graph: "  + this.state.chosenGraph + ", tag: " + this.state.chosenTag)

    return (
      <div className="p-grid">
        <Helmet>
          <title>Cloud Data Costs Comparison</title>
          <meta name="description" content="Page" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
            <h1>Industrial Statistics</h1>
            <div className="p-grid">
              <div className="p-col-4 p-offset-1">
                <Dropdown
                  optionLabel="label"
                  value={this.state.chosenGraph}
                  options={graphOptions}
                  onChange={(e) => {this.setState({chosenGraph: e.value})}}
                  placeholder="Select a graph"
                  style={{width: '100%', paddingTop: '15px'}}
                />
              </div>
              <div className="p-col-3 p-offset-2">
                <Dropdown
                  optionLabel="label"
                  value={this.state.chosenTag}
                  options={tagOptions}
                  onChange={e => {this.setState({chosenTag: e.value})}}
                  placeholder="Select a tag"
                  style={{width: '100%', paddingTop: '15px'}}
                />
              </div>
              </div>
              <div className="p-col-12">
                <p>We have made an analysis of your project costs and outlined it against our cloud database containing cost data from all our industry partners.</p>
                <p>The chart below shows the cumulative costs for projects tagged with "Java", "Python" and "SQL".</p>
                {(this.state.chosenGraph.value === "cumulative" && this.state.chosenTag.value === "all") && <Chart type="line" data={graphData[0]} />}
                {(this.state.chosenGraph.value === "cumulative" && this.state.chosenTag.value === "java") && <Chart type="line" data={graphData[1]} />}
                {(this.state.chosenGraph.value === "cumulative" && this.state.chosenTag.value === "python") && <Chart type="line" data={graphData[2]} />}
                {(this.state.chosenGraph.value === "cumulative" && this.state.chosenTag.value === "sql") && <Chart type="line" data={graphData[3]} />}
                {(this.state.chosenGraph.value === "periodic" && this.state.chosenTag.value === "all") && <Chart type="bar" data={graphData[4]} />}
                {(this.state.chosenGraph.value === "periodic" && this.state.chosenTag.value === "java") && <Chart type="bar" data={graphData[5]} />}
                {(this.state.chosenGraph.value === "periodic" && this.state.chosenTag.value === "python") && <Chart type="bar" data={graphData[6]} />}
                {(this.state.chosenGraph.value === "periodic" && this.state.chosenTag.value === "sql") && <Chart type="bar" data={graphData[7]} />}
              </div>
          </div>
        </div>
      </div>
    );
  }
}
