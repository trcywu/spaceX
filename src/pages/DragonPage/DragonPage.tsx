import { RootState } from 'app/rootReducer'
import axios from 'axios'
import AboutSection from 'components/AboutSection/AboutSection'
import GridCarousel from 'components/GridCarousel/GridCarousel'
import TechnicalInfoBox from 'components/TechnicalInfoBox/TechnicalInfoBox'

import { Dragon } from 'features/dragonsList/types'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const StyledLabel = styled.div`
    color: #e1dfdf;
    padding-bottom: 5px;
    text-transform: uppercase;
    text-decoration: underline;
`

const StyledContent = styled.div``

const StyledImperial = styled.div`
    font-size: 10px;
    color: #e1dfdf;
`

const StyledContentBox = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 30px;
`

const DragonTile: FC = () => {
    const dispatch = useDispatch()
    const dragonList = useSelector((state: RootState) => state.dragons)
    const { id } = useParams<Record<string, string | undefined>>()

    const [dragonById, setDragon] = useState<Dragon | undefined>(undefined)

    useEffect(() => {
        const dragonById = dragonList.find((dragon) => dragon.id === id)
        if (dragonById) {
            setDragon(dragonById)
        }

        if (!dragonById) {
            const fetchSingleDragon = async () => {
                try {
                    const res = await axios.get<Dragon>(
                        `https://api.spacexdata.com/v4/dragons/${id}`
                    )
                    const data = res.data
                    setDragon(data)
                } catch (e) {
                    console.error(e)
                }
            }
            fetchSingleDragon()
        }
    }, [dispatch, id, dragonList])

    return (
        <div>
            {dragonById && (
                <div>
                    <h1>{dragonById.name}</h1>

                    <GridCarousel
                        images={dragonById.flickr_images}
                        name={dragonById.name}
                    />
                    <AboutSection
                        name={dragonById.name}
                        description={dragonById.description}
                    />
                    <TechnicalInfoBox>
                        <StyledContentBox>
                            <StyledLabel>Height </StyledLabel>
                            <StyledContent>
                                {dragonById.height_w_trunk.meters} m
                            </StyledContent>
                            <StyledImperial>
                                {dragonById.height_w_trunk.feet} ft
                            </StyledImperial>
                        </StyledContentBox>
                        <StyledContentBox>
                            <StyledLabel>Diameter </StyledLabel>
                            <StyledContent>
                                {dragonById.diameter.meters} m
                            </StyledContent>
                            <StyledImperial>
                                {dragonById.diameter.feet} ft
                            </StyledImperial>
                            <StyledContentBox>
                                <StyledLabel>Launch Mass </StyledLabel>
                                <StyledContent>
                                    {dragonById.launch_payload_mass.kg} kg
                                </StyledContent>
                                <StyledImperial>
                                    {dragonById.launch_payload_mass.lb} lb
                                </StyledImperial>
                            </StyledContentBox>
                        </StyledContentBox>
                        <StyledContentBox>
                            <StyledLabel>Launch Volume </StyledLabel>
                            <StyledContent>
                                {dragonById.launch_payload_vol.cubic_meters} ㎥
                            </StyledContent>
                            <StyledImperial>
                                {dragonById.launch_payload_vol.cubic_feet} ft3
                            </StyledImperial>
                        </StyledContentBox>
                    </TechnicalInfoBox>
                </div>
            )}
        </div>
    )
}

export default DragonTile
