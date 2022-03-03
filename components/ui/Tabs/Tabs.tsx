import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Select from '../Select'
import Tab from './Tab'

type TabsType = {
  badge?: number | string
  content: React.ReactNode
  label: string
  populateTabData?: (id: string) => void
}

interface Props {
  className?: string
  isTabsSelect?: boolean
  resetTabId?: boolean
  tabs: {
    [id: string]: TabsType
  }
}

const Tabs = ({ className, isTabsSelect = false, resetTabId, tabs }: Props) => {
  const [activeTab, setActiveTab] = useState<string>(Object.keys(tabs)[0])

  useEffect(() => {
    setActiveTab(Object.keys(tabs)[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetTabId])

  return (
    <div className={className}>
      {isTabsSelect && (
        <SSelectContainer>
          <Select badge={tabs[activeTab].badge} color="primary500" text={activeTab}>
            {(setSelectExpanded) => (
              <>
                {Object.entries(tabs)
                  .filter(([id]) => activeTab !== id)
                  .map(([id, { badge, label, populateTabData }]) => (
                    <Tab
                      key={id}
                      endBadge={badge}
                      isActive={activeTab === id}
                      label={label}
                      onClick={() => {
                        if (populateTabData) populateTabData(id)
                        setSelectExpanded(false)
                        setActiveTab(id)
                      }}
                    />
                  ))}
              </>
            )}
          </Select>
        </SSelectContainer>
      )}
      <STabsListContainer isTabsSelect={isTabsSelect}>
        {Object.entries(tabs).map(([id, { badge, label, populateTabData }]) => (
          <Tab
            key={id}
            isActive={activeTab === id}
            label={label}
            onClick={() => {
              if (populateTabData) populateTabData(id)
              setActiveTab(id)
            }}
            endBadge={badge}
          />
        ))}
      </STabsListContainer>
      {Object.entries(tabs).map(
        ([id, { content }]) => activeTab === id && <SContentContainer key={id}>{content}</SContentContainer>
      )}
    </div>
  )
}

const STabsListContainer = styled.div<{ isTabsSelect: boolean }>`
  width: 80%;
  display: ${({ isTabsSelect }) => (isTabsSelect ? 'none' : 'flex')};
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  margin: 0 auto 8rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 100%;
    justify-content: flex-start;
  }
`

const SSelectContainer = styled.div`
  max-width: 26rem;
  margin: 0 auto;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const SContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 56rem;
`

export default Tabs
