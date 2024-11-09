import type { MenuList } from '@/interface/layout/menu.interface';

import { intercepter, mock } from '../config';

const mockMenuList: MenuList = [
  {
    code: 'dashboard',
    label: {
      zh_CN: '首页',
      en_US: 'Dashboard',
    },
    icon: 'dashboard',
    path: '/dashboard',
  },
  {
    code: 'documentation',
    label: {
      zh_CN: '文档',
      en_US: 'Test Management',
    },
    icon: 'documentation',
    path: '/documentation',
  },
  {
    code: 'question',
    label: {
      zh_CN: '文档',
      en_US: 'Question Management',
    },
    icon: 'documentation',
    path: '/question',
  },
  {
    code: 'result',
    label: {
      zh_CN: '文档',
      en_US: 'Result Management',
    },
    icon: 'documentation',
    path: '/result',
  },
  {
    code: 'guide',
    label: {
      zh_CN: '引导',
      en_US: 'Account Management',
    },
    icon: 'guide',
    path: '/guide',
  },
  {
    code: 'Taketest',
    label: {
      zh_CN: '引导',
      en_US: 'My Test',
    },
    icon: 'guide',
    path: '/Taketest',
  },
  
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
