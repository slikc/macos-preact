import { createAppConfig } from '__/helpers/create-app-config';

export const messagesAppConfig = createAppConfig({
  title: 'Messages',
  resizable: true,
  width: 800,
  height: 600,
  shouldOpenWindow: true,
});
