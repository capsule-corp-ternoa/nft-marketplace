import React, { useState } from 'react';
//import { useTranslation } from 'react-i18next';
import style from './section.module.scss';
import Arr from 'components/assets/faqarrow';

const Edit: React.FC<any> = ({ section }) => {
  //const { t } = useTranslation();
  const [exp, setExp] = useState(false);

  return (
    <div className={style.Section}>
      <Arr className={exp ? style.ArrowTilted : style.Arrow} />
      <div className={style.Data}>
        <div
          className={exp ? `${style.Top} ${style.Select}` : style.Top}
          onClick={() => setExp(!exp)}
        >
          {section.question}
        </div>
        <div className={exp ? style.Bottom : style.Hide}>{section.answer}</div>
      </div>
    </div>
  );
};

export default Edit;
