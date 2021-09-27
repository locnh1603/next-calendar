import { NextPage } from 'next';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { MenuItems } from '@src/app/enum/menu.enum';
import { $enum } from 'ts-enum-util';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Typography } from 'antd';

const { Header } = Layout;
const { Text } = Typography;

const AppHeader: NextPage = () => {
  let [clock, setClock] = useState(new Date());

  useEffect(() => {
    var clockTimer = setInterval(() => tick(), 60000);

    return function cleanup() {
      clearInterval(clockTimer);
    };
  });

  const tick = () => {
    setClock(new Date());
  };

  const menu: Array<any> = $enum(MenuItems).map((item, key) => {
    return (<Menu.Item key={key} className="menu-item">
      <Link href={'/' + key}>
        {item}
      </Link>
    </Menu.Item>)
  });

  return (
    <Header className="row">
      <div className="col-2">
        <Text className="text-white">{moment(clock).format('HH:mm DD/MM/yyyy')}</Text>
      </div>
      <Menu mode="horizontal" theme="dark" className="col">
        {menu}
      </Menu>
    </Header>
  )
}

export default AppHeader;