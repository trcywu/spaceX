import { RootState } from 'app/rootReducer'
import axios from 'axios'
import AboutSection from 'components/AboutSection/AboutSection'
import GridCarousel from 'components/GridCarousel/GridCarousel'
import TechnicalInfoBox from 'components/TechnicalInfoBox/TechnicalInfoBox'

import { Rocket } from 'features/rocketsList/types'
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

const StyledContent = styled.div`
    font-weight: bold;
`

const StyledImperial = styled.div`
    font-size: 10px;
    color: #e1dfdf;
`

const StyledContentBox = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 30px;
`

const RocketTile: FC = () => {
    const dispatch = useDispatch()
    const rocketList = useSelector((state: RootState) => state.rockets)
    const { id } = useParams<Record<string, string | undefined>>()

    const [rocketById, setRocket] = useState<Rocket | null>(null)

    useEffect(() => {
        const rocketById = rocketList.find((rocket) => rocket.id === id)
        if (rocketById) {
            setRocket(rocketById)
        }

        if (rocketById !== null) {
            const fetchSingleRocket = async () => {
                try {
                    const res = await axios.get<Rocket>(
                        `https://api.spacexdata.com/v4/rockets/${id}`
                    )
                    const data = res.data
                    setRocket(data)
                } catch (e) {
                    console.error(e)
                }
            }
            fetchSingleRocket()
        }
    }, [dispatch, id, rocketList])

    return (
        <div>
            {rocketById && (
                <div>
                    <h1>{rocketById.name}</h1>
                    <GridCarousel
                        images={rocketById.flickr_images}
                        name={rocketById.name}
                    />
                    <AboutSection
                        name={rocketById.name}
                        description={rocketById.description}
                    />

                    <TechnicalInfoBox>
                        <StyledContentBox>
                            <StyledLabel>Height </StyledLabel>
                            <StyledContent>
                                {rocketById.height.meters} m
                            </StyledContent>
                            <StyledImperial>
                                {rocketById.height.feet} ft
                            </StyledImperial>
                        </StyledContentBox>
                        <StyledContentBox>
                            <StyledLabel>Mass </StyledLabel>
                            <StyledContent>
                                {Number(rocketById.mass.kg).toLocaleString()} kg
                            </StyledContent>
                            <StyledImperial>
                                {Number(rocketById.mass.lb).toLocaleString()} lb
                            </StyledImperial>
                        </StyledContentBox>
                        <StyledContentBox>
                            <StyledLabel>Diameter </StyledLabel>
                            <StyledContent>
                                {rocketById.diameter.meters} m
                            </StyledContent>
                            <StyledImperial>
                                {rocketById.diameter.feet} ft
                            </StyledImperial>
                        </StyledContentBox>
                        {rocketById.payload_weights &&
                            rocketById.payload_weights.map((planet, index) => {
                                return (
                                    <StyledContentBox key={index}>
                                        <StyledLabel>
                                            payload to {planet.id}
                                        </StyledLabel>
                                        <StyledContent>
                                            {Number(planet.kg).toLocaleString()}{' '}
                                            kg
                                        </StyledContent>
                                        <StyledImperial>
                                            {Number(planet.lb).toLocaleString()}{' '}
                                            lb
                                        </StyledImperial>
                                    </StyledContentBox>
                                )
                            })}
                    </TechnicalInfoBox>
                </div>
            )}
        </div>
    )
}

export default RocketTile
