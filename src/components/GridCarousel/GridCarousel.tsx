import React, { FC } from 'react'
import styled from 'styled-components'

import { GridList, GridListTile } from '@material-ui/core'

type Props = {
    images: string[]
    name: string
}

const StyledGridWrapper = styled.div`
    display: flex;
    flexwrap: wrap;
    justifycontent: space-around;
    overflow: hidden;
`

const StyledGridList = styled(GridList)`
    flex-wrap: nowrap !important;
    transform: translateZ(0);
    .img {
        height: 400px;
    }
`

const StyledGridListTile = styled(GridListTile)`
    height: 400px !important;
    .img {
    }
`

const GridCarousel: FC<Props> = ({ images, name }) => {
    return (
        <StyledGridWrapper>
            <StyledGridList cols={2.5}>
                {images.map((url: string, index) => (
                    <StyledGridListTile
                        key={index}
                        data-testid="grid-list-tile"
                    >
                        <img src={url} alt={name} />
                    </StyledGridListTile>
                ))}
            </StyledGridList>
        </StyledGridWrapper>
    )
}

export default GridCarousel
