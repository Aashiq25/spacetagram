import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { DateRangePicker } from 'rsuite'
import eventBus from '../helpers/eventBus'
const SpHeader = () => {
    const [dateRange, setDateRange] = useState([
        new Date(new Date().setDate(new Date().getDate() - 5)),
        new Date(),
    ])
    const updateDate = (newValue) => {
        eventBus.dispatch('dateRangeChange', { dateRange: newValue })
        setDateRange(newValue)
    }
    const { allowedMaxDays, afterToday, combine } = DateRangePicker
    return (
        <div className="sp-header">
            <div className="sp-head-flex">
                <Link to="/">
                    <div className="d-flex align-center justify-content-center">
                        <img src={logo} alt="Logo" className="img-logo"></img>
                        <div className="pl-10 title-text">Spacetagram</div>
                    </div>
                </Link>
                {useLocation().pathname === '/' && (
                    <div>
                        <DateRangePicker
                            value={dateRange}
                            onChange={(newValue) => {
                                updateDate(newValue)
                            }}
                            appearance={'subtle'}
                            placement={'bottom'}
                            format={'yyyy-MM-dd'}
                            disabledDate={combine(
                                afterToday(),
                                allowedMaxDays(30)
                            )}
                        />
                    </div>
                )}
                <div>
                    <Link
                        to="/liked-posts"
                        className={`sec-heading ${
                            useLocation().pathname === '/liked-posts'
                                ? 'current'
                                : ''
                        }`}
                    >
                        Liked Posts
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default SpHeader
