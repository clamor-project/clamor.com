import React from "react";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import { RouteComponentProps, withRouter } from "react-router";
import { IUser } from "../../models/User";
import { getUserById, updateProfile, updateUser } from "../../actions/user.action";
import { IFriending } from "../../models/Friending";
import { Link } from "react-router-dom";

//The users page, can be seen by others but can only be edited by the user

interface ICurrentUsersState{
    isUsernameEditable: boolean
    isPasswordEditable: boolean
    isEmailEditable: boolean
    isDobEditable: boolean
    didUpdate: string
    thisProfile: IUser
    previousPage: number
    
    
}

interface ICurrentUserProps extends RouteComponentProps{
    match: any
    currentUser: IUser
    profileFocus: IUser
    mutualFriends: IFriending[]
    profileId: number
    getUserById: (id:number) => void
    updateProfile: (user: IUser) => void
    updateUser: (user:IUser) => void

}


class UserComponent extends React.Component<ICurrentUserProps, ICurrentUsersState>{
    constructor(props){
        super(props)
        this.state = {
            isUsernameEditable: false,
            isPasswordEditable: false,
            isEmailEditable: false,
            isDobEditable: false,
            didUpdate: "",
            thisProfile: {
                id:0,
                username: '',
                email: '',
                dateOfBirth: ''
            },
            previousPage: 0,
        }
    }

    componentWillMount(){
        try{
            this.props.getUserById(+this.props.match.params.id)
        }catch(err){
            console.log(err)
        }

        this.setState({
            thisProfile: this.props.profileFocus
        }) 
    }

    componentDidUpdate(){
        if(this.state.previousPage != +this.props.match.params.id){
            try{
                this.props.getUserById(+this.props.match.params.id)
                this.setState({
                    previousPage: +this.props.match.params.id
                })
            }catch(err){
                console.log(err)
            }
            
            
        }

        if(this.props.profileId != this.state.thisProfile.id){
            this.setState({
                thisProfile: this.props.profileFocus
            }) 
        }
        
    }

    //Function to have this page editable 
    isUser(){
        if(this.props.currentUser.id === +this.props.match.params.id){
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

    handleChangeFor = property => (event) => {
        this.setState({
            thisProfile: {
                ...this.state.thisProfile,
                [property]: event.target.value
            }
        });
    }

    updateUser = (event)=>{
        event.preventDefault()
        try{
            this.props.updateUser(this.state.thisProfile)
        }catch(err){
            console.log(err)
        }
        this.setState({
            didUpdate: "Updated!"
        })
        
    }

    printFriends = () =>{

        let allFriends = this.props.mutualFriends.map((friends, index)=>{
            return(
                <li key={`${friends.id}`}><Link to = {friends.user1.id !== +this.props.match.params.id ? '/profile/' + friends.user1.id.toString(): '/profile/' + friends.user2.id.toString()}>{friends.user1.id !== +this.props.match.params.id ? friends.user1.username: friends.user2.username}</Link></li>
            )
        })

        return allFriends
    }

    
    render(){
        console.log(this.state.thisProfile.id)
        console.log(+this.props.match.params.id)
        

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
                                        <input type='text' value={this.state.thisProfile.username} onChange={this.handleChangeFor('username')}/>  
                                    </td>
                                    <td>
                                    <button type="submit" onClick={()=>{this.canEditUsername(false)}}>Submit</button>
                                    </td>
                                    
                                </tr>
                                :
                                <tr>
                                    <th>Username</th>
                                    <td>
                                        {this.state.thisProfile.username}
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
                                        <input type='text' value={this.state.thisProfile.password} onChange={this.handleChangeFor('password')}/>  
                                    </td>
                                    <td>
                                    <button onClick={()=>{this.canEditPassword(false)}}>Submit</button>
                                    </td>
                                    
                                </tr>
                                :
                                <tr>
                                    <th>Password</th>
                                    <td>
                                        {this.state.thisProfile.password}
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
                                        <input type='text' value={this.state.thisProfile.email} onChange={this.handleChangeFor('email')}/>  
                                    </td>
                                    <td>
                                    <button type = 'submit' onClick={()=>{this.canEditEmail(false)}}>Submit</button>
                                    </td>
                                    
                                </tr>
                                :
                                <tr>
                                    <th>Email</th>
                                     <td>
                                        {this.state.thisProfile.email}
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
                                        <input type='date' value={this.state.thisProfile.dateOfBirth.toString()} onChange={this.handleChangeFor('dateOfBirth')}/>  
                                    </td>
                                    <td>
                                        <button type = 'submit' onClick={()=>{this.canEditDob(false)}}>Submit</button>
                                    </td>
                                    
                                </tr>
                                :
                                <tr>
                                    <th>Birthday</th>
                                    <td>
                                        {new Date(this.state.thisProfile.dateOfBirth).toDateString()}
                                    </td>
                                    <td>
                                        <button onClick={()=>{this.canEditDob(true)}}>Edit</button>
                                    </td>
                                </tr>
                            }

                            </tbody>
                        </table>
                    </form>

                    <p> {this.state.didUpdate}</p>
                    
                    <h2>Friends</h2>
                    <ol>
                        {this.printFriends()}
                    </ol>
                    
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
                                    {this.state.thisProfile.username}
                                </td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>
                                    {this.state.thisProfile.email}
                                </td>
                            </tr>
                            <tr>
                                <th>Birthday</th>
                                <td>
                                    {new Date(this.state.thisProfile.dateOfBirth).toDateString()}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>Friends</h2>
                    <ol>
                        {this.printFriends()}
                    </ol>
                </div>
            )
        }
    }
        
}

const mapStateToProps = (state:IState) =>{
    return{
        currentUser: state.CurrentUser.self,
        profileFocus: state.UserFinder.selectUser,
        profileId: state.UserFinder.selectUser.id,
        mutualFriends: state.UserFinder.friends
    }
}

const mapActionToProps = {
    getUserById,
    updateProfile,
    updateUser,
}

export default connect(mapStateToProps,mapActionToProps)(withRouter(UserComponent))