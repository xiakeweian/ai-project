
import React from 'react';
import { Calendar, Cascader } from 'antd';
import type { Dayjs } from 'dayjs';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';



function Test() {

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };


  interface Option {
    value: string | number;
    label: string;
    children?: Option[];
  }

  const options: Option[] = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];


  return (
    <div className="App">
      12121
      <div>
        <Cascader options={options} placeholder="Please select" />
        <Calendar onPanelChange={onPanelChange} />
      </div>
    </div>
  );
}

export default Test;
