import { RootState } from 'app/rootReducer'
import axios from 'axios'
import DisplayTile from 'components/DisplayTile/DisplayTile'
import FilterButton from 'components/FilterButton/FilterButton'
import { ActiveFilter } from 'features/activeFilter/activeFilterSlice'
import { getDragonsList } from 'features/dragonsList/dragonSlice'
import { Dragon } from 'features/dragonsList/types'
import { getRocketsList } from 'features/rockets/rocketSlice'
import { Rocket } from 'features/rockets/types'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const StyledH1 = styled.h1`
    font-size: 24px;
    padding: 10px 0 10px 0;
`

const StyledSelectionBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 0 20px 0;
    align-items: center;
`

const StyledTilesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto
    column-gap: 10px;
    row-gap: 20px;

@media (max-width: 768px) {
    grid-template-columns: 1fr;
}
`

const DisplayPage: FC = () => {
    const dispatch = useDispatch()

    const { name } = useParams<Record<string, string | undefined>>()

    const dragonsList = useSelector((state: RootState) =>
        setActiveFilter<Dragon>(state.dragons, state.activeFilter)
    )

    const rocketsList = useSelector((state: RootState) =>
        setActiveFilter<Rocket>(state.rockets, state.activeFilter)
    )

    function setActiveFilter<T extends Dragon | Rocket>(
        list: T[],
        filter: ActiveFilter
    ): T[] {
        switch (filter) {
            case ActiveFilter.ShowAll:
                return list
            case ActiveFilter.ShowActive:
                return list.filter((item: T) => item.active)
            default:
                throw new Error('Unknown filter: ' + filter)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (name === 'rockets') {
                    const res = await axios.get<Rocket[]>(
                        `https://api.spacexdata.com/v4/${name}`
                    )
                    const data = await res.data
                    dispatch(getRocketsList(data))
                } else {
                    const res = await axios.get<Dragon[]>(
                        `https://api.spacexdata.com/v4/${name}`
                    )
                    const data = await res.data
                    dispatch(getDragonsList(data))
                }
            } catch (e) {
                console.error(e)
            }
        }
        fetchData()
    }, [dispatch, name])

    return (
        <>
            <StyledSelectionBar>
                {name === 'dragons' ? (
                    <StyledH1>Dragons</StyledH1>
                ) : (
                    <StyledH1>Rockets</StyledH1>
                )}
                <div>
                    <FilterButton
                        activeFilter={ActiveFilter.ShowAll}
                        text="All"
                    />
                    <FilterButton
                        activeFilter={ActiveFilter.ShowActive}
                        text="Active"
                    />
                </div>
            </StyledSelectionBar>
            <StyledTilesGrid>
                {name === 'dragons' &&
                    dragonsList.map((item: Dragon) => {
                        return (
                            <DisplayTile
                                key={item.id}
                                name={item.name}
                                active={item.active}
                                flickrImg={item.flickr_images[0]}
                                type={item.type}
                                id={item.id}
                                pageName="dragons"
                            >
                                <span>Name: {item.name}</span>
                            </DisplayTile>
                        )
                    })}
                {name === 'rockets' &&
                    rocketsList.map((item: Rocket) => {
                        return (
                            <DisplayTile
                                key={item.id}
                                name={item.name}
                                active={item.active}
                                flickrImg={item.flickr_images[0]}
                                type={item.type}
                                id={item.id}
                                pageName="rockets"
                            >
                                <span>Name: {item.name}</span>
                            </DisplayTile>
                        )
                    })}
            </StyledTilesGrid>
        </>
    )
}

export default DisplayPage
