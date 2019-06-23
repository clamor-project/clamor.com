import React from "react";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import { RouteComponentProps, withRouter } from "react-router";
import { getGroupById, joinGroup, leaveGroup } from '../../actions/group.action'
import { getEventsByGroupId } from '../../actions/event.action';
import { IGroup } from "../../models/Group";
import { IUsergroup } from "../../models/Usergroup";
import { IUser } from "../../models/User";
import { Container, CardColumns, Card, CardBody, CardTitle, CardText, CardImg, CardFooter, Jumbotron, Button } from "reactstrap";
import { IEvent } from "../../models/Event";
import NewEventModal from "./new-event-modal.component";
import EditEventModal from "./edit-event-modal-component";
import GroupMessagingComponent from "./group-messaging/group-messaging.component";
import { getGroupMessagesByGroupId } from '../../actions/group-message.action';

interface ICurrentUsersState {
    modal: boolean;
    usergroup: IUsergroup;
}

interface ICurrentUserProps extends RouteComponentProps {
    match: any
    groupData: IGroup
    userGroups: IUsergroup[]
    user: IUser
    eventList: IEvent[]
    getGroupById: (id: number) => void
    joinGroup: (user: IUser, groupId: number) => void
    leaveGroup: (user: IUser, groupId: number) => void
    getEventsByGroupId: (groupId: number) => void
    getGroupMessagesByGroupId: (groupId: number) => void
}


class GroupComponent extends React.Component<ICurrentUserProps, ICurrentUsersState>{
    constructor(props: ICurrentUserProps) {
        super(props);
        this.state = {
            modal: false,
            usergroup: {
                group: null,
                id: 0,
                joinedDate: null,
                user: null,
                role: {id: 0, roleName: ''}
            }
        }
    }

    componentDidMount() {
        this.props.getGroupById(+this.props.match.params.id);
        this.props.getEventsByGroupId(this.props.match.params.id);
        this.props.getGroupMessagesByGroupId(this.props.match.params.id);
        this.findUsergroup();
    }

    findUsergroup = () => {
        for (let ug of this.props.userGroups) {
            if (parseInt(this.props.match.params.id) === ug.group.id) {
                this.setState({
                    ...this.state,
                    usergroup: ug
                });
            }
        }
    }

    toggleModal = (prevState) => {
        this.setState({
            modal: !prevState
        });
    }

    handleStatus = (id: number, roleName: string) => {
        this.setState({
            ...this.state,
            usergroup: {
                ...this.state.usergroup,
                role: {id, roleName}
            }
        });
    }

    handleJoin = () => {
        this.props.joinGroup(this.props.user, this.props.groupData.id)
        this.handleStatus(2, 'member');
    }

    handleLeave = () => {
        this.props.leaveGroup(this.props.user, this.props.groupData.id);
        this.handleStatus(4, 'left');
    }

    jumboSub = (groupRole: string) => {
        switch (groupRole) {
            case "left":
                return <Button color="primary" onClick={this.handleJoin}>Rejoin this Group</Button>

            case "banned":
                return <p>You are currently banned from this group</p>

            case "member":
                return <Button color="danger" onClick={this.handleLeave}>Leave this Group</Button>

            default:
                return <></>
        }
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
                <Jumbotron>
                    <h1 className="display-3">{this.props.groupData.name}</h1>
                    <p className="lead">{this.props.groupData.description}</p>
                    <hr className="my-2" />
                    <p className="lead">
                        {(this.props.user.id && !matchedGroup.length && !this.props.groupData.private) ?
                            <Button color="primary" onClick={this.handleJoin}>
                                Join This Group
                            </Button> : this.jumboSub(groupRole)
                        }
                    </p>
                </Jumbotron>
                <Container className="events">
                    <CardColumns>
                        {this.props.eventList.map(event => 
                            <Card key={event.id} className="event-card">
                                <CardBody>
                                    <CardImg src={`https://picsum.photos/id/${(event.id+7)*7 % 1084}/500/500`} alt="picsum event" />
                                    <CardTitle className="card-title">
                                        <h3>{event.title}</h3>
                                        on {new Date(event.dateOf).toDateString()} at {new Date(event.dateOf).toLocaleTimeString()}
                                    </CardTitle>
                                    <CardText className="card-text">
                                        Details:
                                        {event.description}
                                    </CardText>
                                    <CardFooter className="card-footer">
                                        This event is hosted by {event.creator.group.name} and will {event.live ? "" : "not"} be live
                                        {this.state.usergroup.id === event.creator.id ? <EditEventModal groupId={this.props.match.params.id} className={"EditEvent" + event.id} buttonLabel="Edit Event" event={event} /> : <></>}
                                    </CardFooter>
                                </CardBody>
                            </Card>
                        )}
                    </CardColumns>
                </Container>
                <div>
                    {['member', 'organizer'].includes(this.state.usergroup.role.roleName) ? <NewEventModal className="new-event-modal" buttonLabel="New Event" groupId={this.props.match.params.id} /> : <></>}
                </div>
                <GroupMessagingComponent usergroup={this.state.usergroup} />
            </div>
        )
    }

}

const mapStateToProps = (state: IState) => {
    return {
        groupData: state.CurrentGroup,
        userGroups: state.CurrentUser.groups,
        user: state.CurrentUser.self,
        eventList: state.EventState.eventList
    }

}

const mapActionToProps = {
    getGroupById,
    joinGroup,
    getEventsByGroupId,
    leaveGroup,
    getGroupMessagesByGroupId
}

export default connect(mapStateToProps, mapActionToProps)(withRouter(GroupComponent))