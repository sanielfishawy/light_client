import React from 'react'
import  Container  from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import  Col  from 'react-bootstrap/Col'
import { PowerSwitch } from './features/light/PowerSwitch'
import { BlinkSwitch } from './features/light/BlinkSwitch'
import { FrequencyRange } from './features/light/FrequencyRange'
import { DutyCycleRange } from './features/light/DutyCycleRange'

const app =  () => {
    return (
        <Container>
            <h1>Light</h1>
            <Row>
                <Col xs={1} style={{margin: '20px'}}><PowerSwitch/></Col>
                <Col xs={1} style={{margin: '20px'}}><BlinkSwitch/></Col>
                <Col sm style={{margin: '20px'}}><FrequencyRange/></Col>
                <Col sm style={{margin: '20px'}}><DutyCycleRange/></Col>
            </Row>
        </Container>
    )
}

export default app