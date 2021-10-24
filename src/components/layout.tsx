import { NextPage } from 'next';
import React from 'react';
import { Layout } from 'antd';
import AppHeader from '@src/components/header';
import { useSession } from 'next-auth/react';
import AppLogin from '@src/components/login';
const { Content } = Layout;

const AppLayout: NextPage = ({ children }) => {
  const { data: session } = useSession();
  if (session) {
    return (
      <Layout className="layout">
        <AppHeader />
        <Content>
          <main>
            {children}
          </main>
        </Content>
      </Layout>
    );
  }
  return <AppLogin></AppLogin>;
}

export default AppLayout;