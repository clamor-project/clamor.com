import React from "react";
import { connect } from "react-redux";
import { IState } from "../../../reducers";
import { RouteComponentProps } from "react-router";
import { getUserGroups } from '../../../actions/user.action'
//For the groups that the user is in so they can see or drop groups
interface IGroupUsersState {

}

interface ICurrentUserProps extends RouteComponentProps {
    groups: any[]
    getUserGroups: (id: number) => void
}


class GroupUsersComponent extends React.Component<ICurrentUserProps, IGroupUsersState>{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getUserGroups(1)
    }

    handleClick = (id:number) => () => {
        this.props.history.push('/groups/' + id)
    }

    // needed to complete: saved state including the current user
    // changing the componentDidMount to use the current user's id
    // some server side logic to identify the user's id dirrectly
    render() {
        return (
            <div>
                {this.props.groups.length && <div>
                    {this.props.groups.map(group => <div key={group.id}>
                        <div>
                            <h4>{group.group.name}</h4>
                            <h6>{group.role.roleName}</h6>
                            <p>{group.group.description}</p>
                        </div>
                        {group.role.roleName !== 'banned' && <button onClick={this.handleClick(group.group.id)}>
                            go
                        </button>}
                    </div>)}
                </div>}
            </div>
        )
    }

}

const mapStateToProps = (state: IState) => {
    return {
        groups: state.CurrentUser.groups
    }
}

const mapActionToProps = {
    getUserGroups
}

export default connect(mapStateToProps, mapActionToProps)(GroupUsersComponent)