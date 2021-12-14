import React, { useState } from 'react';
import styled from 'styled-components';

import Select from '../Select';
import Tab from './Tab';

type TabsType = {
  badge?: number;
  content: React.ReactNode;
  label: string;
};

interface Props {
  className?: string;
  isTabsSelect: boolean;
  tabs: {
    [id: string]: TabsType;
  };
}

const Tabs = ({ className, isTabsSelect, tabs }: Props) => {
  const [activeTab, setActiveTab] = useState<string>(Object.keys(tabs)[0]);

  if (isTabsSelect) {
    return (
      <div className={className}>
        <SSelectContainer suppressHydrationWarning>
          <Select badge={tabs[activeTab].badge} color="primary" text={activeTab}>
            {(setSelectExpanded) => (
              <>
                {Object.entries(tabs)
                  .filter(([id]) => activeTab !== id)
                  .map(([id, { badge, label }]) => (
                    <Tab
                      key={id}
                      endBadge={badge}
                      isActive={activeTab === id}
                      label={label}
                      onClick={() => {
                        setSelectExpanded(false);
                        setActiveTab(id);
                      }}
                    />
                  ))}
              </>
            )}
          </Select>
        </SSelectContainer>
        {Object.entries(tabs).map(([id, { content }]) => (
          <div key={id}>{activeTab === id && content}</div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      <STabsListContainer>
        {Object.entries(tabs).map(([id, { badge, label }]) => (
          <Tab
            key={id}
            isActive={activeTab === id}
            label={label}
            onClick={() => setActiveTab(id)}
            endBadge={badge}
          />
        ))}
      </STabsListContainer>
      {Object.entries(tabs).map(([id, { content }]) => (
        <div key={id}>{activeTab === id && content}</div>
      ))}
    </div>
  );
};

const STabsListContainer = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  margin: 0 auto 8rem;

  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 100%;
    justify-content: space-evenly;
  }
`;

const SSelectContainer = styled.div`
  max-width: 26rem;
  margin: 0 auto;
`;

export default Tabs;
