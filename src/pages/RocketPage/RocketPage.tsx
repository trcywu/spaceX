import { RootState } from 'app/rootReducer'
import axios from 'axios'
import AboutSection from 'components/AboutSection/AboutSection'
import GridCarousel from 'components/GridCarousel/GridCarousel'
import TechnicalInfoBox from 'components/TechnicalInfoBox/TechnicalInfoBox'

import { Rocket } from 'features/rocketsList/types'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
    StyledContent,
    StyledContentBox,
    StyledH1,
    StyledImperial,
    StyledLabel,
} from 'pages/common/styles'

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

        if (!rocketById) {
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
                    <StyledH1>{rocketById.name}</StyledH1>
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
