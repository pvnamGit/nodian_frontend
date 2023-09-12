export const treeData = [
  {
    id: '0',
    name: 'Documents',
    data: 'Documents Folder',
    icon: 'pi pi-fw pi-inbox',
    isFolder: true,
    children: [
      {
        id: '0-0',
        name: 'Work',
        data: 'Work Folder',
        icon: 'pi pi-fw pi-cog',
        isFolder: true,
        children: [
          { id: '0-0-0', name: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
          { id: '0-0-1', name: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' },
        ],
      },
      {
        id: '0-1',
        name: 'Home',
        data: 'Home Folder',
        isFolder: true,
        children: [{ id: '0-1-0', name: 'Invoices.txt', data: 'Invoices for this month' }],
      },
    ],
  },
  {
    id: '1',
    name: 'Events',
    data: 'Events Folder',
    isFolder: true,
    children: [
      { id: '1-0', name: 'Meeting', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
      { id: '1-1', name: 'Product Launch', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch' },
      { id: '1-2', name: 'Report Review', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review' },
    ],
  },
  {
    id: '2',
    name: 'Movies',
    data: 'Movies Folder',
    isFolder: true,
    icon: 'pi pi-fw pi-star-fill',
    children: [
      {
        id: '2-0',
        icon: 'pi pi-fw pi-star-fill',
        name: 'Al Pacino',
        data: 'Pacino Movies',
        isFolder: true,
        children: [
          { id: '2-0-0', name: 'Scarface', icon: 'pi pi-fw pi-video', data: 'Scarface Movie' },
          { id: '2-0-1', name: 'Serpico', icon: 'pi pi-fw pi-video', data: 'Serpico Movie' },
        ],
      },
      {
        id: '2-1',
        name: 'Robert De Niro',
        icon: 'pi pi-fw pi-star-fill',
        isFolder: true,
        data: 'De Niro Movies',
        children: [
          { id: '2-1-0', name: 'Goodfellas', icon: 'pi pi-fw pi-video', data: 'Goodfellas Movie' },
          { id: '2-1-1', name: 'Untouchables', icon: 'pi pi-fw pi-video', data: 'Untouchables Movie' },
        ],
      },
    ],
  },
];

export const mockPaths = [
  { id: 1, path: 'document/file_1.md' },
  { id: 2, path: 'document/folder_1/file_1.md' },
  { id: 3, path: 'document/file_2.md' },
  { id: 4, path: 'movies/folder_1/name_1.md' },
  { id: 5, path: 'movies/folder_1/name_2.md' },
  { id: 6, path: 'movies/folder_2/name_1.md' },
  { id: 7, path: 'name_1.md' },
  { id: 8, path: 'movies' },
];
