import React from "react";
import { connect } from "react-redux";
import { IState } from "../../../reducers";
import { RouteComponentProps } from "react-router";

interface IFriendsState{
    
}

interface ICurrentFriendProps extends RouteComponentProps{

}


class friendsComponent extends React.Component<ICurrentFriendProps, IFriendsState>{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    
    render(){
        return(
            <div>
                <h2>Friend Requests</h2>
                
                <h2>Friends</h2>
            </div>
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