/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import {useEffect, useState} from "preact/hooks";
import {getCssColor, getPassword} from "../utils/password.ts";
import {copyToClipboard} from '../utils/clipboard.ts'

export default () => {
  const [password, setPassword] = useState<string>('Blue');
  const [service, setService] = useState<string>('');
  const [servicePassword, setServicePassword] = useState<string>('');
  
  useEffect(() => {
    window.document.getElementsByTagName('body').item(0)
      .style.backgroundColor = getCssColor(password)
  }, [password]);
  
  useEffect(() => {
    setServicePassword(getPassword(password, service))
  }, [password, service])
  
  const onChangePassword = (e: any) => setPassword(e.target.value);
  const onChangeService = (e: any) => setService(e.target.value);
  const onClickServicePassword = () => copyToClipboard(servicePassword)
  
  return (
    <div className="form">
      <input
        autofocus
        type="password"
        autoComplete="off"
        onKeyUp={onChangePassword}
      />
      <input
        autoComplete="off"
        onKeyUp={onChangeService}
      />
      <div
        className="service-password"
        onClick={onClickServicePassword}
      >{servicePassword}</div>
    </div>
  );
}