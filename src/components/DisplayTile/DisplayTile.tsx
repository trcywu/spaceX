import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
    name: string
    type: string
    flickrImg: string
    active: boolean
    id: string
    pageName: string
}

const StyledTileContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-self: stretch;
    font-size: 12px;
    border: 2px solid black;
    border-radius: 2px;
    padding: 20px;
    margin-right: 10px;
`

const StyledImgContainer = styled.img`
    width: 100%;
    height: 400px;
`

const StyledDescriptor = styled.span`
    font-size: 14px;
    padding: 5px 0 5px 0;
    justify-content: space-between;
    text-transform: capitalize;
`

const StyledMoreInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const DisplayTile: FC<Props> = ({
    name,
    type,
    flickrImg,
    active,
    id,
    pageName,
}) => {
    return (
        <StyledTileContainer data-testid="display-tile" aria-labelledby={name}>
            <StyledImgContainer src={flickrImg} alt={name} width="100%" />
            <StyledDescriptor>Name: {name}</StyledDescriptor>
            <StyledDescriptor>Type: {type}</StyledDescriptor>
            <StyledMoreInfoWrapper>
                <StyledDescriptor>
                    Active: {active ? 'yes' : 'no'}
                </StyledDescriptor>
                <StyledDescriptor>
                    <Link to={`/${pageName}/${id}`}>More Info</Link>
                </StyledDescriptor>
            </StyledMoreInfoWrapper>
        </StyledTileContainer>
    )
}

export default DisplayTile
