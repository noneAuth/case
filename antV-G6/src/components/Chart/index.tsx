import {
  useLayoutEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import G6 from '@antv/g6';
import { chartProps } from '@/types';

const Chart = forwardRef(
  (
    {
      data,
      options,
      chartRef,
      onChartMouseOver,
      onChartClick,
      onChartDbClick,
    }: chartProps,
    ref,
  ) => {
    const [plugins, setPlugins] = useState<any[]>([]);
    //  类型一
    G6.registerNode('jsx1', {
      jsx: (cfg: any) => `
  <rect style={{
    width: 100,
    height: 100,
    fill: 'rgba(24, 144, 255, 0.15)',
    radius: 6
  }}>
  <rect
  style={{
    width: 100,
    height: 20,
    fill: '#1890ff',
    radius: [6, 6, 0, 0],
  }}
  >
   <text style={{
    fill: '#fff',
    textAlign: 'center',
    textBaseLine: 'middle',
    marginTop: 2,
    marginLeft: 50,
    fontWeight: 'bold'
   }}>${cfg?.label}</text>
  </rect>
  <rect style={{
    marginTop: 16
  }}>
  <text style={{
    marginLeft: 4,
    fill: 'red'
   }}>
   ${cfg.status}
   </text>
  <text style={{
    marginLeft: 4
   }}>
   ${cfg.metric}
   </text>
   <text style={{
    marginLeft: ${(cfg.cpuUsage * 60) / 100},
    marginTop: 10,
    fill: '#1890ff'
   }}>
   ${cfg.cpuUsage + '%'}
   </text>
   <rect style={{marginLeft: 6,width: 84, height: 10, radius: 4, fill: '#fff', stroke: '#1890ff'}}>
   <rect style={{marginLeft: 6,width: ${
     (cfg.cpuUsage / 100) * 84
   }, height: 10, fill: '#1890ff', radius: 4}}></rect>
 </rect>
  </rect>
  </rect>`,
    });
    //  类型二
    G6.registerNode('jsx2', {
      jsx: (cfg: any) => `<rect style={{
    width: 150,
    height: 75,
    stroke: ${cfg.color},
    fill: '#fff',
    radius: 6,
  }}>
   <rect style={{
    radius: [6,6,0,0],
    width: 150,
    height: 20,
    fill: ${cfg.color},
   }}>
    <text style={{
      fill: '#fff',
      textAlign: 'center',
      textBaseLine: 'middle',
      marginTop: 14,
      marginLeft: 60,
      fontWeight: 'bold'
    }}>
     ${cfg.label}
    </text>
   </rect>
   <rect>
    <text style={{marginTop: 2, marginLeft: 8}}> 描述：${cfg.description}</text>
    <text style={{marginTop: 2, marginLeft: 8}}> 创建者：${cfg.meta.creatorName}</text>
    <circle style={{
      r: 10,
      stroke: ${cfg.color},
    fill: '#fff',
    marginLeft: 76,
    marginTop: 22,
    cursor: 'pointer'
  }}>
  <image name="loading" style={{
    img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
    width: 12,
    height: 12,
    marginLeft: 70,
    marginTop: -5,
  }} />
  </circle>
   </rect>
  </rect>`,
      afterDraw: (cfg: any, group: any) => {
        const imgOrigin = group.find((el: any) => el.get('name') === 'loading');
        imgOrigin.animate(
          (radio: any) => {
            return {
              opacity: Math.abs(0.5 - radio),
            };
          },
          {
            repeat: true,
            duration: 3000,
          },
        );
      },
    });
    const tooltip = new G6.Tooltip({
      offsetX: 10,
      offsetY: 10,
      itemTypes: ['node', 'edge'],
      getContent: (e: any) => {
        const outDiv = document.createElement('div');
        outDiv.style.width = 'fit-content';
        outDiv.innerHTML = `
      <h4>${e?.item?.getModel().label || e?.item?.getModel().id}</h4>`;
        return outDiv;
      },
    });
    const fisheye = new G6.Fisheye({
      r: 200,
      showLabel: true,
    });

    const makeRelationData = (data: any) => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }

      const graphWidth = chartRef?.current?.scrollWidth;
      // const graphHeight = chartRef?.current?.scrollHeight || 1200;
      let origin = [graphWidth / 2, 100];
      let row = 150,
        clo = 180;
      let combos = data.nodes;
      let row_clo = Math.floor(Math.sqrt(combos.length));
      for (let i = 0; i < combos.length; i++) {
        let rowindex = Math.floor(i / row_clo) + 1;
        let cloindex = (i % row_clo) + 1;
        // 分组定位
        combos[i].x = origin[0] + clo * cloindex;
        combos[i].y = origin[1] + row * rowindex;
        if (i % 2 === 1) {
          combos[i].y += 40;
        }
      }

      drawG6View(data);
    };
    const reset = () => {
      setPlugins([]);
    };
    const openFisheye = () => {
      setPlugins([fisheye]);
    };
    const openTooltip = () => {
      setPlugins([tooltip]);
    };
    useImperativeHandle(ref, () => {
      return {
        reset,
        openFisheye,
        openTooltip,
      };
    });
    const drawG6View = (data: any) => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
      const content = window.document.getElementById('content');
      const size = {
        width: content?.clientWidth || window?.innerWidth - 300,
        height: content?.clientHeight || window?.innerHeight,
      };
      chartRef.current = new G6.Graph({
        container: 'chart',
        ...size,
        groupByTypes: false,
        plugins,
        modes: {
          default: ['drag-canvas'],
        },
        edgeStateStyles: {
          hover: {
            lineWidth: 2,
          },
        },

        defaultCombo: {
          type: 'circle',
          opacity: 0,
          lineWidth: 1,
          collapsed: true,
          labelCfg: {
            position: 'top',
            refY: 5,
            style: {
              fontSize: 16,
            },
          },
        },
        ...options,
      });

      chartRef.current.data(data);

      chartRef.current.render();
      chartRef.current.on('edge:mouseenter', (e: any) => {
        chartRef.current.setItemState(e.item, 'hover', true);
      });

      chartRef.current.on('edge:mouseleave', (e: any) => {
        chartRef.current.setItemState(e.item, 'hover', false);
      });

      chartRef.current.on('node:mouseenter', (e: any) => {
        const nodeItem = e.item;
        chartRef.current.setItemState(e.item, 'hover', true);
        onChartMouseOver && onChartMouseOver(nodeItem);
      });
      chartRef.current.on('node:click', (e: any) => {
        const nodeItem = e.item;
        onChartClick && onChartClick(nodeItem);
      });
      chartRef.current.on('node:dblclick', (e: any) => {
        const nodeItem = e.item;
        onChartDbClick && onChartDbClick(nodeItem);
      });
    };
    useLayoutEffect(() => {
      makeRelationData(data);
    }, [data, plugins]);
    useEffect(() => {
      window.onresize = () => {
        makeRelationData(data);
      };
    }, []);
    return <div id="chart"></div>;
  },
);

export default Chart;
