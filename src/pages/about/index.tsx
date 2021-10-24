import { PageHeader } from 'antd';
import { NextPage } from 'next';

const About: NextPage = () => {
  return (
    <PageHeader
      className="site-page-header"
      title="About"
      subTitle="This is a demo for NextJS lessons"
    />
  );
}
export default About;