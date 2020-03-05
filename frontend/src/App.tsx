import React, {
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
  useRef
} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Result, { Option } from './Result';
import { searchCoupang } from './lib/scrape';
import { CoupangData } from './types/types';

const Layout = styled.form`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  width: 720px;
  margin-bottom: 1rem;
`;

const SearchInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;
const Input = styled.input`
  font-size: 1.5rem;
  height: 40px;
  width: 90%;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  background-color: transparent;
  outline: none;
  width: 100%;
  font-size: 1.5rem;
  padding: 10px;
`;

function App() {
  const [texts, setTexts] = useState<string[]>([
    'kf94',
    'kf80 마스크',
    '덴탈 마스크',
    'kf 마스크'
  ]);
  const [time, setTime] = useState(1);
  const [results, setResults] = useState<CoupangData[][]>([]);
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);
  const id = useRef(0);
  const notiPermit = useRef(false);
  const notiId = useRef<Notification>();

  useEffect(() => {
    if (!notiPermit.current) {
      Notification.requestPermission(function(result) {
        //요청을 거절하면,
        if (result === 'denied') {
          return;
        }

        notiPermit.current = true;
      });
    }
    if (!start && id.current) {
      console.log('clear');
      clearInterval(id.current);
    }
    if (start) {
      id.current = cron(texts, time, setResults, setCount);
    }
    return () => {
      clearInterval(id.current);
    };
  }, [start]);

  const onSetText = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setTexts(value.split(','));
    },
    [texts]
  );

  const onSetTime = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setTime(Number(value));
    },
    [time]
  );

  const saveNotiId = useCallback((options: Option) => {
    if (notiId.current) {
      console.log('noti close');
      console.log({ noti: notiId.current });
      notiId.current.close();
    }
    notiId.current = new Notification('Yellow Mask Search', options);
  }, []);

  const onSearch = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!start) {
        if (!texts.length) {
          alert('검색어를 입력해주세요.');
          return;
        }
        if (time > 59 || time < 1) {
          alert('주기를 1 부터 59 사이로 입력해주세요.');
          return;
        }
        api(texts, setResults);
        setCount(1);
      }

      setStart(!start);
    },
    [texts, time, start]
  );

  return (
    <>
      <Layout onSubmit={onSearch}>
        <h1>Yellow Mask Search</h1>
        <SearchInput>
          검색어 :{' '}
          <Input
            type="text"
            value={texts}
            onChange={onSetText}
            placeholder="검색어를 쉼표(,)로 구분해서 입력해주세요."
          />
        </SearchInput>
        <SearchInput>
          주기(분) : <Input type="number" value={time} onChange={onSetTime} />
        </SearchInput>
        <Button type="submit">검색 {start ? '중지' : '시작'}</Button>
      </Layout>
      <div>
        {count}회 시도.
        {results.length ? (
          results.map((result, i) => (
            <Result
              key={`result_${i}`}
              result={result}
              notiPermit={notiPermit}
              saveNotiId={saveNotiId}
            />
          ))
        ) : (
          <h3>결과 없음</h3>
        )}
      </div>
    </>
  );
}
function cron(
  texts: string[],
  time: number,
  setResults: React.Dispatch<React.SetStateAction<CoupangData[][]>>,
  setCount: React.Dispatch<React.SetStateAction<number>>
) {
  const intervalTime = time * (1000 * 60);

  const id = setInterval(async () => {
    const results = await searchCoupang(texts);
    if (results && results[0].length) {
      setResults(prevResults => [...results, ...prevResults]);
    }
    setCount((prevCount: number) => prevCount + 1);
  }, intervalTime);

  return id;
}

async function api(
  texts: string[],
  setResults: React.Dispatch<React.SetStateAction<CoupangData[][]>>
) {
  try {
    const results = await searchCoupang(texts);
    if (results && results[0].length) {
      setResults([...results]);
    }
  } catch (e) {
    console.error(e);
  }
}

export default App;
