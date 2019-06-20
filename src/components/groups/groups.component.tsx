import React from "react";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import { RouteComponentProps, withRouter } from "react-router";
import { getGroupById, joinGroup } from '../../actions/group.action'
import { IGroup } from "../../models/Group";
import { IUsergroup } from "../../models/Usergroup";
import { IUser } from "../../models/User";


interface ICurrentUsersState {

}

interface ICurrentUserProps extends RouteComponentProps {
    match: any
    groupData: IGroup
    userGroups: IUsergroup[]
    user: IUser
    getGroupById: (id: number) => void
    joinGroup: (user: IUser, groupId: number) => void
}


class GroupComponent extends React.Component<ICurrentUserProps, ICurrentUsersState>{

    state = {

    }

    componentDidMount() {
        this.props.getGroupById(+this.props.match.params.id)
    }

    handleJoin = () => {
        this.props.joinGroup(this.props.user, this.props.groupData.id)
    }

    render() {
        let matchedGroup = this.props.userGroups.filter(usergroup => (
            usergroup.group.id === this.props.groupData.id
        ))
        let groupRole = matchedGroup.length ?
        matchedGroup[0].role.roleName
        : 'none'
        return (
            <div>
                <h2>{this.props.groupData.name}</h2>
                {(this.props.user.id && !matchedGroup.length && !this.props.groupData.private) ?
                    (<button onClick={this.handleJoin}>
                        Join This Group
                    </button>) : <>
                        {groupRole === 'left' && <button onClick={this.handleJoin}>
                            Rejoin this Group
                        </button>}
                        {groupRole === 'banned' && <p>
                            you are currently banned from this group
                        </p>}
                    </>
        }
                <h4>{this.props.groupData.description}</h4>
            </div>
        )
    }

}

const mapStateToProps = (state: IState) => {
    return {
        groupData: state.CurrentGroup,
        userGroups: state.CurrentUser.groups,
        user: state.CurrentUser.self
    }

}

const mapActionToProps = {
    getGroupById,
    joinGroup
}

export default connect(mapStateToProps, mapActionToProps)(withRouter(GroupComponent))