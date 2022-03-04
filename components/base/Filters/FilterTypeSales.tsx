import React from 'react'
import styled from 'styled-components'

import { FilterTitle, FilterSubtitle } from 'components/layout'
import Button from 'components/ui/Button'

const FilterTypeSales = () => (
  <div>
    <FilterTitle>Type of sale</FilterTitle>
    <SFilterSubtitle>Filter your search based on your type of purchase</SFilterSubtitle>
    <STypeSalesContainer>
      <Button color="primary500" emoji="🛒 " size="small" text="Direct sales" variant="contained" />
      <Button color="invertedContrast" disabled emoji="⏳ " size="small" text="Auction" variant="outlined" />
    </STypeSalesContainer>
  </div>
)

const SFilterSubtitle = styled(FilterSubtitle)`
  margin-top: 0.4rem;
`

const STypeSalesContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.6rem;
  margin-top: 1.6rem;
`

export default FilterTypeSales
