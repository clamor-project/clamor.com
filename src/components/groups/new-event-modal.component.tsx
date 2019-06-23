/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { createEvent } from '../../actions/event.action';
import { IEvent } from '../../models/Event';
import { IUsergroup } from '../../models/Usergroup';
import { IUser } from '../../models/User';
import { IGroup } from '../../models/Group';

interface INewEventModalProps {
    buttonLabel: string;
    className: string;
    groupId: number;
    currentUser: IUser;
    groups: IUsergroup[];
    currentGroup: IGroup;
    createEvent: (event: IEvent, groupId: number) => void;
}

interface INewEventModalState {
    modal: boolean;
    title: string;
    description: string;
    date: string;
    time: string;
    live: string | number | string [];
}

class NewEventModal extends React.Component<INewEventModalProps, INewEventModalState> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: '',
      description: '',
      date: '',
      time: '',
      live: 'false'
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      title: '',
      description: '',
      date: '',
      time: '',
      live: 'false'
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
      id: 0,
      creator: creator,
      groupId: this.props.currentGroup,
      title: this.state.title,
      description: this.state.description,
      datePosted: new Date(),
      dateOf: fullDate,
      live: live
    };
    this.props.createEvent(newEvent, this.props.groupId);
    this.toggle();
  }

  render() {
    return (
      <>
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
                  <Input name="islive" type="checkbox" value={this.state.live} onChange={this.handleLiveChange} />{' '}Live event
                </Label>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">Submit</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.CurrentUser.self,
    groups: state.CurrentUser.groups,
    currentGroup: state.CurrentGroup
  }
}

const mapDispatchToProps = {
  createEvent: createEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEventModal);
