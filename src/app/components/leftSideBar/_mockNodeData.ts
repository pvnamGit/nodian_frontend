export const treeData = [
  {
    key: '0',
    label: 'Documents',
    data: 'Documents Folder',
    icon: 'pi pi-fw pi-inbox',
    type: 'folder',
    children: [
      {
        key: '0-0',
        label: 'Work',
        data: 'Work Folder',
        icon: 'pi pi-fw pi-cog',
        type: 'folder',
        children: [
          { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document', type: 'note' },
          { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document', type: 'note' },
        ],
      },
      {
        key: '0-1',
        label: 'Home',
        data: 'Home Folder',
        type: 'folder',
        icon: 'pi pi-fw pi-home',
        children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month', type: 'note' }],
      },
    ],
  },
  {
    key: '1',
    label: 'Events',
    data: 'Events Folder',
    type: 'folder',
    icon: 'pi pi-fw pi-calendar',
    children: [
      { key: '1-0', label: 'Meeting', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting', type: 'note' },
      { key: '1-1', label: 'Product Launch', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch', type: 'note' },
      { key: '1-2', label: 'Report Review', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review', type: 'note' },
    ],
  },
  {
    key: '2',
    label: 'Movies',
    data: 'Movies Folder',
    type: 'folder',
    icon: 'pi pi-fw pi-star-fill',
    children: [
      {
        key: '2-0',
        icon: 'pi pi-fw pi-star-fill',
        label: 'Al Pacino',
        data: 'Pacino Movies',
        type: 'folder',
        children: [
          { key: '2-0-0', label: 'Scarface', icon: 'pi pi-fw pi-video', data: 'Scarface Movie', type: 'note' },
          { key: '2-0-1', label: 'Serpico', icon: 'pi pi-fw pi-video', data: 'Serpico Movie', type: 'note' },
        ],
      },
      {
        key: '2-1',
        label: 'Robert De Niro',
        icon: 'pi pi-fw pi-star-fill',
        type: 'folder',
        data: 'De Niro Movies',
        children: [
          { key: '2-1-0', label: 'Goodfellas', icon: 'pi pi-fw pi-video', data: 'Goodfellas Movie', type: 'note' },
          { key: '2-1-1', label: 'Untouchables', icon: 'pi pi-fw pi-video', data: 'Untouchables Movie', type: 'note' },
        ],
      },
    ],
  },
];
