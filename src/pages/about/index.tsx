import { ReactElement } from 'react';
import AppLayout from '@components/layout'
import { NextPageWithLayout } from '@src/pages/_app';
import { PageHeader } from 'antd';

const About: NextPageWithLayout = () => {
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="About"
        subTitle="This is a demo for NextJS lessons"
      />
    </>
  );
}
About.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  );
}
export default About;