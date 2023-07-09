import { Descriptions, Space } from 'antd';
import { AppContext } from '@/utils/context';
import { useContext, useEffect, useState } from 'react';
import Steps from '../Steps';
import styles from './index.less';
const TipsText = () => {
  const context = useContext(AppContext);
  const nodes = context?.data?.nodes?.length;
  const edges = context?.data?.edges?.length;
  const [nodesY, setNodesY] = useState<number>(0);
  const [edgesY, setEdgesY] = useState<number>(0);
  useEffect(() => {
    const el = document.getElementById(`nodes${nodes}`);
    const index: any = el?.style?.zIndex || 0;
    if (!el) return;
    setNodesY(index * 36);
    return () => {};
  }, [nodes]);
  useEffect(() => {
    const el = document.getElementById(`edges${edges}`);
    const index: any = el?.style?.zIndex || 0;
    if (!el) return;
    setEdgesY(index * 36);
    return () => {};
  }, [edges]);
  return (
    <Descriptions title="机器资源概览" style={{ paddingLeft: '24px' }}>
      <Descriptions.Item label="">
        <Space>
          <span>节点:</span>
          <span className={styles.num}>
            <Steps
              num={nodes}
              tag="nodes"
              y={nodesY}
            />
          </span>
        </Space>
      </Descriptions.Item>
      <Descriptions.Item label="">
        <Space>
          <span>边:</span>
          <span className={styles.num}>
            <Steps
              num={edges}
              tag="edges"
              y={edgesY}
            />
          </span>
        </Space>
      </Descriptions.Item>
    </Descriptions>
  );
};
export default TipsText;
