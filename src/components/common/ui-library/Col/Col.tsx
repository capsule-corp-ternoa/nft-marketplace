import React from 'react';
import { ColBase } from './components';

export type ColProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Size in percent for the column for all screen sizes (or for special case: one-third and two-thirds) */
  size?:
  | '10'
  | '20'
  | '25'
  | '30'
  | '40'
  | '50'
  | '60'
  | '70'
  | '75'
  | '80'
  | '90'
  | '100'
  | 'one-third'
  | 'two-thirds';
  /** Size in percent for the column for small screen size (or for special case: one-third and two-thirds) */
  small?:
  | '10'
  | '20'
  | '25'
  | '30'
  | '40'
  | '50'
  | '60'
  | '70'
  | '75'
  | '80'
  | '90'
  | '100'
  | 'one-third'
  | 'two-thirds';
  /** Size in percent for the column for medium screen size (or for special case: one-third and two-thirds) */
  medium?:
  | '10'
  | '20'
  | '25'
  | '30'
  | '40'
  | '50'
  | '60'
  | '70'
  | '75'
  | '80'
  | '90'
  | '100'
  | 'one-third'
  | 'two-thirds';
  /** Size in percent for the column for large screen size (or for special case: one-third and two-thirds) */
  large?:
  | '10'
  | '20'
  | '25'
  | '30'
  | '40'
  | '50'
  | '60'
  | '70'
  | '75'
  | '80'
  | '90'
  | '100'
  | 'one-third'
  | 'two-thirds';
};

const Col: React.FC<ColProps> = (props) => {
  const { size, small, medium, large, children, ...rest } = props;
  return (
    <ColBase size={size} small={small} medium={medium} large={large} {...rest}>
      {children}
    </ColBase>
  );
};

export default Col;
