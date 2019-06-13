import React from "react";
import { connect } from "react-redux";
import { IState } from "../../../reducers";
import { RouteComponentProps } from "react-router";

interface IFriendsState{
    
}

interface ICurrentUserProps extends RouteComponentProps{

}


class friendsComponent extends React.Component<ICurrentUserProps, IFriendsState>{
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

export default connect(mapStateToProps,mapActionToProps)(friendsComponent)