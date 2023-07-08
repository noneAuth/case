import React, { useRef, useState } from 'react';
import { AppContext } from '@/utils/context';
import { useContext } from 'react';
import { Button, Select, Form, Input, InputNumber } from 'antd';
import uuid from '@/utils/uuid';

const typeMap = {
  A: 'jsx2',
  B: 'jsx2',
  root: 'jsx1',
};

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
  const getGroup = () => {
    const cache = new Set([...context?.data?.nodes].map((item) => item.group));
    return [...cache].map((item) => ({ value: typeMap[item], label: item }));
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
        color: '#2196f3',
        meta: {
          creatorName: values?.creatorName,
        },
      },
    ['root'].includes(type) ? false : {
        source: id,
        target: values?.originNode,
      },
    );
  };

  const onFinishFailed = (errorInfo: any) => {};
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 12 }}
      style={{ maxWidth: 300 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
        label="聚类分组"
        name="type"
        rules={[{ required: true, message: '请选择聚类分组' }]}
      >
        <Select
          onChange={(e: any) => {
            setType(e);
          }}
          options={getGroup()}
        />
      </Form.Item>

      <Form.Item label="cpu使用率" name="cpuUsage" hidden={type !== 'jsx1'}>
        <InputNumber max={100} min={1} step={1} />
      </Form.Item>
      <Form.Item label="状态" name="status" hidden={type !== 'jsx1'}>
        <Input />
      </Form.Item>
      <Form.Item label="机器码" name="metric" hidden={type !== 'jsx1'}>
        <Input />
      </Form.Item>
      <Form.Item label="创建者" name="creatorName" hidden={type !== 'jsx2'}>
        <Input />
      </Form.Item>

      <Form.Item label="描述" name="description" hidden={type !== 'jsx2'}>
        <Input.TextArea rows={4} maxLength={8} />
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
