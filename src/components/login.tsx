import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { Image, Button } from 'antd';
const AppLogin: NextPage = () => {
  return (
    <div className="landing">
      <div className="landing-text">Please choose a signIn method</div>
      <div className="landing-signin">
        <Button className="btn-signin"  onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/calendar' })}>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={50} preview={false}></Image>
        </Button>
        <Button className="btn-signin"  onClick={() => signIn('facebook', { callbackUrl: 'http://localhost:3000/calendar' })}>
          <Image src="https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-Blue-Logo.wine.svg" width={240} preview={false}></Image>
        </Button>
      </div>
    </div>
  )
}
export default AppLogin;