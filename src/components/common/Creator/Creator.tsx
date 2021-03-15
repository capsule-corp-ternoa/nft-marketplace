import React, { useState } from 'react';

import style from './Creator.module.scss';
import Badge from '../assets/badge';

export interface CreatorProps {
  item: CreatorType;
  showTooltip?: boolean;
  size?: string;
  className?: string;
}

const Creator: React.FC<CreatorProps> = 
({ item, showTooltip = true, size, className }) => {
  const [isHovering, setIsHovering] = useState(false);

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
        className={
          size === 'card' ? style.CreatorsItemCard : style.CreatorsItem
        }
        onFocus={() => false}
        onBlur={() => false}
        onMouseOver={(e) => setIsHovering(true)}
        onMouseOut={(e) => setIsHovering(false)}
        data-tip
        data-for={showTooltip && `tooltip${item.id}`}
      >
        {item.verified && (
          <Badge
            className={
              size === 'card' ? style.CreatorsBadgeSM : style.CreatorsBadge
            }
          />
        )}
        <img src={item.img} className={style.CreatorsImage} alt="img" />
      </div>
    </div>
  );
};

export default Creator;
