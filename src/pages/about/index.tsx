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
          <li>Redux Toolkit</li>
          <li>NEXT JS</li>
          <li>Ant Design</li>
          <li>Next Auth</li>
          <li>JSON server</li>
        </ul>
      </div>
      <div>
        Simple calendar note app with OAuth and simple CRUD.
        Utilizes Redux Toolkit for state management. Combine with React thunk and axios for data fetching
      </div>
    </>
  );
}
export default About;