import { Button, Checkbox, ConfigProvider, DatePicker, Form, Input, InputNumber, Radio, Row, Select, Space, Table, TableColumnProps, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { addEmpInfo, removeAllEmpInfo, removeEmpInfo, updateEmpInfo } from '../store/emp.slice';
import { useState } from 'react';
import { RootState } from '../store/stroe';
import { ColumnProps, TableProps } from 'antd/es/table';
import moment from 'moment';


export default function Test2Page() {

  const { Option } = Select
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [data, setDate] = useState()
  const [recordID, setRecordId] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [formValue, setFormValue] = useState(
    {
      id: null,
      title: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nationality: "",
      gender: 0,
      mobilePhone: "",
      countryCode: "",
      citizenId: "",
      citizenId2: "",
      citizenId3: "",
      citizenId4: "",
      citizenId5: "",
      passport: "",
      salary: ""
    },

  )

  const countries = [
    { code: '+1', flag: 'https://flagsapi.com/US/flat/64.png' },
    { code: '+44', flag: 'https://flagsapi.com/GB/flat/64.png' },
    { code: '+66', flag: 'https://flagsapi.com/TH/flat/64.png' },

  ];
  const keydownHandle = (e: any) => {
    if (
      !(
        (e.key >= '0' && e.key <= '9') ||
        e.key === 'Backspace' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'Delete' ||
        e.key === 'Tab'
      )
    ) {

      e.preventDefault();
    }
  }

  const onReset = () => {
    form.resetFields();
    message.warning('reset!');
    setRecordId(undefined)
  };
  const onSubmit = () => {
    if (recordID) {
      dispatch(updateEmpInfo({
        id: recordID,
        title: formValue.title,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        dateOfBirth: formValue.dateOfBirth,
        nationality: formValue.nationality,
        gender: formValue.gender,
        mobilePhone: formValue.countryCode + formValue.mobilePhone,
        salary: formValue.salary,
        citizenId: formValue.citizenId + formValue.citizenId2 + formValue.citizenId3 + formValue.citizenId4 + formValue.citizenId5,
        passport: formValue.passport,
        countryCode: formValue.countryCode
      }));
      message.success("Record updated successfully");
      setRecordId(undefined)
    } else {
      dispatch(addEmpInfo({
        title: formValue.title,
        firstName: formValue.firstName + " " + formValue.lastName,
        lastName: "",
        dateOfBirth: formValue.dateOfBirth,
        nationality: formValue.nationality,
        gender: formValue.gender,
        mobilePhone: formValue.countryCode + formValue.mobilePhone,
        salary: formValue.salary,
        citizenId: formValue.citizenId + formValue.citizenId2 + formValue.citizenId3 + formValue.citizenId4 + formValue.citizenId5,
        passport: formValue.passport,
        countryCode: formValue.countryCode
      }));
      message.success("Record added successfully");
    }
    onReset();
  };

  const handleEdit = (record: any) => {
    setRecordId(record.id)
    form.setFieldsValue({
      title: record.title,
      firstName: record.firstName,
      lastName: record.lastName,
      dateOfBirth: moment(record.dateOfBirth),
      nationality: record.nationality,
      gender: record.gender,
      mobilePhone: record.mobilePhone ? record.mobilePhone.slice(record.countryCode.length) : "",
      countryCode: record.countryCode,
      citizenId: record.citizenId ? record.citizenId.slice(0, 1) : "",
      citizenId2: record.citizenId ? record.citizenId.slice(1, 5) : "",
      citizenId3: record.citizenId ? record.citizenId.slice(5, 10) : "",
      citizenId4: record.citizenId ? record.citizenId.slice(10, 12) : "",
      citizenId5: record.citizenId ? record.citizenId.slice(12, 13) : "",
      passport: record.passport,
      salary: record.salary
    });
    console.log(record)
  };

  const handleChange = (fieldName: any, value: any) => {
    setFormValue(prevState => ({

      ...prevState,
      [fieldName]: value

    }));
  };

  const dataSauce = useSelector((state: RootState) => state.empInfo.empDate)
  const removeSelectedEmpInfo = (selectedIds: number[]) => (dispatch: any) => {
    selectedIds.forEach(id => {
      dispatch(removeEmpInfo(id));
    });
  };
  const column: TableProps['columns'] = [
    {
      title: "Name",
      key: "title",
      render: (record) => `${record.firstName} ${record.lastName}`,

    },
    {
      title: "Gender",
      key: "gender",
      dataIndex: 'gender',
      render: (gender) => {
        switch (gender) {
          case 0:
            return 'Male';
          case 1:
            return 'Female';
          case 2:
            return 'Unisex';
        }
      },
      sorter: (a, b) => a.gender - b.gender
    },
    {
      title: 'Mobile Phone',
      key: 'mobilePhone',
      dataIndex: 'mobilePhone',
      sorter: (a, b) => a.gender - b.gender
    },
    {
      title: 'Nationality',
      key: 'nationality',
      dataIndex: 'nationality',
      sorter: (a, b) => a.gender - b.gender
    },
    {
      title: 'Managed',
      key: 'managed',
      render: (_, record) => (
        <Space size={'middle'}>
          <Button onClick={() => handleEdit(record)}>{t('edit')}</Button>
          <Button onClick={() => dispatch(removeEmpInfo(record.id))}>{t('delete')}</Button>
        </Space>
      ),
      sorter: (a, b) => a.gender - b.gender
    },
  ]
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      
    },

  };
  const handleSelectAll = () => {
    const allRowKeys = dataSauce.map(record => record.id);
    setSelectedRowKeys(allRowKeys);
  };
  const dropTable = () => {
    dispatch(removeAllEmpInfo())
  }

  return (
    <div className='test2_container' style={{ gap: 10 }}>
      <div className='test2_container2'></div>
      <ConfigProvider theme={{
        components: {
          Form: {}
        },

      }}>
        <Form layout='horizontal'
          style={{ maxWidth: 800, rowGap: 12, }}
          form={form}
          name='main'
          onFinish={onSubmit}>
          <Row style={{ columnGap: 10 }}>
            <Form.Item name="title" label={t('title')} rules={[{ required: true }]} style={{ width: 120 }}>
              <Select placeholder={t('mr')} value={formValue.title} onChange={(e) => handleChange('title', e)}>
                <Option value={t('mr')}>{t('mr')}</Option>
                <Option value={t('miss')}>{t('miss')}</Option>
                <Option value={t('mrs')}>{t('mrs')}</Option>
              </Select>
            </Form.Item>
            <Form.Item name="firstName" label={t('firstName')} rules={[{ required: true }]}>
              <Input value={formValue.firstName} onChange={(e) => handleChange('firstName', e.currentTarget.value)} />
            </Form.Item>
            <Form.Item name="lastName" label={t('lastName')} rules={[{ required: true }]}>
              <Input value={formValue.lastName} onChange={(e) => handleChange('lastName', e.currentTarget.value)} />
            </Form.Item>
          </Row>
          <Row style={{ columnGap: 10 }} >
            <Form.Item name="dateOfBirth" label={t('dateOfBirth')} rules={[{ required: true }]}>
              <DatePicker placeholder={t('dateCode')} value={formValue.dateOfBirth} onChange={(e) => handleChange('dateOfBirth', e)} />
            </Form.Item>
            <Form.Item name="nationality" label={t('nationality')} rules={[{ required: true }]}>
              <Select placeholder={t('paceholder')} value={formValue.nationality} onChange={(e) => handleChange('nationality', e)}>
                <Option value={t('thailand')}>{t('thailand')}</Option>
                <Option value={t('japanese')}>{t('japanese')}</Option>
              </Select>
            </Form.Item>
          </Row>
          <Row style={{ columnGap: 10 }}>
            <Form.Item name="citizenId" label={t('citizenId')} style={{ width: 180 }}>
              <Input maxLength={1} style={{ textAlign: 'center' }} onKeyDown={keydownHandle} value={formValue.citizenId} onChange={(e) => handleChange('citizenId', e.currentTarget.value)} />
            </Form.Item>
            {' - '}
            <Form.Item name="citizenId2" style={{ width: 120 }} >
              <Input maxLength={4} style={{ textAlign: 'center' }} onKeyDown={keydownHandle} value={formValue.citizenId2} onChange={(e) => handleChange('citizenId2', e.currentTarget.value)} />
            </Form.Item>
            {' - '}
            <Form.Item name="citizenId3" style={{ width: 140 }}>
              <Input maxLength={5} style={{ textAlign: 'center' }} onKeyDown={keydownHandle} value={formValue.citizenId3} onChange={(e) => handleChange('citizenId3', e.currentTarget.value)} />
            </Form.Item>
            {' - '}
            <Form.Item name="citizenId4" style={{ width: 100 }}>
              <Input maxLength={2} style={{ textAlign: 'center' }} onKeyDown={keydownHandle} value={formValue.citizenId4} onChange={(e) => handleChange('citizenId4', e.currentTarget.value)} />
            </Form.Item>
            {' - '}
            <Form.Item name="citizenId5" style={{ width: 80 }}>
              <Input maxLength={1} style={{ textAlign: 'center' }} onKeyDown={keydownHandle} value={formValue.citizenId5} onChange={(e) => handleChange('citizenId5', e.currentTarget.value)} />
            </Form.Item>
          </Row>
          <Form.Item name="gender" label={t('gender')} rules={[{ required: true }]}>
            <Radio.Group value={formValue.gender} onChange={(e) => handleChange('gender', e.target.value)}>
              <Radio value={1} name='Male'>{t('male')}</Radio>
              <Radio value={2} name='Female'>{t('female')}</Radio>
              <Radio value={3} name='Unisex'>{t('Unisex')}</Radio>
            </Radio.Group>
          </Form.Item>
          <Row style={{ columnGap: 20 }}>
            <Form.Item name="countryCode" label={t('mobilePhone')} rules={[{ required: true }]}>
              <Select placeholder={t('paceholder')} value={formValue.countryCode} onChange={(e) => handleChange('countryCode', e)}>
                {countries.map(countries => (
                  <Option value={countries.code}>{<img src={countries.flag} style={{ width: 20, marginRight: 8, }} />}{countries.code}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="mobilePhone" rules={[{ required: true }]}>
              <Input maxLength={10} onKeyDown={keydownHandle} value={formValue.mobilePhone} onChange={(e) => handleChange('mobilePhone', e.currentTarget.value)} />
            </Form.Item>
          </Row>
          <Form.Item name="passport" label={t('passport')} >
            <Input maxLength={15} onKeyDown={keydownHandle} value={formValue.passport} onChange={(e) => handleChange('passport', e.currentTarget.value)} />
          </Form.Item>
          <Row style={{ flexWrap: 'nowrap' }}>
            <Form.Item name="salary" label={t('salary')} rules={[{ required: true }]}>
              <Input maxLength={15} onKeyDown={keydownHandle} value={formValue.salary} onChange={(e) => handleChange('salary', e.currentTarget.value)} />
            </Form.Item>
            <Row style={{ width: '60%', justifyContent: 'flex-end', columnGap: 20 }}>
              <Button htmlType='submit'>
                {t('submit')}
              </Button>
              <Button onClick={onReset}>
                {t('reset')}
              </Button>
            </Row>
          </Row>
        </Form>
        <Row>
          <Checkbox onClick={handleSelectAll}>{t('selectAll')}</Checkbox>
          <Button onClick={dropTable}>{t('delete')}</Button>
        </Row>

        <Table dataSource={dataSauce} columns={column} size='large' style={{ width: '100%' }} rowSelection={{ ...rowSelection }} pagination={{
          position: ['topRight'],
          itemRender(_, type, element) {
            if (type === 'prev') {
              return <a>{t('prev')}</a>;
            }
            if (type === 'next') {
              return <a>{t('next')}</a>;
            }
            return element
          },
        }} />
      </ConfigProvider>
    </div>
  )
}
