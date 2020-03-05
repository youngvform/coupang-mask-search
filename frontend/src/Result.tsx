import React, { FC } from 'react';
import styled from 'styled-components';

import { CoupangData } from './types/types';

export interface Option {
  body: string;
}

interface Props {
  result: CoupangData[];
  notiPermit: React.MutableRefObject<boolean>;
  saveNotiId: (options: Option) => void;
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0.5rem;
  border-bottom: 1px solid black;
`;

const Link = styled.a`
  font-size: 2rem;
  text-decoration: none;
  color: black;
`;

const Result: FC<Props> = ({ result, notiPermit, saveNotiId }) => {
  if (result.length) {
    if (notiPermit.current) {
      const options = {
        body: `${result.length}개 결과가 있습니다!`
      };

      saveNotiId(options);
    }
  }
  return (
    <div>
      {result.map(res => (
        <Layout key={res.link}>
          <Link href={res.link} target="_blank">
            {res.name}
          </Link>
          <p>
            가격 : {res.price} {res.unitPrice}
          </p>
          <a href={res.shortLink} target="_blank">
            {res.shortLink}
          </a>
        </Layout>
      ))}
    </div>
  );
};

export default Result;
