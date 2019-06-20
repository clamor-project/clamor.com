import React from "react";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import { RouteComponentProps, withRouter } from "react-router";
import { IUser } from "../../models/User";
import { getUserById } from "../../actions/user.action";

//The users page, can be seen by others but can only be edited by the user

interface ICurrentUsersState{
    isUsernameEditable: boolean
    isPasswordEditable: boolean
    isEmailEditable: boolean
    isDobEditable: boolean
    
}

interface ICurrentUserProps extends RouteComponentProps{
    match: any
    currentUser: IUser
    profileFocus: IUser
    getUserById: (id:number) => void

}


class UserComponent extends React.Component<ICurrentUserProps, ICurrentUsersState>{
    state = {
            isUsernameEditable: false,
            isPasswordEditable: false,
            isEmailEditable: false,
            isDobEditable: false,
    }

    componentDidMount(){
        this.props.getUserById(+this.props.match.params.id)
    }

    //Function to have this page editable 
    isUser(){
        if(this.props.currentUser === this.props.profileFocus){
            return true;
        }else{
            return false;
        }
    }

    //fucntion to know if a section is being edited
    canEditUsername(TorF){
        this.setState({
            isUsernameEditable : TorF
        })

        return TorF
    }

    //fucntion to know if a section is being edited
    canEditPassword(TorF){
        this.setState({
            isPasswordEditable : TorF
        })
        return TorF
    }

    //fucntion to know if a section is being edited
    canEditEmail(TorF){
        this.setState({
            isEmailEditable : TorF
        })
        return TorF
    }


    //fucntion to know if a section is being edited
    canEditDob(TorF){
        this.setState({
            isDobEditable : TorF
        })
        return TorF
    }

    updateUser = (event)=>{
        event.preventDefault()
        
    }

    
    render(){

        console.log(this.props.currentUser)
        console.log(this.state.isUsernameEditable)
        console.log(this.state.isPasswordEditable)
        console.log(this.state.isEmailEditable)
        console.log(this.state.isDobEditable)
        console.log()

        

        if(this.isUser()){
            return(
                <div>
                    <form onSubmit={this.updateUser}>
                        <table>
                            <tbody>
                            {this.state.isUsernameEditable ? 
                                <tr>
                                    <th>Username</th>
                                    <td>
                                        <input type='text' value={this.props.profileFocus.username}/>  
                                    </td>
                                    <td>
                                    <button type="submit" onClick={()=>{this.canEditUsername(false)}}>Submit</button>
                                    </td>
                                    
                                </tr>
                                :
                                <tr>
                                    <th>Username</th>
                                    <td>
                                        {this.props.profileFocus.username}
                                    </td>
                                    <td>
                                        <button onClick={()=>{this.canEditUsername(true)}}>Edit</button>
                                    </td>
                                </tr>
                            }

                            {this.state.isPasswordEditable? 
                                <tr>
                                    <th>Password</th>
                                    <td>
                                        <input type='text' value={this.props.profileFocus.password}/>  
                                    </td>
                                    <td>
                                    <button onClick={()=>{this.canEditPassword(false)}}>Submit</button>
                                    </td>
                                    
                                </tr>
                                :
                                <tr>
                                    <th>Password</th>
                                    <td>
                                        {this.props.profileFocus.password}
                                    </td>
                                    <td>
                                        <button onClick={()=>{this.canEditPassword(true)}}>Edit</button>
                                    </td>
                                </tr>
                            }

                            {this.state.isEmailEditable? 
                                <tr>
                                    <th>Email</th>
                                    <td>
                                        <input type='text' value={this.props.profileFocus.email}/>  
                                    </td>
                                    <td>
                                    <button onClick={()=>{this.canEditEmail(false)}}>Edit</button>
                                    </td>
                                    
                                </tr>
                                :
                                <tr>
                                    <th>Email</th>
                                     <td>
                                        {this.props.profileFocus.email}
                                    </td>
                                    <td>
                                        <button onClick={()=>{this.canEditEmail(true)}}>Edit</button>
                                    </td>
                                </tr>
                            }

                            {this.state.isDobEditable? 
                                <tr>
                                    <th>Birthday</th>
                                    <td>
                                        <input type='date' value={this.props.profileFocus.dateOfBirth.toString()}/>  
                                    </td>
                                    <td>
                                        <button onClick={()=>{this.canEditDob(false)}}>Edit</button>
                                    </td>
                                    
                                </tr>
                                :
                                <tr>
                                    <th>Birthday</th>
                                    <td>
                                        {this.props.profileFocus.dateOfBirth}
                                    </td>
                                    <td>
                                        <button onClick={()=>{this.canEditDob(true)}}>Edit</button>
                                    </td>
                                </tr>
                            }

                            </tbody>
                        </table>
                    </form>

                    <h2></h2>
                    {/*where to pu the list of friends*/}
                    
                </div>
            )
        } else {
            return(
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Username</th>
                                <td>
                                    {this.props.profileFocus.username}
                                </td>
                            </tr>
                            <tr>
                                <th>Password</th>
                                <td>
                                    {this.props.profileFocus.password}
                                </td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>
                                    {this.props.profileFocus.email}
                                </td>
                            </tr>
                            <tr>
                                <th>Birthday</th>
                                <td>
                                    {new Date(this.props.profileFocus.dateOfBirth).toDateString()}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/*where to put the list of friends*/}
                </div>
            )
        }
    }
        
}

const mapStateToProps = (state:IState) =>{
    return{
        currentUser: state.CurrentUser.self,
        profileFocus: state.UserFinder.selectUser
    }
}

const mapActionToProps = {
    getUserById
}

export default connect(mapStateToProps,mapActionToProps)(withRouter(UserComponent))