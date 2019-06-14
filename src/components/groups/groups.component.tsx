import React from "react";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import { RouteComponentProps, withRouter } from "react-router";


interface ICurrentUsersState{

}

interface ICurrentUserProps extends RouteComponentProps{
    match:any
}


class groupComponent extends React.Component<ICurrentUserProps, ICurrentUsersState>{

    state = {

    }

    render(){
        return(
            <div>
                <h2>This is a group {this.props.match.params.id}'s component</h2>
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
  
}

export default connect(mapStateToProps,mapActionToProps)(withRouter(groupComponent))