import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'

import { useNavigate } from 'react-router-dom'
import { pageName } from '../component/PageName'
import { useTranslation } from 'react-i18next'


export default function MainPage() {
    const {t} = useTranslation()
    const navigate = useNavigate()
    function gotoPage(pageName:string){
        navigate(pageName)
    }
  return (
    <div className='body_container'>
        <Card bordered={false}  hoverable style={{width:300}} onClick={()=>gotoPage(pageName.test1)}>
            <Meta title={t('topic_1')} style={{height:80}}/>
            {t('label_1')}
        </Card>
        <Card bordered={false}  hoverable style={{width:300}} onClick={()=>gotoPage(pageName.test2)}>
            <Meta title={t('topic_2')} style={{height:80}}/>
            {t('label_2')}
        </Card>
    </div>
  )
}
