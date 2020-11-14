import React from 'react'
import  Container  from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import  Col  from 'react-bootstrap/Col'
import { PowerSwitch } from './features/light/PowerSwitch'
import { BlinkSwitch } from './features/light/BlinkSwitch'
import { FrequencyRange } from './features/light/FrequencyRange'
import { DutyCycleRange } from './features/light/DutyCycleRange'
import { Zero255Range } from './features/light/Zero255Range'
import {
    setBrightness, saveBrightness,
    setRed, saveRed,
    setGreen, saveGreen,
    setBlue, saveBlue,
    } from './features/light/lightSlice'
import { useSelector } from 'react-redux'

export const App =  () => {

    const blink = useSelector(state => state.light.blink)
    const displayFreqDuty = blink ? '' : 'd-none'

    return (
        <Container>
            <h1>Light</h1>
            <Row>
                <Col xs={1} style={{margin: '20px'}}><PowerSwitch/></Col>
                <Col xs={1} style={{margin: '20px'}}><BlinkSwitch/></Col>
                <Col sm className={displayFreqDuty} style={{margin: '20px'}}><FrequencyRange/></Col>
                <Col sm className={displayFreqDuty} style={{margin: '20px'}}><DutyCycleRange/></Col>
            </Row>
            <Row>
                <Col sm style={{margin: '20px'}}>
                    <Zero255Range
                        name='Brightness'
                        setMethod={setBrightness}
                        saveMethod={saveBrightness}
                        stateName='brightness'
                    />
                </Col>
                <Col sm style={{margin: '20px'}}>
                    <Zero255Range
                        name='Red'
                        setMethod={setRed}
                        saveMethod={saveRed}
                        stateName='red'
                    />
                </Col>
                <Col sm style={{margin: '20px'}}>
                    <Zero255Range
                        name='Green'
                        setMethod={setGreen}
                        saveMethod={saveGreen}
                        stateName='green'
                    />
                </Col>
                <Col sm style={{margin: '20px'}}>
                    <Zero255Range
                        name='Blue'
                        setMethod={setBlue}
                        saveMethod={saveBlue}
                        stateName='blue'
                    />
                </Col>
            </Row>
        </Container>
    )
}
