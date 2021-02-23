import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
    children: ReactNode
}

const StyledInfoBox = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`

const StyledTechnicalSection = styled.section`
    border-radius: 10px;
    padding: 5px 15px 15px;
    margin-bottom: 50px;
    color: white;
    background-color: black;
    font-weight: bold;
`

const TechnicalInfoBox: FC<Props> = ({ children }) => {
    return (
        <StyledTechnicalSection>
            <h2>Technical Overview</h2>
            <StyledInfoBox>{children}</StyledInfoBox>
        </StyledTechnicalSection>
    )
}

export default TechnicalInfoBox
