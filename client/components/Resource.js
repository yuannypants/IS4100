import React, { Component } from 'react';

class Resource extends Component {
    state = { 
        resource: this.props.resource
     }


    render() { 
        const { resource } = this.props;

        if(!resource.totalWage){
            resource.totalWage = resource.wage;
        }
        return ( 
            <tr>
                <th scope="row">
                    <span>{resource.name}</span> <br/>
                    
                </th>
                <td className="d-flex justify-content-center">
                   {resource.skills.map((k,i)=>  
                            <a href="#" className="badge badge-pill badge-info mr-2"  key={i}>{k}</a>
                        )}
                </td>
                <td className="text-center">
                  <span >${resource.totalWage}</span> 
                </td>
                
                <td>
                    <button type="button" className="btn btn-danger" onClick={()=> this.props.onDeleteClick(resource.id) } >&times;</button> 
                </td>
            </tr>
        );
    }
}
 
export default Resource;