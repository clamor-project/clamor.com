import React from "react";
import { connect } from "react-redux";
import { IState } from "../../../reducers";
import { RouteComponentProps } from "react-router";
//For the groups that the user is in so they can see or drop groups
interface IGroupUsersState{
    
}

interface ICurrentUserProps extends RouteComponentProps{

}


class groupUsersComponent extends React.Component<ICurrentUserProps, IGroupUsersState>{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    
    render(){
        return(
            <div></div>
        )
    }
        
}

const mapStateToProps = (state:IState) =>{
    return{
    }
}

const mapActionToProps = {
}

export default connect(mapStateToProps,mapActionToProps)(groupUsersComponent)