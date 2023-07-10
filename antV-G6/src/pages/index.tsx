import { useRef, useState } from 'react';
import TipsText from '@/components/TipsText';
import ChartForm from '@/components/ChartForm';
import { AppContext } from '@/utils/context';
import { Modal, Empty, Divider, Space, Button, Avatar, Menu } from 'antd';
import {
  ZoomInOutlined,
  InfoOutlined,
  PoweroffOutlined,
  UserOutlined,
  DotChartOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import Chart from '@/components/Chart';

export default function IndexPage() {
  const contentRef = useRef(null);
  const cRef = useRef<any>(null);
  const chartRef = useRef<any>(null);
  const [current, setCurrent] = useState('Graph');
  const [data, setData] = useState({
    // 点集
    nodes: [
      {
        id: '一号机',
        // type: 'jsx1',
        // type: 'test',
        type: 'jsx3',
        metric: 'CPU usage',
        label: '一号机房',
        description: 'ant_type_name...',
        cpuUsage: 70,
        color: '#2196f3',
        group: 'root',
        status: 'FULL',
      },
      {
        id: '二号机',
        type: 'jsx3',
        // type: 'xml-card',
        group: 'root',
        metric: 'CPU usage',
        label: '二号机房',
        description: 'ant_type_name...',
        cpuUsage: 80,
        color: '#2196f3',
        status: 'FULL',
      },
      {
        id: '三号机',
        type: 'jsx2',
        // type: 'xml-card',
        metric: 'CPU usage',
        label: '二号机房A02',
        description: 'ant_type_name...',
        cpuUsage: 80,
        group: 'A',
        color: '#2196f3',
        tag: ['二号机'],
        meta: {
          creatorName: 'a_creatorName',
        },
        parent: '二号机',
      },
      {
        id: '四号机',
        type: 'jsx2',
        // type: 'xml-card',
        metric: 'CPU usage',
        label: '二号机房A03',
        description: 'ant_type_name...',
        cpuUsage: 80,
        group: 'A',
        color: '#2196f3',
        meta: {
          creatorName: 'a_creatorName',
        },
        parent: '二号机',
      },
      {
        id: '五号机',
        type: 'jsx2',
        // type: 'xml-card',
        metric: 'CPU usage',
        label: '二号机房A04',
        description: 'ant_type_name...',
        cpuUsage: 80,
        group: 'A',
        color: '#2196f3',
        meta: {
          creatorName: 'a_creatorName',
        },
        parent: '二号机',
      },
      {
        id: '六号机',
        type: 'jsx2',
        // type: 'xml-card',
        metric: 'CPU usage',
        label: '二号机房A05',
        description: 'ant_type_name...',
        cpuUsage: 80,
        color: '#2196f3',
        group: 'A',
        meta: {
          creatorName: 'a_creatorName',
        },
        parent: '二号机',
      },
      {
        id: '七号机',
        type: 'jsx2',
        // type: 'xml-card',
        metric: 'CPU usage',
        label: '二号机房A06',
        description: 'ant_type_name...',
        cpuUsage: 80,
        group: 'A',
        color: '#2196f3',
        meta: {
          creatorName: 'a_creatorName',
        },
        parent: '二号机',
      },
      {
        id: '八号机',
        type: 'jsx2',
        // type: 'xml-card',
        metric: 'CPU usage',
        label: '二号机房A07',
        description: 'ant_type_name...',
        cpuUsage: 80,
        group: 'A',
        color: '#2196f3',
        meta: {
          creatorName: 'a_creatorName',
        },
        parent: '二号机',
      },
      {
        id: '九号机',
        x: 200,
        y: -200,
        type: 'jsx2',
        // type: 'xml-card',
        metric: 'CPU usage',
        label: '二号机房A08',
        description: 'ant_type_name...',
        cpuUsage: 80,
        group: 'A',
        color: '#2196f3',
        meta: {
          creatorName: 'a_creatorName',
        },
        parent: '二号机',
      },
      {
        id: '十号机',
        x: 200,
        y: -200,
        type: 'jsx2',
        // type: 'xml-card',
        metric: 'CPU usage',
        label: '一号机房A08',
        description: 'ant_type_name...',
        cpuUsage: 80,
        group: 'B',
        color: '#2196f3',
        meta: {
          creatorName: 'a_creatorName',
        },
        parent: '一号机',
      },
      {
        id: '十一号机',
        type: 'jsx2',
        // type: 'xml-card',
        metric: 'CPU usage',
        label: '一号机房A09',
        description: 'ant_type_name...',
        cpuUsage: 80,
        group: 'B',
        color: '#2196f3',
        meta: {
          creatorName: 'a_creatorName',
        },
        parent: '一号机',
      },
      {
        id: '十二号机',
        type: 'jsx2',
        // type: 'xml-card',
        metric: 'CPU usage',
        label: '一号机房A10',
        description: 'ant_type_name...',
        cpuUsage: 80,
        group: 'B',
        color: '#2196f3',
        meta: {
          creatorName: 'a_creatorName',
        },
        parent: '一号机',
      },
    ],
    // 边集
    edges: [
      {
        source: '二号机',
        target: '三号机',
      },
      {
        source: '二号机',
        target: '四号机',
      },
      {
        source: '二号机',
        target: '五号机',
      },
      {
        source: '二号机',
        target: '六号机',
      },
      {
        source: '二号机',
        target: '七号机',
      },
      {
        source: '二号机',
        target: '八号机',
      },
      {
        source: '二号机',
        target: '九号机',
      },
      {
        source: '一号机',
        target: '十号机',
      },
      {
        source: '一号机',
        target: '十一号机',
      },
      {
        source: '一号机',
        target: '十二号机',
      },
    ],
  });
  const menu = [
    {
      label: 'Graph',
      key: 'Graph',
      icon: <DotChartOutlined />,
    },
    {
      label: 'TreeGraph',
      key: 'TreeGraph',
      icon: <DotChartOutlined />,
      disabled: true,
    },
  ];
  const onMenuClick = () => {};
  const onAdd = (node: object, edge: object) => {
    setData((pre: any) => {
      return {
        nodes: [...pre.nodes, node],
        edges: edge ? [...pre.edges, edge] : [...pre.edges],
      };
    });
  };
  const onDelete = (item: string | object) => {
    setData((pre: any) => {
      return {
        nodes: pre.nodes.filter(
          (it: any) => it.id !== item && it?.parent !== item,
        ),
        edges: pre.edges.filter(
          (it: any) => ![it.source, it.target].includes(item),
        ),
      };
    });
  };
  return (
    <div>
      <AppContext.Provider
        value={{
          data,
          setData,
          onAdd,
          onDelete,
        }}
      >
        <div className={styles.index}>
          <div className={styles.menu}>
            <TipsText />
            <Divider />
            <ChartForm />
          </div>

          <div className={styles.content} ref={contentRef} id="content">
            <div className={styles.tools}>
              <div className={styles.chartType}>
                <Menu
                  onClick={onMenuClick}
                  selectedKeys={[current]}
                  mode="horizontal"
                  items={menu}
                />
              </div>
              <Space split="">
                <Button
                  type="link"
                  onClick={() => {
                    cRef.current && cRef.current.openFisheye();
                  }}
                >
                  <ZoomInOutlined style={{ fontSize: '24px' }} />
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    cRef.current && cRef.current.openTooltip();
                  }}
                >
                  <InfoOutlined style={{ fontSize: '24px' }} />
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    cRef.current && cRef.current.reset();
                  }}
                >
                  <PoweroffOutlined style={{ fontSize: '24px' }} />
                </Button>
                <Button type="link">
                  <Avatar icon={<UserOutlined />} />
                </Button>
              </Space>
            </div>

            {data?.nodes.length ? (
              <Chart
                data={data}
                ref={cRef}
                chartRef={chartRef}
                parentNode={contentRef}
                onChartDbClick={(node: any) => {
                  Modal.confirm({
                    title:
                      '你要移除' +
                      node?._cfg?.model?.label +
                      '(' +
                      node?._cfg?.id +
                      ')这台机器嘛？',
                    onOk: () => {
                      onDelete(node?._cfg?.id);
                    },
                    okText: '确定',
                    cancelText: '取消',
                  });
                }}
                options={{
                  fitViewPadding: 24,
                  fitView: true,
                  maxZoom: 1.5,
                  minZoom: 1,
                }}
              />
            ) : (
              <Empty description="暂无数据" />
            )}
          </div>
        </div>
      </AppContext.Provider>
    </div>
  );
}
