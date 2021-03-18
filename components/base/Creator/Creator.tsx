import React, { useState } from 'react';

import style from './Creator.module.scss';
import Badge from 'components/assets/badge';

import { CreatorType } from 'interfaces/index';

export interface CreatorProps {
  item: CreatorType;
  showTooltip?: boolean;
  size?: string;
  className?: string;
}

const Creator: React.FC<CreatorProps> = ({
  item,
  showTooltip = true,
  size,
  className,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  function manageClass() {
    if (size === 'card') return style.CreatorsItemCard;
    if (size === 'small') return style.CreatorsItemSmall;
    if (size === 'xsmall') return style.CreatorsItemXSmall;
    return style.CreatorsItem;
  }

  function manageBadgeClass() {
    if (size === 'card') return style.CreatorsBadgeSM;
    if (size === 'xsmall') return style.CreatorsBadgeXSM;
    return style.CreatorsBadge;
  }

  return (
    <div
      className={className ? `${style.Creator} ${className}` : style.Creator}
    >
      <div
        className={
          showTooltip && isHovering
            ? `${style.Tooltip} ${style.Pop}`
            : style.Hide
        }
      >
        <div className={style.CreatorName}>{item.name}</div>
        <div className={style.CreatorsCaps}>{item.caps} caps</div>
      </div>

      <div
        className={manageClass()}
        onFocus={() => false}
        onBlur={() => false}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        data-tip
        data-for={showTooltip && `tooltip${item.id}`}
      >
        {item.verified && <Badge className={manageBadgeClass()} />}
        <img src={item.img} className={style.CreatorsImage} alt="img" />
      </div>
    </div>
  );
};

export default Creator;
