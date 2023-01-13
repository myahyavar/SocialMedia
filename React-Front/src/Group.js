import React,{Component} from 'react';
import {variables} from './variables.js';

export class Group extends Component{

    constructor(props){
        super(props);

        this.state={
            groups:[],
            modalTitle:"",
            groupName:"",
            groupId:0,

            GroupIdFilter:"",
            GroupNameFilter:"",
            groupssWithoutFilter:[]
        }
    }

    FilterFn(){
        var GroupIdFilter=this.state.GroupIdFilter;
        var GroupNameFilter = this.state.GroupNameFilter;

        var filteredData=this.state.groupssWithoutFilter.filter(
            function(el){
                return el.groupId.toString().toLowerCase().includes(
                    GroupIdFilter.toString().trim().toLowerCase()
                )&&
                el.groupName.toString().toLowerCase().includes(
                    GroupNameFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({groups:filteredData});

    }

    sortResult(prop,asc){
        var sortedData=this.state.groupssWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({groups:sortedData});
    }

    changeGroupIdFilter = (e)=>{
        this.state.GroupIdFilter=e.target.value;
        this.FilterFn();
    }
    changeGroupNameFilter = (e)=>{
        this.state.GroupNameFilter=e.target.value;
        this.FilterFn();
    }

    refreshList(){
        fetch(variables.API_URL+'Groups')
        .then(response=>response.json())
        .then(data=>{
            this.setState({groups:data,groupssWithoutFilter:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeDepartmentName =(e)=>{
        this.setState({groupName:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Group",
            groupId:0,
            groupName:""
        });
    }
    editClick(dep){
        this.setState({
            modalTitle:"Edit Group",
            groupId:dep.groupId,
            groupName:dep.groupName
        });
    }

    createClick(){
        fetch(variables.API_URL+'groups',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                groupName:this.state.groupName
            })
        })
        .then(res=>res.status)
        .then((result)=>{
            //alert(result);
            if(result==201){
                alert("Successfully Created Group");
            }else{
                alert("Creation Failed");
            }
            this.refreshList();
        },(error)=>{
            alert('An error ocurred');
        })
    }


    updateClick(id){
        fetch(variables.API_URL+'Groups/'+id,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                groupId:this.state.groupId,
                groupName:this.state.groupName
            })
        })
        .then(res=>res.status)
        .then((result)=>{
            if(result==204){
                alert("Update Successfull");
            }else{
                alert("Update Failed");
            }
            this.refreshList();
        },(error)=>{
            //alert('Failed');
            this.refreshList();
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'groups/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.status)
        .then((result)=>{
            if(result==204){
                alert("Deletion Successfull");
            }else{
                alert("Deletion Failed");
            }
            this.refreshList();
        },(error)=>{
            this.refreshList();
        })
        }
    }

    render(){
        const {
            groups,
            modalTitle,
            groupId,
            groupName
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Group
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">

            
            <input className="form-control m-2"
            onChange={this.changeGroupIdFilter}
            placeholder="Filter"/>
            
            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('groupId',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('groupId',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>

            </div>
            ID
        </th>
        <th>
        <div className="d-flex flex-row">
        <input className="form-control m-2"
            onChange={this.changeGroupNameFilter}
            placeholder="Filter"/>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('groupName',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('groupName',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            Title
      
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
        {groups.map(dep=>
            <tr key={dep.groupId}>
                <td>{dep.groupId}</td>
                <td>{dep.groupName}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(dep)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(dep.groupId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
       <div className="input-group mb-3">
        <span className="input-group-text">Title</span>
        <input type="text" className="form-control"
        value={groupName}
        onChange={this.changeDepartmentName}/>
       </div>

        {groupId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {groupId!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick(groupId)}
        >Update</button>
        :null}

   </div>

</div>
</div> 
</div>


</div>
        )
    }
}
