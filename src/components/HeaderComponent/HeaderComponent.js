import {  Col } from 'antd'
import React, { useState } from 'react'
import { WrapperHeader, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
  const navigate = useNavigate()
  const [isSelect, setIsSelect] = useState(1);

  const handleNavigate = (text) => {
    navigate(`${text}`);
  }

  return (
    <div style={{ heiht: '100%', width: '100%', display: 'flex', background: '#4DA6FF', justifyContent: 'center' }}>
      <WrapperHeader>
        <Col
          onClick={() => {
            handleNavigate('/')
            setIsSelect(1)
          }}
          span={4}>
          <WrapperTextHeader >Lê Tấn Khang</WrapperTextHeader> <br />
          <WrapperTextHeaderSmall >khang1512.it2001@gmail.com</WrapperTextHeaderSmall>
        </Col>
        <Col onClick={() => {
          setIsSelect(1)
          handleNavigate('/')
        }}
          span={2} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
          {isSelect === 1 ? (
            <WrapperTextHeader style={{ color: 'red' }}>
              Test
            </WrapperTextHeader>
          ) : (
            <WrapperTextHeader>
              Test
            </WrapperTextHeader>
          )}

        </Col>
        <Col onClick={() => {
          handleNavigate('/todo')
          setIsSelect(2)
        }} span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
          {isSelect === 2 ? (
            <WrapperTextHeader style={{ color: 'red' }}>
              Todo
            </WrapperTextHeader>
          ) : (
            <WrapperTextHeader>
              Todo
            </WrapperTextHeader>
          )}

        </Col>

      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent