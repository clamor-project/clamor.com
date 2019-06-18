import React from "react";
import { connect } from "react-redux";
import { IState } from "../../../reducers";
import { RouteComponentProps } from "react-router";
import { getUserGroups } from '../../../actions/user.action'
import { IUsergroup } from "../../../models/Usergroup";
//For the groups that the user is in so they can see or drop groups

interface ICurrentUserProps extends RouteComponentProps {
    groups: IUsergroup[]
    getUserGroups: (id:number) => void
    selfId: number
}


class GroupUsersComponent extends React.PureComponent<ICurrentUserProps>{

    componentDidMount() {
        this.props.selfId && this.props.getUserGroups(this.props.selfId)
    }

    handleClick = (id:number) => () => {
        this.props.history.push('/groups/' + id)
    }

    // needed: some server side logic to identify the user's id dirrectly
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
        groups: state.CurrentUser.groups,
        selfId: state.CurrentUser.self.id
    }
}

const mapActionToProps = {
    getUserGroups
}

export default connect(mapStateToProps, mapActionToProps)(GroupUsersComponent)