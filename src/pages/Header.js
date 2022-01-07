import { Component } from 'react'
import logo from '../assets/logo.svg'
export default class Header extends Component {
    render() {
        return (
            <div className="sp-header">
                <img src={logo} alt="Logo"></img>
                <div className="pl-10">Spacetagram</div>
            </div>
        )
    }
}
