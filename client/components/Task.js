import React, { Component } from 'react';

class Task extends Component {
    state = { 
        task: this.props.task
     }

    handleTimeRequiredChanged = () => {
        const { value }= this.inputTimeRequired;
        this.props.onTimeRequiredChanged( this.state.task.id, value);            
    }

    handleTotalWorkPercentChanged = () => {
        const { value }= this.selectWorkPercent;
        this.props.onTotalWorkPercentChanged( this.state.task.id, value);            
    }

    render() { 
        const { task } = this.props;

        if(!task.totalWage){
            task.totalWage = task.wage;
        }
        return ( 
            <tr>
                <th scope="row">
                    <span>{task.name}</span> <br/>
                    <span>
                        {task.skills.map((k,i)=>  
                            <a href="#" className="badge badge-pill badge-info mr-2"  key={i}>{k}</a>
                        )}
                    </span>
                </th>
                <td className="d-flex justify-content-center">
                    <input type="number" min={1} max={100} defaultValue={1} className="form-control col-4" id="r-work" placeholder="" ref={(c) => this.selectWorkPercent = c} />  
                </td>
                <td className="text-center">
                  <span >${task.totalWage}</span> 
                </td>
                <td className="d-flex justify-content-center">
                    <input type="number" min={1} defaultValue={1} className="form-control col-3" id="r-wage" placeholder="" ref={(c) => this.inputTimeRequired = c} onChange={this.handleTimeRequiredChanged }/>  
                </td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={()=> this.props.onDeleteClick(task.id) } >&times;</button> 
                </td>
            </tr>
        );
    }
}
 
export default Task;