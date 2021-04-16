import React, { useState } from 'react';
import style from './section.module.scss';
import Arr from 'components/assets/faqarrow';

export interface QuestionProps {
  section: { question: string; answer: string };
}

const Question: React.FC<QuestionProps> = ({ section }) => {
  const [exp, setExp] = useState(false);

  return (
    <div className={style.Section}>
      <Arr
        className={exp ? style.ArrowTilted : style.Arrow}
        onClick={() => setExp(!exp)}
      />
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

export default Question;
