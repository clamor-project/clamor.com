import React from "react";
import { connect } from "react-redux";
import { IState } from "../../../reducers";
import { RouteComponentProps } from "react-router";
import { getAllGroups, createGroup } from "../../../actions/group.action";
import { IGroup } from "../../../models/Group";
import { Card, Table, Button, Form, Input } from "reactstrap";
import { IUser } from "../../../models/User";
import { IUsergroup } from "../../../models/Usergroup";

interface IGroupSearchState{
    groupName: string;
    groupDescription: string;
}

interface ICurrentUserProps extends RouteComponentProps{
    searchGroups: () => void
    createGroup: (usergroup: IUsergroup) => void
    groupList: IGroup[]
    currentUser: IUser
}


class groupSearchComponent extends React.Component<ICurrentUserProps, IGroupSearchState>{
    constructor(props: ICurrentUserProps) {
        super(props);
        this.state = {
            groupName: '',
            groupDescription: ''
        }
    }

    handleClick = id => () => {
        console.log(id)
        this.props.history.push(`/groups/${id}`)
    }

    handleChange = (property: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        });
    }

    submit = (event: React.FormEvent) => {
        event.preventDefault();
        const usergroup: IUsergroup = {
            group: {
                description: this.state.groupDescription,
                id: 0,
                name: this.state.groupName,
                private: false
            },
            id: 0,
            joinedDate: new Date(),
            user: this.props.currentUser,
            role: {
                id: 1,
                roleName: 'organizer'
            }
        };
        this.props.createGroup(usergroup);
    }

    componentDidMount() {
        this.props.searchGroups()
    }
    
    render(){
        return(
            <Card>
                <Form onSubmit={this.submit}>
                    {this.props.groupList.length && <Table dark>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>See Page</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Input name="newGroup" onChange={this.handleChange('groupName')} value={this.state.groupName} placeholder="New Group Name" /></td>
                                <td><Input name="newDescription" onChange={this.handleChange('groupDescription')} value={this.state.groupDescription} placeholder="New Group Description" /></td>
                                <td><Button type="submit">Create</Button></td> 
                            </tr>
                            {this.props.groupList.map(group => (
                                <tr key={group.id}>
                                    <td>{group.name}</td>
                                    <td>{group.description}</td>
                                    <td><Button onClick={this.handleClick(group.id)}>go</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>}
                </Form>
            </Card>
        )
    }
        
}

const mapStateToProps = (state:IState) =>{
    return{
        currentUser: state.CurrentUser.self,
        groupList: state.GroupFinder.groupList
    }
}

const mapActionToProps = {
    searchGroups: getAllGroups,
    createGroup
}

export default connect(mapStateToProps,mapActionToProps)(groupSearchComponent)