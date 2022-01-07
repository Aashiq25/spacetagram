import { Component } from 'react'
import logo from '../assets/logo.svg'
import { DateRangePicker } from 'rsuite'
import eventBus from '../helpers/eventBus'
export default class Header extends Component {
    state = {
        dateRange: [
            new Date(new Date().setDate(new Date().getDate() - 6)),
            new Date(),
        ],
    }
    updateDate(newValue) {
        eventBus.dispatch('dateRangeChange', { dateRange: newValue })
        this.setState({ dateRange: newValue })
    }
    render() {
        const { allowedMaxDays, afterToday, combine } = DateRangePicker
        const dateRange = this.state.dateRange
        return (
            <div className="sp-header">
                <div className="sp-head-flex">
                    <div className="d-flex align-center justify-content-center">
                        <img src={logo} alt="Logo" className="img-logo"></img>
                        <div className="pl-10">Spacetagram</div>
                    </div>
                    <div>
                        <DateRangePicker
                            value={dateRange}
                            onChange={(newValue) => {
                                this.updateDate(newValue)
                            }}
                            appearance={'subtle'}
                            placement={'leftStart'}
                            format={'yyyy-MM-dd'}
                            disabledDate={combine(
                                afterToday(),
                                allowedMaxDays(7)
                            )}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
