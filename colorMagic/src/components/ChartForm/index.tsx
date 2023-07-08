import React, { useRef, useState } from 'react';
import { AppContext } from '@/utils/context';
import { useContext } from 'react';
import { Button, Select, Form, Input, InputNumber } from 'antd';
import uuid from '@/utils/uuid';

const ChartForm: React.FC = () => {
  const context = useContext(AppContext);
  const form = useRef<any>(null);
  const [type, setType] = useState('');
  const getOriginNodeOptions = () => {
    return [{ id: 'root', label: 'root' }, ...context?.data?.nodes].map(
      (item: any) => {
        if (context?.data?.nodes.length && item?.id === 'root') {
          return { value: item?.id, label: item?.label, disabled: true };
        }
        return { value: item?.id, label: item?.label };
      },
    );
  };
  const onFinish = (values: any) => {
    const id = uuid();
    context.onAdd(
      {
        id,
        label: values.name,
        type: values.type,
        metric: values.metric,
        description: values?.description,
        cpuUsage: values?.cpuUsage,
        status: values?.status,
        group: values?.group,
        color: '#2196f3',
        meta: {
          creatorName: values?.creatorName,
        },
      },
      ['root'].includes(type)
        ? false
        : {
            source: id,
            target: values?.originNode,
          },
    );
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 12 }}
      style={{ maxWidth: 300 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      ref={form}
    >
      <Form.Item
        label="节点名称"
        name="name"
        rules={[
          { required: true, message: '节点名称不能为空' },
          {
            pattern: /^[A-Za-z\d_]+$/,
            message: '只能能包含字母数字下划线字符!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="类型"
        name="type"
        rules={[{ required: true, message: '请选择类型' }]}
      >
        <Select
          onChange={(e: any) => {
            setType(e);
          }}
          options={[
            { value: 'jsx1', label: '类型一' },
            { value: 'jsx2', label: '类型二' },
          ]}
        />
      </Form.Item>

      <Form.Item label="cpu使用率" name="cpuUsage" hidden={type !== 'jsx1'}>
        <InputNumber max={100} min={1} step={1} />
      </Form.Item>
      <Form.Item label="状态" name="status" hidden={type !== 'jsx1'}  rules={[{ required: true, message: '请填写状态' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="机器编码" name="metric" hidden={type !== 'jsx1'}  rules={[{ required: true, message: '请填写机器编码' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="创建者" name="creatorName" hidden={type !== 'jsx2'}>
        <Input />
      </Form.Item>

      <Form.Item label="描述" name="description" hidden={type !== 'jsx2'}  rules={[{ required: true, message: '请填写描述' }]}>
        <Input.TextArea rows={4} maxLength={8} />
      </Form.Item>
      <Form.Item
        label="聚类分组"
        name="group"
        rules={[{ required: true, message: '请选择聚类分组' }]}
      >
        <Select
          options={[
            { value: 'A', label: '聚类A' },
            { value: 'B', label: '聚类B' },
            { value: 'C', label: '聚类C' },
            { value: 'D', label: '聚类D' },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="来源节点"
        name="originNode"
        rules={[{ required: true, message: '请选择来源节点' }]}
      >
        <Select placeholder="" allowClear options={getOriginNodeOptions()} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          添加节点
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChartForm;
