import { NextPage } from 'next';
import { Button, Layout } from 'antd';
import Link from 'next/link';
import { MenuItems } from '@src/app/enum/menu.enum';
import { $enum } from 'ts-enum-util';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { signOut, useSession } from 'next-auth/react';

const { Header } = Layout;

const AppHeader: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const currentRoute = router.pathname;

  const menu: Array<any> = $enum(MenuItems).map((item, key) => {
    return (<li key={key} className={currentRoute.includes(key) ? "nav-item nav-item-active" : "nav-item "}>
      <Link href={'/' + MenuItems[key]}>
        <a className="nav-link">{key}</a>
      </Link>
    </li>)
  });

  return (
    <Header>
      <div className="navbar">
        <div className="container-fluid">
          <ul className="navbar-nav">
            {menu}
            <li><span className="navbar-username"><small>{session?.user?.name}</small></span></li>
            <li><Button type="link" onClick={() => signOut()} >Sign Out</Button></li>
          </ul>
        </div>
      </div>
    </Header>
  )
}

export default AppHeader;