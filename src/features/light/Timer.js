import React from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import {setPower, savePower} from './lightSlice'
import {store} from '../../app/store'

export class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time_remaining: 15 * 60,
            show: false,
            validated: false,
            timer_running: false,
        }
    }

    set_time_remaining = (minutes) => {
        this.setState({ time_remaining: minutes * 60 })
    }

    setShow = (state) => {
        this.setState({ show: state })
    }

    setValidated = (state) => {
        this.setState({ validated: state })
    }

    handleClose = () => {
        this.setShow(false)
    }

    handleShow = () => {
        this.setShow(true);
        this.setValidated(false)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget;

        if (form.checkValidity()) {
            const formData = new FormData(event.target)
            const formDataObj = Object.fromEntries(formData.entries())
            this.set_time_remaining(formDataObj.minutes)
            this.handleClose()
        }
        this.setValidated(true)
    };

    start_timer = () => {
        this.count_down = setInterval(
            () => { this.decrement_timer() },
            1000,
        )
        this.setState({ timer_running: true })
    }

    stop_timer = () => {
        clearInterval(this.count_down)
        this.setState({ timer_running: false })
    }

    decrement_timer = () => {
        let tr = this.state.time_remaining
        if (tr === 0){return}
        tr -= 1
        if (tr < 0) { tr = 0 }
        this.setState({ time_remaining: tr })
        if (tr === 0){
            this.handle_timer_zero()
        }
    }

    start_button_text = () => {
        return this.state.timer_running ? 'Stop' : 'Start'
    }

    handle_start_stop_timer = () => {
        if (this.state.timer_running) {
            this.stop_timer()
        } else {
            this.start_timer()
        }
    }

    handle_timer_zero = async () => {
        store.dispatch(setPower(false))
        await store.dispatch(savePower(false))
    }

    render() {
        return (
            <>
                <Form.Label>Timer</Form.Label>
                <ButtonGroup>
                    <Button onClick={this.handleShow} className='btn-lg'>
                        {new Date(this.state.time_remaining * 1000).toISOString().substring(11, 19)}
                    </Button>
                    <Button onClick={this.handle_start_stop_timer}>
                        {this.start_button_text()}
                    </Button>
                </ButtonGroup>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Set Timer</Modal.Title>
                    </Modal.Header>
                    <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                        <Modal.Body>
                            <Form.Group controlId="validationCustom05">
                                <Form.Label>Enter minutes</Form.Label>
                                <Form.Control
                                    name="minutes"
                                    type="number"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    min='0'
                                    max='300'
                                    step=".1"
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Please enter time in minutes
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Cancel
                        </Button>
                            <Button
                                id='numberButtonSubmit'
                                type="submit"
                                disabled={false}
                            >Set
                        </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        )
    }
}