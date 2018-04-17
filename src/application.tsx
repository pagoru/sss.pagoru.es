import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { getHash, getPassword } from 'super-secret-settings';

import './index.less'

const qr_url = 'https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=';
const qr_url2 = 'https://loremflickr.com/500/500?lock=';
const qr_static = 'https://instagram.fmad7-1.fna.fbcdn.net/vp/40e87239ca4b09b3d13fe05a553df631/5B65842E/t51.2885-15/e35/30602671_269685373571513_4681094377852895232_n.jpg';

export default class Application extends React.Component<{}, {}> {

    constructor(props, context?: any){
        super(props, context);

        this.state = {
            secret: '',
            service: '',
            hash: '00000000',
            password: ''
        };

        this.onChangeSecret = this.onChangeSecret.bind(this);
        this.onChangeService = this.onChangeService.bind(this);
    }

    onChangeSecret(event: any) {
        const secret = event.target.value;
        this.setState({
            secret: secret,
            hash: getHash(secret).substr(0, 8),
            password: getPassword(secret, this.state['service'])
        });
    }

    onChangeService(event: any) {
        const service = event.target.value;
        this.setState({
            service: service,
            hash: getHash(this.state['secret']).substr(0, 8),
            password: getPassword(this.state['secret'], service)
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
                    <img id="robotRock" src={qr_static}/>
                </CopyToClipboard>
            </div>
        );
    }

}