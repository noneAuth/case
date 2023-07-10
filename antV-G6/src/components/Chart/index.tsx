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
    G6.registerNode('jsx3', {
      draw: (cfg: any, group) => {
        //最外面的那层
        const shape = group.addShape('rect', {
          draggable: true,
          attrs: {
            x: 0,
            y: 0,
            width: 125,
            height: 40,
            fill: cfg.style.fill, //填充色
            stroke: '', //边框
            radius: 8,
          },
        });
        //里面的那层
        group.addShape('rect', {
          draggable: true,
          attrs: {
            x: 5,
            y: 0,
            width: 120,
            height: 40,
            fill: '#fff', //填充色
            stroke: '#2196f3', //边框
            radius: 6,
          },
        });
        //文字
        group.addShape('text', {
          attrs: {
            textBaseline: 'middle',
            y: 20,
            x: 60,
            textAlign: 'center',
            text: cfg.label,
            fill: '#000',
          },
        });
        return shape;
      },
    });
    G6.registerNode('jsx1', {
      draw(cfg: any, group) {
        const shape = group.addShape('rect', {
          draggable: true,
          attrs: {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            fill: 'rgba(24, 144, 255, 0.15)', //填充色
            stroke: '', //边框
            radius: 6,
          },
        });
        group.addShape('rect', {
          draggable: true,
          attrs: {
            x: 0,
            y: 0,
            width: 100,
            height: 20,
            fill: '#2196f3', //填充色
            stroke: '', //边框
            radius: [6, 6, 0, 0],
          },
        });
        group.addShape('text', {
          draggable: true,
          attrs: {
            x: 50,
            y: 16,
            width: 100,
            height: 20,
            fill: '#fff',
            stroke: '',
            textAlign: 'center',
            text: cfg.label,
            fontWeight: 'bold',
            textBaseLine: 'middle',
          },
        });
        group.addShape('text', {
          draggable: true,
          attrs: {
            x: 12,
            y: 40,
            width: 100,
            height: 20,
            fill: 'red',
            stroke: '',
            text: cfg.status,
            fontWeight: 'bold',
            textBaseLine: 'middle',
          },
        });
        group.addShape('text', {
          draggable: true,
          attrs: {
            x: 12,
            y: 60,
            width: 100,
            height: 20,
            fill: '#000',
            stroke: '',
            text: cfg.metric,
            fontWeight: 'bold',
            textBaseLine: 'middle',
          },
        });
        group.addShape('text', {
          draggable: true,
          attrs: {
            x:  cfg.cpuUsage / 100 * 84,
            y: 80,
            width: 84,
            height: 20,
            fill: '#1890ff',
            stroke: '',
            text: cfg.cpuUsage + '%',
            fontWeight: 'bold',
            textBaseLine: 'middle',
          },
        });
        group.addShape('rect', {
          draggable: true,
          attrs: {
            x: 7,
            y: 82,
            width: 84,
            height: 10,
            fill: '#fff',
            stroke: '',
            // radius: 4,
          },
        });
        group.addShape('rect', {
          draggable: true,
          attrs: {
            x: 7,
            y: 82,
            width: cfg.cpuUsage / 100 * 84,
            height: 10,
            fill: '#1890ff',
            stroke: '',
            // radius: 4,
          },
        });
        return shape;
      },
    });

    G6.registerNode('jsx2', {
      draw(cfg: any, group) {
        const shape = group.addShape('rect', {
          draggable: true,
          attrs: {
            x: 0,
            y: 0,
            width: 150,
            height: 76,
            fill: '#fff', //填充色
            stroke: cfg.color, //边框
            radius: 6,
          },
        });
        group.addShape('rect', {
          draggable: true,
          attrs: {
            x: 0,
            y: 0,
            width: 150,
            height: 20,
            fill: cfg.color,
            stroke: '',
            radius: [6, 6, 0, 0],
          },
        });
        group.addShape('text', {
          draggable: true,
          attrs: {
            x: 75,
            y: 16,
            width: 100,
            height: 20,
            fill: '#fff',
            textAlign: 'center',
            stroke: '',
            text: cfg.label,
            fontWeight: 'bold',
          },
        });
        group.addShape('text', {
          draggable: true,
          attrs: {
            x: 12,
            y: 40,
            width: 100,
            height: 20,
            fill: '#000',
            stroke: '',
            text: '描述：' + cfg.description,
            fontWeight: 'bold',
            textBaseLine: 'middle',
          },
        });
        group.addShape('text', {
          draggable: true,
          attrs: {
            x: 12,
            y: 56,
            width: 100,
            height: 20,
            fill: '#000',
            stroke: '',
            text: '创建者：' + cfg?.meta?.creatorName,
            fontWeight: 'bold',
            textBaseLine: 'middle',
          },
        });
        group.addShape('circle', {
          draggable: true,
          attrs: {
            x: 75,
            y: 75,
            fill: '#fff',
            r: 10,
            cursor: 'poiner',
            stroke: cfg?.color,
          },
        });
        group.addShape('image', {
          draggable: true,
          name: 'loading',
          attrs: {
            x: 69,
            y: 69,
            width: 12,
            height: 12,
            img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
            cursor: 'pointer',
          },
        });
        return shape;
      },
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
          default: ['drag-canvas', 'drag-node'],
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
