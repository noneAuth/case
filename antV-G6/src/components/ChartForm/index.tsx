import React, { useRef, useState } from 'react';
import { AppContext } from '@/utils/context';
import { useContext } from 'react';
import { Button, Select, Form, Input, InputNumber } from 'antd';
import uuid from '@/utils/uuid';

const ChartForm: React.FC = () => {
  const context = useContext(AppContext);
  const form = useRef<any>(null);
  const [type, setType] = useState('');
  const [group, setGroup] = useState('');
  const isRoot = ['root'].includes(group);
  const isEmpty = context?.data?.nodes?.length === 0;
  const isType1 = type === 'jsx1';
  const isType2 = type === 'jsx2';


  const getOriginNodeOptions = () => {
    return [...context?.data?.nodes].map((item: any) => {
      return { value: item?.id, label: item?.label };
    });
  };
  const reset = () => {
    form.current.resetFields();
    setType('');
    setGroup('');
  };
  const onFinish = (values: any) => {
    const id = uuid();
    context.onAdd(
      {
        id,
        label: values.name,
        type: isRoot? 'jsx3' : values.type,
        metric: values.metric,
        description: values?.description,
        cpuUsage: values?.cpuUsage,
        status: values?.status,
        group: values?.group,
        color: '#2196f3',
        parent: isRoot ? '' : values?.originNode,
        meta: {
          creatorName: values?.creatorName,
        },
      },
      isRoot
        ? false
        : {
            source: id,
            target: values?.originNode,
          },
    );
    reset();
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
        label="节点类型"
        name="group"
        rules={[{ required: true, message: '请选择类型' }]}
      >
        <Select
          onChange={(value: any) => {
            setGroup(value);
          }}
          options={[
            { value: 'root', label: '机房' },
            { value: 'node', label: '机器' , disabled: isEmpty},
          ]}
        />
      </Form.Item>
      <Form.Item
        label="聚类"
        name="type"
        rules={[{ required: !isRoot && !isEmpty, message: '请选择聚类分组' }]}
        hidden={isRoot || isEmpty}
      >
        <Select
          onChange={(e: any) => {
            setType(e);
          }}
          options={[
            { value: 'jsx1', label: '聚类A' },
            { value: 'jsx2', label: '聚类B' },
            // { value: 'C', label: '聚类C' },
            // { value: 'D', label: '聚类D' },
          ]}
        />
      </Form.Item>
      <Form.Item label="使用率" name="cpuUsage" hidden={!isType1 || isEmpty}>
        <InputNumber max={100} min={1} step={1} />
      </Form.Item>
      <Form.Item label="状态" name="status" hidden={!isType1 || isEmpty}>
        <Input />
      </Form.Item>
      <Form.Item label="编码" name="metric" hidden={!isType1 || isEmpty}>
        <Input />
      </Form.Item>
      <Form.Item label="创建者" name="creatorName" hidden={!isType2 || isEmpty}>
        <Input />
      </Form.Item>

      <Form.Item label="描述" name="description" hidden={!isType2 || isEmpty}>
        <Input.TextArea rows={4} maxLength={8} />
      </Form.Item>
      <Form.Item
        label="来源节点"
        name="originNode"
        hidden={isRoot || isEmpty}
        rules={[{ required: !isRoot && !isEmpty, message: '请选择来源节点' }]}
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
