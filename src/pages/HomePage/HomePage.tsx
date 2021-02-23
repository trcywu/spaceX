import React from 'react'
import styled from 'styled-components'
import background from 'assets/spaceBackground.png'

const StyledH1 = styled.h1`
    font-size: 24px;
    padding: 10px 0 10px 0;
`
const HomePage = () => {
    return (
        <>
            <StyledH1>SpaceX's Rockets and Dragons</StyledH1>
            <img src={background} alt="space x background" width="1200" />
        </>
    )
}

export default HomePage
