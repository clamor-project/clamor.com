import React from "react";
import { connect } from "react-redux";
import { IState } from "../../../reducers";
import { RouteComponentProps } from "react-router";
import { getAllGroups } from "../../../actions/group.action";
import { IGroup } from "../../../models/Group";
import { Card, Table, Button } from "reactstrap";

interface IGroupSearchState{
    
}

interface ICurrentUserProps extends RouteComponentProps{
    searchGroups: () => void
    groupList: IGroup[]
}


class groupSearchComponent extends React.Component<ICurrentUserProps, IGroupSearchState>{

    handleClick = id => () => {
        console.log(id)
        this.props.history.push(`/groups/${id}`)
    }

    componentDidMount() {
        this.props.searchGroups()
    }
    
    render(){
        return(
            <Card>
                {this.props.groupList.length && <Table dark>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>See Page</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.groupList.map(group => (
                            <tr key={group.id}>
                                <td>{group.name}</td>
                                <td>{group.description}</td>
                                <td><Button onClick={this.handleClick(group.id)}>go</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>}
            </Card>
        )
    }
        
}

const mapStateToProps = (state:IState) =>{
    return{
        groupList: state.GroupFinder.groupList
    }
}

const mapActionToProps = {
    searchGroups: getAllGroups
}

export default connect(mapStateToProps,mapActionToProps)(groupSearchComponent)