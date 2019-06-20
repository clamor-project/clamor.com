import React from "react";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import { RouteComponentProps, withRouter } from "react-router";
import { getGroupById } from '../../actions/group.action'
import { IGroup } from "../../models/Group";
import { IUsergroup } from "../../models/Usergroup";


interface ICurrentUsersState{

}

interface ICurrentUserProps extends RouteComponentProps{
    match:any
    groupData:IGroup
    userGroups: IUsergroup[]
    userId: number
    getGroupById:(id:number) => void
}


class GroupComponent extends React.Component<ICurrentUserProps, ICurrentUsersState>{

    state = {

    }

    componentDidMount(){
        this.props.getGroupById(+this.props.match.params.id)
    }

    render(){
        return(
            <div>
                <h2>{this.props.groupData.name}</h2>
                {JSON.stringify(this.props.groupData)}
                {JSON.stringify(this.props.userGroups)}
                {this.props.userId}
                {}
                <h4>{this.props.groupData.description}</h4>
            </div>
        )
    }   
        
}

const mapStateToProps = (state:IState) =>{
    return{
        groupData: state.CurrentGroup,
        userGroups: state.CurrentUser.groups,
        userId: state.CurrentUser.self.id
    }

}

const mapActionToProps = {
  getGroupById
}

export default connect(mapStateToProps,mapActionToProps)(withRouter(GroupComponent))