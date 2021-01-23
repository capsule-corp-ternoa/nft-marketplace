import React from 'react';
import CardBase from './components';

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Choose to have border on the card */
  border?: boolean;
  /** Choose to show shadow effect on the Card */
  shadow?: boolean;
};

const Card: React.FC<CardProps> = (props) => {
  const { children, border = true, shadow = false, ...rest } = props;

  return (
    <CardBase border={border} shadow={shadow} {...rest}>
      {children}
    </CardBase>
  );
};

Card.defaultProps = {
  border: true,
  shadow: false,
};

export default Card;
