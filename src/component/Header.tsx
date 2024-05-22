import React, { useState, useTransition } from 'react'
import '../css/style.css'
import { Button, Dropdown, MenuProps, Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { pageName } from './PageName'
import { useLocation } from 'react-router-dom'
const Header = () => {

    const [currentLangues, setCurrentLangues] = useState('EN')
    const { i18n } = useTranslation();
    const location = useLocation()
    const currentPage = getPageName(location.pathname)

    function getPageName(name: string) {
        switch (name) {
            case pageName.test1:
                return i18n.t('label_1')

            case pageName.test2:
                return i18n.t('label_2')
        }
    }
    const items: MenuProps['items'] = [
        {
            key: 'en',
            label: "EN",

        },
        {
            key: 'th',
            label: 'TH'
        },

    ];
    const onClick: MenuProps['onClick'] = ({ key }) => {
        setCurrentLangues(key === "en" ? "EN" : "TH")
        i18n.changeLanguage(key)
    }

    return (
        <div className='container'>
            <a>{currentPage}</a>
            <Dropdown
                menu={{
                    items,
                    selectable: true,
                    defaultSelectedKeys: ['en'],
                    onClick,
                    defaultValue: ['EN']
                }}
                placement='bottomRight'
                trigger={['click']}>
                <Button>
                    {currentLangues}
                </Button>
            </Dropdown>
        </div>
    )
}
export default Header
