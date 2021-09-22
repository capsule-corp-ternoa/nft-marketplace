import React, { useState } from 'react';

import style from './Creator.module.scss';
import Badge from 'components/assets/badge';

import gradient from 'random-gradient';

import { UserType } from 'interfaces/index';

export interface CreatorProps {
  user: UserType;
  showTooltip?: boolean;
  size?: string;
  className?: string;
}

const Creator: React.FC<CreatorProps> = ({
  user,
  showTooltip = true,
  size,
  className,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const bgGradient = {
    background: user.name ? gradient(user.name) : gradient('ternoa'),
  };

  function manageClass() {
    if (size === 'card') return style.CreatorsItemCard;
    if (size === 'small') return style.CreatorsItemSmall;
    if (size === 'xsmall') return style.CreatorsItemXSmall;
    if (size === 'fullwidth') return style.CreatorsItemFullwidth;
    return style.CreatorsItem;
  }

  function manageBadgeClass() {
    if (size === 'card') return style.CreatorsBadgeSM;
    if (size === 'xsmall') return style.CreatorsBadgeXSM;
    if (size === 'fullwidth') return style.CreatorsBadgeXSM;
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
        <div className={style.CreatorName}>{user.name}</div>
      </div>
      {user.name ? (
        <div
          className={manageClass()}
          onFocus={() => false}
          onBlur={() => false}
          onMouseOver={() => setIsHovering(true)}
          onMouseOut={() => setIsHovering(false)}
          data-tip
          data-for={showTooltip && `tooltip${user._id}`}
        >
          {user.verified && <Badge className={manageBadgeClass()} />}
          {user.picture ? (
            <img
              className={style.CreatorsImage}
              draggable="false"
              src={user.picture}
            />
          ) : (
            <div style={bgGradient} className={style.CreatorsImage}>
              <div
                className={
                  size === 'xsmall'
                    ? style.CreatorLetterSmall
                    : style.CreatorLetter
                }
              >
                {user.name.charAt(0)}
              </div>
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Creator;
