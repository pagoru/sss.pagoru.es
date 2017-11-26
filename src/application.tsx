import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import * as SuperSecretSettings from 'super-secret-settings';

import './index.less'

const qr_url = 'https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=';
const qr_url2 = 'https://loremflickr.com/500/500?lock=';

export default class Application extends React.Component<{}, {}> {

    constructor(props, context?: any){
        super(props, context);

        this.state = {
            service: '',
            hash: '00000000',
            password: ''
        };

        this.onChangeSecret = this.onChangeSecret.bind(this);
        this.onChangeService = this.onChangeService.bind(this);
    }

    onChangeSecret(event: any) {
        const sss = new SuperSecretSettings({ masterPassword: event.target.value });
        this.setState({
            sss: new SuperSecretSettings({ masterPassword: event.target.value }),
            hash: sss.getMasterPasswordHash().substr(0, 8),
            password: sss.generatePassword({ serviceName: this.state['service'] })
        });
    }

    onChangeService(event: any) {
        this.setState({
            service: event.target.value,
            hash: this.state['sss'].getMasterPasswordHash().substr(0, 8),
            password: this.state['sss'].generatePassword({ serviceName: event.target.value })
        });
    }

    render() {
        document.body.style.backgroundColor = `#${this.state['hash'].substr(0, 6)}`;
        return (
            <div className="robot">
                <div className="inputs">
                    <input id="secret" placeholder="secret" type="password" onChange={this.onChangeSecret} autoFocus/>
                    <input id="service" placeholder="service" value={this.state['service']} onChange={this.onChangeService}/>
                    <div>
                    </div>
                    <label id="hexadecimalSeed" className="noselect">{this.state['hash']}</label>
                </div>
                <CopyToClipboard text={this.state['password']}>
                    <img id="robotRock" src={qr_url2 + parseInt(this.state['hash'], 16)}/>
                </CopyToClipboard>
            </div>
        );
    }

}