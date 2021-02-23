import { RootState } from 'app/rootReducer'
import {
    ActiveFilter,
    setActiveFilter,
} from 'features/activeFilter/activeFilterSlice'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

type Props = {
    activeFilter: ActiveFilter
    text: string
}

const StyledButton = styled.button`
    border-radius: 2px;
    padding: 10px 30px;
    background-color: transparent;
    border: 1px solid rgb(102, 102, 102);
    margin-right: 5px;
`

const FilterButton: FC<Props> = ({ activeFilter, text }) => {
    const dispatch = useDispatch()

    const currentActiveFilter = useSelector(
        (state: RootState) => state.activeFilter
    )
    return (
        <StyledButton
            disabled={currentActiveFilter === activeFilter}
            onClick={() => dispatch(setActiveFilter(activeFilter))}
            aria-label={text}
        >
            {text}
        </StyledButton>
    )
}

export default FilterButton
