import React from 'react';

import style from './Chip.module.scss';

interface Props {
  className?: string;
  color: 'primary' | 'primaryInverted' | 'transparent';
  icon?: React.SVGProps<SVGSVGElement>;
  isDeletable?: boolean;
  onDelete?: () => void;
  text: string;
}

const Chip = ({
  className,
  color,
  icon,
  isDeletable = false,
  onDelete,
  text,
}: Props) => {
  return (
    <div
      className={`${className} ${style.root} ${style[`root__${color}`]} ${
        isDeletable ? style.root__deletable : ''
      }`}
    >
      {icon}
      <span className={style.text}>{text}</span>
      {isDeletable && (
        <button className={style.deleteIcon} onClick={onDelete}>
          X
        </button>
      )}
    </div>
  );
};

export default Chip;
