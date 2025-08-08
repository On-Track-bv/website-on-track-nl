export function getRoleGroup(roleKey: string | undefined): 'basic' | 'bim' | 'data' {
  if (!roleKey) return 'basic';
  if ([
    'kringverjaardag',
    'directie',
    'opdrachtgever',
  ].includes(roleKey)) return 'basic';
  if ([
    'bouwinfra',
    'bimconsultant',
    'bimmanager',
    'overheid',
  ].includes(roleKey)) return 'bim';
  if ([
    'linkeddata',
    'developer',
  ].includes(roleKey)) return 'data';
  return 'basic';
}
