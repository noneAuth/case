import { stepsProps } from '@/types';
import { useMemo } from 'react';
import styles from './index.less';

const Steps = ({ num, tag , playState, y}: stepsProps) => {
  const list = useMemo(() => {
    let cache = [];
    let _num = num;
    while (_num >= 0) {
      cache.push({ key: _num, value: _num });
      _num = _num - 1;
    }
    return cache
      .sort(() => (Math.random() > 0.5 ? -1 : 1))
      .map((item, index) => ({ ...item, index }));
  }, [num]);
  return (
    <div className={styles.transformNode} style={{animationPlayState: playState, transform: `translateY(-${y}px)`, transition: `all ${num / 5}s linear`}}>
      {list.map((item: any) => (
        <div
          className={styles.transformItem}
          id={`${tag + item.key}`}
          style={{
            zIndex: item.index
          }}
          key={item.key}
        >
          {item.value}
        </div>
      ))}
    </div>
  );
};

export default Steps;
