import { PageHeader } from 'antd';
import { NextPage } from 'next';

const About: NextPage = () => {
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="About"
        subTitle="This is a demo for NextJS lessons"
      />
      <div>
        Made with
        <ul>
          <li>NodeJS</li>
          <li>Ant Design</li>
          <li>Next Auth</li>
          <li>JSON server</li>
        </ul>
      </div>
    </>
  );
}
export default About;