import react,{ ReactNode, Ref } from 'react';
interface reactProps {
    children?: ReactNode
}
export interface hexToRgbaProps {
  hex: string;
  opacity?: number;
}
export interface chartProps {
  data: any;
  parentNode: any;
  id?: string;
  options?: object;
  chartRef: any;
  onChartMouseOver?: any;
  onChartClick?: any;
  onChartDbClick?: any;
}
export type playState = 'running' | 'paused';
export interface stepsProps {
  num: number;
  tag: string;
  playState: playState;
  y: number;
}
export default reactProps;
