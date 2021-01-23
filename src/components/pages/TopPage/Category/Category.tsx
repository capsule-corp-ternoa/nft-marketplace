import React from 'react';
import styled from 'styled-components';
import { categoryList } from '../../../../utils/utils';

const CategoryList = styled.ul``;

const CategoryElement = styled.li`
  border: solid 1px;
  display: inline;
  padding: 3px 15px;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const Category: React.FC = () => (
  <>
    <span style={{ margin: '50px' }}>Explore</span>
    <CategoryList>
      {categoryList?.map((category) => (
        <CategoryElement key={category.id} className="rounded-pill">
          {category.name}
        </CategoryElement>
      ))}
    </CategoryList>
  </>
);

export default Category;
