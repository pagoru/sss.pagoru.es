import './index.less'
import * as React from "react";
import {useEffect, useState} from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {getHash, getPassword, getCssColor} from 'super-secret-settings';

const main_img = 'https://robohash.org/Bender';

export function Application() {
  const [secret, setSecret] = useState('');
  const [service, setService] = useState('');
  const [openConfig, setOpenConfig] = useState(false);
  const [configLoaded, setConfigLoaded] = useState(false);
  const [lenght, setLenght] = useState(12);
  const [forceAllChars, setForceAllChars] = useState(false);
  const [legacyAlphabet, setLegacyAlphabet] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    try {
      // If cookies are disable this will crash, there is no way to detect it :(
      if (configLoaded) {
        window.localStorage.setItem('sss.password_length', `${lenght}`);
        window.localStorage.setItem('sss.force_all_chars', `${forceAllChars}`);
        window.localStorage.setItem('sss.legacy_alphabet', `${legacyAlphabet}`);
        window.localStorage.setItem('sss.show_password', `${showPassword}`);
      } else {
        let password_length = window.localStorage.getItem('sss.password_length') || '14';
        let force_all_chars = window.localStorage.getItem('sss.force_all_chars') || 'false';
        let legacy_alphabet = window.localStorage.getItem('sss.legacy_alphabet') || 'true';
        let show_password = window.localStorage.getItem('sss.show_password') || 'true';

        setLenght(+password_length);
        setForceAllChars(force_all_chars == 'true');
        setLegacyAlphabet(legacy_alphabet == 'true');
        setShowPassword(show_password == 'true');
        setConfigLoaded(true);
      }
    } catch (e) {
      console.error(e);
    }
  });

  const alphabet = legacyAlphabet
    ? 'ABCDFGHIJKLMNOPQRSTUVWXYZabdfghijklmnopqrstuvwxyz1234567890'
    : 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890!@#$%*()_+=-€¡?¿[]{}",./ç<>| ';

  let password = getPassword(secret, service, lenght, alphabet);

  if (!hasAllChars(password, !legacyAlphabet)) {
    console.log(password);
  }

  if (forceAllChars && password.length >= 4) {
    while (!hasAllChars(password, !legacyAlphabet)) {
      password = getPassword(secret, password, lenght, alphabet);
    }
  }

  const secretHash = getHash(secret).substr(0, 8);
  const serviceHash = getHash(service).substr(0, 8);
  const passwordHash = getHash(password).substr(0, 8);

  const secretColor = secret ? getCssColor(secret, 50, 80) : 'white';
  const serviceColor = service ? getCssColor(service, 50, 80) : 'white';
  const passwordColor = secret || service ? getCssColor(password) : '#249D9F';

  const changeSecret = (event) => setSecret(event.target.value);
  const changeService = (event) => setService(event.target.value);
  const setPassLength = (text) => {
    let int = +text;
    if (isNaN(int) || int < 0 || int > 999) return;
    setLenght(int);
  }

  const toggleConfig = () => setOpenConfig(!openConfig);

  document.body.style.backgroundColor = passwordColor;

  return (
    <div className="robot">
      <CopyToClipboard text={password}>
        <img id="robot-img" src={main_img} alt=""/>
      </CopyToClipboard>

      <div className="inputs">
        <div className='input-wrapper'>
          <input id="secret"
                 placeholder="secret"
                 type="password"
                 value={secret}
                 style={{backgroundColor: secretColor}}
                 onChange={changeSecret}
                 autoFocus/>

          <label className="hexadecimal-seed noselect" title='Check hash'>
            {secretHash}
          </label>
        </div>

        <div className='input-wrapper'>
          <input id="service"
                 placeholder="service"
                 value={service}
                 style={{backgroundColor: serviceColor}}
                 onChange={changeService}/>
          <div/>
          <label className="hexadecimal-seed noselect" title='Check hash'>
            {serviceHash}
          </label>
        </div>

        <div className='input-wrapper'>
          <input id="password-output"
                 disabled={true}
                 placeholder="password"
                 type={showPassword ? 'text' : 'password'}
                 style={{backgroundColor: 'white'}}
                 value={secret || service ? password : ''}
                 onChange={() => null}/>
          <div/>
          <label className="hexadecimal-seed noselect" title='Check hash'>
            {secret || service ? passwordHash : ''}
          </label>
        </div>
      </div>

      <div className='last-row'>
        <CopyToClipboard text={secret.length ? password : ''}>
          <button className={secret.length ? 'copy-btn' : 'copy-btn disable'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-clipboard" viewBox="0 0 16 16">
              <path
                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
              <path
                d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
            </svg>
            <div>Copy to clipboard</div>
          </button>
        </CopyToClipboard>

        <button className='config' onClick={toggleConfig}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               className="bi bi-gear-fill" viewBox="0 0 16 16">
            <path
              d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
          </svg>
        </button>
      </div>

      {
        openConfig &&
        <div className='config-panel'>

          <div className='field'>
            <label>
              <input type="checkbox"
                     checked={showPassword}
                     onChange={() => setShowPassword(!showPassword)}/>
              Show password
            </label>
          </div>

          <div className='field'>
            <label>
              <input type="checkbox"
                     checked={forceAllChars}
                     onChange={() => setForceAllChars(!forceAllChars)}/>
              Force all character types
            </label>
          </div>

          <div className='field'>
            <label>
              <input type="checkbox"
                     checked={legacyAlphabet}
                     onChange={() => setLegacyAlphabet(!legacyAlphabet)}/>
              Use legacy alphabet
            </label>
          </div>

          <div className='field'>
            <label>
              <input type="number"
                     min={1}
                     max={512}
                     step={1}
                     value={lenght}
                     onChange={e => setPassLength(e.target.value)}/>
              Password length
            </label>

          </div>
        </div>
      }
    </div>
  );
}

function hasAllChars(text, includeSpecial) {
  let lower = false;
  let upper = false;
  let number = false;
  let special = false;

  text.split('').forEach(char => {
    lower = lower || /[a-z]/.test(char);
    upper = upper || /[A-Z]/.test(char);
    number = number || /\d/.test(char);
    special = special || /[^A-Za-z0-9]/.test(char);
  });

  return lower && upper && number && (!includeSpecial || special);
}