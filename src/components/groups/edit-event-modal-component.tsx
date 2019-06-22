import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { IUser } from '../../models/User';
import { IGroup } from '../../models/Group';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { IEvent } from '../../models/Event';
import { IUsergroup } from '../../models/Usergroup';
import { editEvent } from '../../actions/event.action';

interface IEditEventModalProps {
  currentUser: IUser;
  currentGroup: IGroup;
  buttonLabel: string;
  className: string;
  event: IEvent;
  groupId: number;
  groups: IUsergroup[];
  editEvent: (event: IEvent, userId: number) => void;
}

interface IEditEventModalState {
  modal: boolean;
  title: string;
  description: string;
  date: string;
  time: string;
  live: string | number | string [];
}

class EditEventModal extends Component<IEditEventModalProps, IEditEventModalState> {
  constructor(props: IEditEventModalProps) {
    super(props);
    this.state = {
      modal: false,
      title: this.props.event.title,
      description: this.props.event.description,
      date: (new Date(this.props.event.dateOf).toISOString()).slice(0,10),
      time: (new Date(this.props.event.dateOf).toTimeString()).slice(0,5),
      live: this.props.event.live ? 'true' : 'false'
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChange = (property: string) => event => {
    this.setState({
      ...this.state,
      [property]: event.target.value
    });
  }

  handleLiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      live: this.state.live === 'true' ? 'false' : 'true'
    });
  }

  submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let creator: IUsergroup = null;
    for (let group of this.props.groups) {
      if (+group.group.id === +this.props.groupId) {
        creator = group;
      }
    }
    let fullDate: Date = new Date(this.state.date + " " + this.state.time + ":00");
    // fullDate = new Date(fullDate.getTime() - 14400000); // if there's a time zone problem, use this line for eastern time
    const live: boolean = this.state.live === 'true' ? true : false;
    const newEvent: IEvent = {
      id: this.props.event.id,
      creator: creator,
      groupId: this.props.currentGroup,
      title: this.state.title,
      description: this.state.description,
      datePosted: new Date(this.props.event.datePosted),
      dateOf: fullDate,
      live: live
    };
    this.props.editEvent(newEvent, this.props.currentUser.id);
    this.toggle();
  }

  render() {
    return (
      <div>
      <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <Form onSubmit={this.submit}>
          <ModalHeader toggle={this.toggle}>Create a New Event</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="title">Title</Label>
              <Input name="title" type="text" value={this.state.title} onChange={this.handleChange('title')} placeholder="ie. 'Our first meeting!'"/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <Input name="description" type="textarea" value={this.state.description} onChange={this.handleChange('description')} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="dateof">Date of event</Label>
              <Input name="dateof" type="date" value={this.state.date} onChange={this.handleChange('date')} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="timeof">Time of event</Label>
              <Input name="timeof" type="time" value={this.state.time} onChange={this.handleChange('time')} />
            </FormGroup>
            <FormGroup>
              <Label check>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input name="islive" type="checkbox" value={this.state.live} onChange={this.handleLiveChange} checked={this.state.live === 'true'} />{' '}Live event
              </Label>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.CurrentUser.self,
    currentGroup: state.CurrentGroup,
    groups: state.CurrentUser.groups,
  }
}

const mapDispatchToProps = {
  editEvent: editEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEventModal);
