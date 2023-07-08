import { useLayoutEffect, useEffect, useRef } from 'react';
import G6 from '@antv/g6';
import uuid from '@/utils/uuid';
import { chartProps } from '@/types';

const id = uuid();

const TreeChart = ({
  data,
  options,
  chartRef,
  onChartMouseOver,
  onChartClick,
}: chartProps) => {
  useLayoutEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }
    if (id) {
      chartRef.current = new G6.TreeGraph({
        container: id, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: window.innerWidth - 300,
        height: window.innerHeight,

        ...options,
      });
      chartRef.current.node(function (node: any) {
        return {
          size: 26,
          style: {
            fill: 'l(0) 0:#0fd850  1:#f9f047',
            stroke: '#fff',
          },
          label: node.id,
          labelCfg: {
            position:
              node.children && node.children.length > 0 ? 'left' : 'right',
          },
        };
      });

      chartRef.current.data(data);
      chartRef.current.render();
      chartRef.current.fitView();
      chartRef.current.on('node:mouseenter', (e: any) => {
        const nodeItem = e.item;
        onChartMouseOver && onChartMouseOver(nodeItem);
      });
      chartRef.current.on('node:click', (e: any) => {
        const nodeItem = e.item;
        onChartClick && onChartClick(nodeItem);
      });
    }
  }, [id]);
  useEffect(() => {
    const nodes = chartRef.current.findAll('node', (node: any) => {
      return true;
    });
  }, []);

  return <div id={id}></div>;
};

export default TreeChart;
