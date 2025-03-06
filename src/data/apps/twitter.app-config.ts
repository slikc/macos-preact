import { createAppConfig } from '__/helpers/create-app-config';

export const blankAppConfig = createAppConfig({
  title: `Blank`,
  resizable: true,

  shouldOpenWindow: false,
  externalAction: () => window.open('https://google.com', '_blank'),

  dockBreaksBefore: true,
});
