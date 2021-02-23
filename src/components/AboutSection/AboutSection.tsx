import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
    name: string
    description: string
}

const StyledAboutSection = styled.section`
    background-color: #e1dfdf;
    border-radius: 10px;
    margin: 50px 0;
    padding: 5px 15px 15px;
`

const AboutSection: FC<Props> = ({ name, description }) => {
    return (
        <StyledAboutSection>
            <h2>About {name}</h2>
            <p>{description}</p>
        </StyledAboutSection>
    )
}

export default AboutSection
