import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppstoreOutlined, CheckCircleTwoTone , SettingOutlined, ClockCircleTwoTone, FundTwoTone, UpCircleTwoTone, BorderInnerOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';


const items: MenuProps['items'] = [
{
    label: 'Home',
    key: 'home',
    icon: <CheckCircleTwoTone />
},
{
    label: 'Navigation Two',
    key: 'app',
    icon: <AppstoreOutlined />,
    disabled: true,
},
{
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
    {
        type: 'group',
        label: 'Item 1',
        children: [
        {
            label: 'Option 1',
            key: 'setting:1',
        },
        {
            label: 'Option 2',
            key: 'setting:2',
        },
        ],
    },
    {
        type: 'group',
        label: 'Item 2',
        children: [
        {
            label: 'Option 3',
            key: 'setting:3',
        },
        {
            label: 'Option 4',
            key: 'setting:4',
        },
        ],
    },
    ],
},
{
    label: (
    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
    </a>
    ),
    key: 'alipay',
},
];

export default function NavLink(){
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key=' entrada'>
            <Link to='/entrada'>
            <CheckCircleTwoTone />  Tarefas
            </Link>
        </Menu.Item>
        <Menu.Item key='sinal'>
            <Link to="/Sinal">
            <FundTwoTone />  Sinal
            </Link>
            </Menu.Item>
        <Menu.Item key=' cronometro'>
            <Link to='/ Cronometro'>
                <ClockCircleTwoTone />  Cronometro
            </Link>
        </Menu.Item>
        <Menu.Item key='Upgrades'>
            <Link to='/Upgrades'>
                <UpCircleTwoTone />  Upgrades
            </Link>
        </Menu.Item>
        <Menu.Item key='Matriz'>
            <Link to='/Matriz'>
            <BorderInnerOutlined />  Matriz
            </Link>
        </Menu.Item>
    </Menu>
  )  
} 



