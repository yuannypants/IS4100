import React, { Component } from 'react';
import Task from './Task';

class Tasks extends Component {
    state = {  
        tags: [],
        tasks: [],
        totalWorkPercent: 0,
        totalWage: 0,
        totalWorkHours: 0,
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

    handleTagOnEnter = (event) =>{  
        if (event.key === 'Enter') {
            this.handleTagOnAdd();
        }
    }

    handleTagOnAdd = () =>{  
        let inputValue =this.inputTag.value;
        if(!inputValue) return;

        let tags = this.state.tags.slice();    
        if(!this.state.tags.find(c => c.toLowerCase() == inputValue.toLowerCase())){
            tags.push(inputValue);  
            this.setState({tags})
            this.handleAutoAllocate(inputValue);
        }
        this.inputTag.value  = null;   
    }

    handleAutoAllocate = (skill) =>{
        let resources =  this.state.resources.filter( r =>   r.skills.find( k => k.toLowerCase() == skill.toLowerCase() ) );   
        resources.map(c => { 
            let value = c.id;
            this.addResources(value);
        });   
        this.sumTotalWage(); 
    }

    handleTagOnRemove = (index) =>{
        const tags = this.state.tags.filter( (k,i) => i !== index );
        this.setState({tags});
    } 
 
    handleResourcesOnAdd = () =>{
        const {value} = this.selectResources;
        if(value >= 0){
            this.addResources(value);
        }
       
    }

    addResources = (value) =>{
        if(value >= 0){
            if(!this.state.tasks.find(t => t.id == value)){
                const resource = this.state.resources.find( c => c.id == value );
                resource.totalWorkPercent = 1;
                resource.totalWage = resource.wage;
                resource.totalWorkHours = 1;
                let tasks = this.state.tasks.slice();   
                tasks.push(resource);  
                this.state.tasks = tasks;
                this.sumTotalWage(); 
            }
        }
    }

    handleRemoveTaskResource = (id) =>{
        const tasks = this.state.tasks.filter( c => c.id !== id );
        this.state.tasks = tasks;
        this.sumTotalWage(); 
    }

    handleTimeRequiredChanged= (id, value) =>{
        let task = this.state.tasks.find(c => c.id === id);
        let updatedTask = task;
        updatedTask.totalWage = task.wage * value;
        updatedTask.totalWorkHours = value;
        
        try{
            this.setState(update(this.state.tasks, 
                { $splice: [[task, 1, updatedTask]] }
            ));
        }catch(e){}

        this.sumTotalWage();
    }

    handleTotalWorkPercentChanged= (id, value) =>{
        let task = this.state.tasks.find(c => c.id === id);
        let updatedTask = task;
        updatedTask.totalWorkPercent = value;
     
        try{
            this.setState(update(this.state.tasks, 
                { $splice: [[task, 1, updatedTask]] }
            ));
        }catch(e){}
        this.sumTotalWorkPercent;

    }

    sumTotalWorkPercent = () =>{
        let totalWorkPercent = 0;
        this.state.tasks.map(c =>{
            if(c.totalWorkPercent){
                totalWorkPercent += parseInt(c.totalWorkPercent);
            }
        });

        this.setState({totalWorkPercent});
    }

    sumTotalWage = () =>{
        let totalWage = 0;
        let totalWorkHours = 0;
        this.state.tasks.map(c =>{
            if(c.totalWage){
                totalWage += parseInt(c.totalWage);
                totalWorkHours += parseInt(c.totalWorkHours);
            }
        });
        this.setState({totalWage});
        this.setState({totalWorkHours});
    }

    handleSaveButtonClick = (event) =>{
        let currentData = [];
        let id = Math.random();
        currentData.push({id});
        currentData.push(this.state.tags);
        currentData.push(this.state.tasks);
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
                <h1 className="display-5">Add/Edit Task</h1>
                <hr className="my-4" />
                <form onSubmit = {this.handleSaveButtonClick}>
                    <div className="row">
                        <div className="col-md-7 col-lg-6">
                            <div className="form-group row">
                                <label htmlFor="t-name" className="col-2 col-form-label">Name:</label>
                                <div className="col-10">
                                    <input type="text" className="form-control" id="t-name" placeholder="Report Writing" required/>  
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="t-tags" className="col-2 col-form-label">Tags:</label>
                                <div className="col-9">
                                    <input type="text" className="form-control" id="t-tags" placeholder="<Enter New Tag>" ref={(c) => this.inputTag = c} onKeyDown={this.handleTagOnEnter} />  
                                </div>
                                <div className="col-1">
                                    <button type="button" className="btn btn-secondary float-right"  onClick={this.handleTagOnAdd}>+</button>       
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-2"> </div>
                                <div className="col-sm-push-2 col-sm-9">
                                    {this.state.tags.map((k,i)=>{
                                        let handleClick = () => {
                                            this.handleTagOnRemove(i);
                                        };   
                                        return (<a href="#" className="badge badge-pill badge-info mr-2" onClick={handleClick} key={i}>{k}</a>);
                                    })}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="t-tags" className="col-2 col-form-label">Resources:</label>
                                <div className="col-9">
                                    <select className="custom-select" ref={(c) => this.selectResources = c} defaultValue={-1}>
                                        <option value="-1" disabled>-- Select Resources --</option>
                                        {this.state.resources.map(r =>  <option value={r.id} key={r.id}>{r.name}</option> )}
                                    </select>
                                </div>
                                <div className="col-1">
                                    <button type="button" className="btn btn-secondary float-right" onClick={this.handleResourcesOnAdd}>+</button>       
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-lg-6">
                            <div className="row">
                                <div className="col-md-push-4 col-sm-12">
                                    <button type="submit" className="btn btn-primary float-right">Update Task</button> 
                                </div>
                            </div>
                            <div className="container">
                                <dl className="row">
                                    <dt className="col-sm-4">Expected Duration</dt>
                                    <dd className="col-sm-4">{this.state.totalWorkHours} hours</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-4">Expected Cost</dt>
                                    <dd className="col-sm-4">${this.state.totalWage}</dd>
                                </dl>
                            </div>
                        </div> 
                    </div>  
                    <hr className="my-4" />

                    <div className="row">             
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col" className="text-center">% of work to allocate</th>
                                    <th scope="col" className="text-center">Wage(Hourly)</th>
                                    <th scope="col" className="text-center">Time Required(H)</th>
                                    <th scope="col"> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tasks.map(t =>
                                    <Task 
                                        key={t.id}
                                        task={t} 
                                        onDeleteClick = {this.handleRemoveTaskResource}
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
 
export default Tasks;