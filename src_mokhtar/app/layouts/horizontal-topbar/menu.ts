import {MenuItem} from "./menu.model";


export const MENU: MenuItem[] = [
  /*
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
   */
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'ph-gauge',
    subItems: [
      {
        id: 3,
        label: 'MENUITEMS.DASHBOARD.LIST.ANALYTICS',
        link: '/analytics',
        parentId: 2
      },
      {
        id: 4,
        label: 'MENUITEMS.DASHBOARD.LIST.CRM',
        link: '/crm',
        parentId: 2
      },
      {
        id: 5,
        label: 'MENUITEMS.DASHBOARD.LIST.ECOMMERCE',
        link: '/',
        parentId: 2
      },
      {
        id: 6,
        label: 'MENUITEMS.DASHBOARD.LIST.LEARNING',
        link: '/learning',
        parentId: 2
      },
      {
        id: 7,
        label: 'MENUITEMS.DASHBOARD.LIST.REALESTATE',
        link: '/real-estate',
        parentId: 2
      }
    ]
  },
  {
    id: 8,
    label: 'MENUITEMS.APPS.TEXT',
    isTitle: true
  },
  {
    id: 9,
    label: 'MENUITEMS.APPS.LIST.CALENDAR',
    icon: 'ph-calendar',
    link: '/apps/calendar',
  },
  {
    id: 16,
    label: 'MENUITEMS.APPS.LIST.INVOICES',
    icon: 'ph-file-text',
    subItems: [
      {
        id: 17,
        label: 'MENUITEMS.APPS.LIST.LISTVIEW',
        link: '/invoices/list',
        parentId: 16
      },
      {
        id: 18,
        label: 'MENUITEMS.APPS.LIST.OVERVIEW',
        link: '/invoices/overview',
        parentId: 16
      },
      {
        id: 19,
        label: 'MENUITEMS.APPS.LIST.CREATEINVOICE',
        link: '/invoices/create',
        parentId: 16
      }
    ]
  },
  {
    id: 20,
    label: 'MENUITEMS.APPS.LIST.ARTICLES',
    icon: 'ph-newspaper',
    link: '/article',
  },
  {
    id: 21,
    label: 'AGENTS',
    icon: 'ph-identification-badge',
    link: '/agent',
  }
]
