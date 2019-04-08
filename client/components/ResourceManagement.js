import React, { Component } from 'react';
import Resource from './Resource';


class ResourceManagement extends Component {
    state = {  
      
        rM: [],
		 totalWage: 0,

        resources: [
            {
                id: 0,
                name: "John Doe",
                skills: ["Java"],
                wage: 20
            },
            {
                id: 1,
                name: "Crystal Lee",
                skills: ["C","Python"],
                wage: 30
            },
            {
                id: 2,
                name: "Jonathan Goh",
                skills: ["Python","Javascript"],
                wage: 25
            },
            {
                id: 3,
                name: "Patricia Lim",
                skills: ["UI Design","HTML","Javascript","NodeJs"],
                wage: 40
            },
            {
                id: 4,
                name: "Alicia Lee",
                skills: ["Python","HTML","C"],
                wage: 35
            }
        ],
        savedData: []

    }

    

 
    handlerMOnAdd = () =>{
        const {value} = this.selectrM;
        if(value >= 0){
            this.addrM(value);
        }
       
    }

    addrM = (value) =>{
        if(value >= 0){
            if(!this.state.rM.find(t => t.id == value)){
                const resource = this.state.resources.find( c => c.id == value );
               // resource.totalWorkPercent = 1;
              resource.totalWage = resource.wage;
               // resource.totalWorkHours = 1;
                let rM = this.state.rM.slice();   
                rM.push(resource);  
                this.state.rM = rM;
               // this.sumTotalWage(); 
            }
        }
    }

    handleRemoveresourceResource = (id) =>{
        const rM = this.state.rM.filter( c => c.id !== id );
        this.state.rM = rM;
     
    }

    

    

    handleSaveButtonClick = (event) =>{
        let currentData = [];
        let id = Math.random();
        currentData.push({id});
        currentData.push(this.state.tags);
        currentData.push(this.state.rM);
        currentData.push(this.state.totalWorkPercent);
        currentData.push(this.state.totalWage);
        currentData.push(this.state.totalWorkHours);

        let temp = this.state.savedData.slice();   
        temp.push(currentData);  
        this.setState({savedData:temp});
    }


    render() { 
        return (  
            <div className="container jumbotron">
                <h1 className="display-5">Resource Management</h1>
                <hr className="my-4" />
                <form onSubmit = {this.handleSaveButtonClick}>
                    <div className="row">
                        <div className="col-md-7 col-lg-6">
                         
                          
                           
                            <div className="form-group row">
                        
                                <div className="col-9">
                                    <select className="custom-select" ref={(c) => this.selectrM = c} defaultValue={-1}>
                                        <option value="-1" disabled>-- Select User in System --</option>
                                        {this.state.resources.map(r =>  <option value={r.id} key={r.id}>{r.name}</option> )}
                                    </select>
                                </div>
                                <div className="col-1">
                                    <button type="button" className="btn btn-secondary float-right" onClick={this.handlerMOnAdd}>+</button>       
                                </div>
                            </div>
                        </div>
                        
                    </div>  
                    <hr className="my-4" />


                    <div className="row">             
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col" className="text-center">Skills</th>
                                    <th scope="col" className="text-center">Wage(Hourly)</th>
                                    
                                    <th scope="col"> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.rM.map(t =>
                                    <Resource 
                                        key={t.id}
                                        resource={t} 
                                        onDeleteClick = {this.handleRemoveresourceResource}
                                        onTimeRequiredChanged = {this.handleTimeRequiredChanged}
                                        onTotalWorkPercentChanged = {this.handleTotalWorkPercentChanged}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
         );
    }
}
 
export default ResourceManagement;