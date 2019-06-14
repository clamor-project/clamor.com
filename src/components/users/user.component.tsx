import React from "react";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import { RouteComponentProps } from "react-router";
import { user } from "../../models/user";

//The users page, can be seen by others but can only be edited by the user

interface ICurrentUsersState{
    isUsernameEditable: boolean
    isPasswordEditable: boolean
    isEmailEditable: boolean
    isDobEditable: boolean
    
}

interface ICurrentUserProps extends RouteComponentProps{
    currentUser: user

}


class userComponent extends React.Component<ICurrentUserProps, ICurrentUsersState>{
    state = {
            isUsernameEditable: false,
            isPasswordEditable: false,
            isEmailEditable: false,
            isDobEditable: false
    }

    

    //Function to have this page editable 
    isUser(){
        return true //always false
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
                                        <input type='text' value={this.props.currentUser.username}/>  
                                    </td>
                                    <td>
                                    <button type="submit" onClick={()=>{this.canEditUsername(false)}}>Submit</button>
                                    </td>
                                    
                                </tr>
                                :
                                <tr>
                                    <th>Username</th>
                                    <td>
                                        {this.props.currentUser.username}
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
                                        <input type='text' value={this.props.currentUser.password}/>  
                                    </td>
                                    <td>
                                    <button onClick={()=>{this.canEditPassword(false)}}>Submit</button>
                                    </td>
                                    
                                </tr>
                                :
                                <tr>
                                    <th>Password</th>
                                    <td>
                                        {this.props.currentUser.password}
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
                                        <input type='text' value={this.props.currentUser.email}/>  
                                    </td>
                                    <td>
                                    <button onClick={()=>{this.canEditEmail(false)}}>Edit</button>
                                    </td>
                                    
                                </tr>
                                :
                                <tr>
                                    <th>Email</th>
                                     <td>
                                        {this.props.currentUser.email}
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
                                        <input type='date' value={this.props.currentUser.dob}/>  
                                    </td>
                                    <td>
                                        <button onClick={()=>{this.canEditDob(false)}}>Edit</button>
                                    </td>
                                    
                                </tr>
                                :
                                <tr>
                                    <th>Birthday</th>
                                    <td>
                                        {this.props.currentUser.dob}
                                    </td>
                                    <td>
                                        <button onClick={()=>{this.canEditDob(true)}}>Edit</button>
                                    </td>
                                </tr>
                            }

                            </tbody>
                        </table>
                    </form>
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
                                    {this.props.currentUser.username}
                                </td>
                            </tr>
                            <tr>
                                <th>Password</th>
                                <td>
                                    {this.props.currentUser.password}
                                </td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>
                                    {this.props.currentUser.email}
                                </td>
                            </tr>
                            <tr>
                                <th>Birthday</th>
                                <td>
                                    {this.props.currentUser.dob}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }
        
}

const mapStateToProps = (state:IState) =>{
    return{
        currentUser: state.CurrentUser.currentUser
    }
}

const mapActionToProps = {
}

export default connect(mapStateToProps,mapActionToProps)(userComponent)