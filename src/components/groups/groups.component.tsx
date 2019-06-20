import React from "react";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import { RouteComponentProps, withRouter } from "react-router";
import { getGroupById } from '../../actions/group.action'
import { IGroup } from "../../models/Group";


interface ICurrentUsersState{

}

interface ICurrentUserProps extends RouteComponentProps{
    match:any
    groupData:IGroup
    getGroupById:(id:number) => void
}


class groupComponent extends React.Component<ICurrentUserProps, ICurrentUsersState>{

    state = {

    }

    componentDidMount(){
        this.props.getGroupById(+this.props.match.params.id)
    }

    render(){
        return(
            <div>
                <h2>{this.props.groupData.name}</h2>
                <h4>{this.props.groupData.description}</h4>
            </div>
        )
    }   
        
}

const mapStateToProps = (state:IState) =>{
    return{
        groupData: state.CurrentGroup
    }

}

const mapActionToProps = {
  getGroupById
}

export default connect(mapStateToProps,mapActionToProps)(withRouter(groupComponent))