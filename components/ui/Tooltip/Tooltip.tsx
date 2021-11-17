import React from 'react';
import Information from 'components/assets/information';
import styled from 'styled-components';

interface Props {
  className?: string;
  text: string;
}

const Tooltip = ({ className, text }: Props) => (
  <TooltipContainer className={className}>
    <InformationIcon />
    <Popover>{text}</Popover>
  </TooltipContainer>
);

const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  > span {
      display: none;
    }

  &:hover {
    > span {
      display: block;
    }
  }
`;

const InformationIcon = styled(Information)`
  width: 2rem;
  fill: black;
`;

const Popover = styled.span`
  background: white;
  border-radius: 0.8rem;
  box-shadow: 0px 0px 14.5243px 5.0835px rgb(0 0 0 / 10%);
  color: #686464;
  font-family: 'Airbnb Cereal App Light';
  font-size: 1.2rem;
  padding: 0.8rem 1.6rem;
  position: absolute;
  top: -4rem;
  left: 50%;
  transform: translateX(calc(-50% + 0px));
  white-space: nowrap;
  z-index: 1000;
`;

export default Tooltip;
