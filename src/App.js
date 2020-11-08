import React from 'react'
import  Container  from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import  Col  from 'react-bootstrap/Col'
import { PowerSwitch } from './features/light/PowerSwitch'

const app =  () => {
    return (
        <Container>
            <h1>Light</h1>
            <Row>
                <Col xs={1} style={{margin: '20px'}}><PowerSwitch/></Col>
            </Row>
        </Container>
    )
}

export default app