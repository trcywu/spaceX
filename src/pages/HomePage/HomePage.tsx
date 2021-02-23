import React from 'react'
import background from 'assets/spaceBackground.png'
import { StyledH1 } from 'pages/common/styles'

const HomePage = () => {
    return (
        <>
            <StyledH1>SpaceX's Rockets and Dragons</StyledH1>
            <img src={background} alt="space x background" width="100%" />
        </>
    )
}

export default HomePage
