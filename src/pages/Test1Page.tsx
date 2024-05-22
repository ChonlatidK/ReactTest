import { Button, Col, ConfigProvider, Grid, Row } from 'antd'
import { DesignTokenProviderProps } from 'antd/es/theme/context'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { colors } from '../component/colors'

export default function Test1Page() {
    const { t } = useTranslation()
    type renderItemType = {
        order: any

    }

    const [orders, setOrders] = useState([
        { classNames: "square" },
        { classNames: "circle" },
        { classNames: "circle2" },
        { classNames: "pig" },
        { classNames: "reactant" },
        { classNames: "reactant2" },
    ])

    const [isRevers, setIsRevers] = useState(false) 
    const RenderItem = ({ order }: renderItemType) => {
        return (
            <div className='items_container'>
                <ConfigProvider theme={{
                    components: {
                        Button: {
                            defaultActiveBg: colors.primary,
                            defaultHoverBg: colors.secondly,
                            borderColorDisabled: "true",
                            colorPrimary: "#FFFFFF"
                        },
                    }
                }}>
                    <Row wrap={true} gutter={[4, 4]} style={{flexDirection:isRevers? 'row-reverse':'row'}}>
                        <Col offset={6}></Col>
                        {order.map((items: any, index: number) => (
                            <Col key={index}>
                                <Button className='test1_button_icon' onClick={randomArray}>
                                    <span className={items.classNames} />
                                </Button>
                            </Col>
                        ))}
                    </Row>
                </ConfigProvider>
            </div>


        )
    }


    
    const moveNext = () => {
        setOrders((prevPositions) => {
            const newPosition = [...prevPositions]
            const lastPosition: any = newPosition.pop()
            newPosition.unshift(lastPosition);
            return newPosition;
        });
    };

    const moveBack = () => {
        setOrders((prevPositions) => {
            const newPosition = [...prevPositions];
            const firstPosition: any = newPosition.shift();
            newPosition.push(firstPosition);
            return newPosition;
        });
    };

    const randomArray = () => {
        setOrders((prevPositions) => {
            const newPosition = [...prevPositions];
            for (let i = newPosition.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = newPosition[i];
                newPosition[i] = newPosition[j];
                newPosition[j] = temp;
            }
            return newPosition;
        });
    }
    const changeDirectionToggle = ()=>{
        setIsRevers(!isRevers)
    }

    return (
        <div className='test1_container'>
            <div className='test1_button_table'>
                <ConfigProvider theme={{
                    components: {
                        Button: {
                            defaultActiveBg: colors.primary,
                            defaultHoverBg: colors.secondly,
                            lineWidth: 0
                        }
                    }
                }}>
                    <Button className='test1_button' onClick={moveBack}>
                        <span className='triangle left' />
                        <article className='sub_title'>
                            <a className='text_sub_title'>{t('move_shape')}</a>
                        </article>
                    </Button>
                    <Button className='test1_button ' onClick={changeDirectionToggle}>
                        <div className='center_button'>
                            <span className='triangle' />
                            <span className='triangle down' />
                        </div>
                        <article className='sub_title'>
                            <a className='text_sub_title'>{t('move_position')}</a>
                        </article>
                    </Button>
                    <Button className='test1_button' onClick={() => moveNext()}>
                        <span className='triangle right' />
                        <article className='sub_title'>
                            <a className='text_sub_title'>{t('move_shape')}</a>
                        </article>
                    </Button>
                </ConfigProvider>
            </div>
            <RenderItem order={orders} />
            
        </div>
    )
}


