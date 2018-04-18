import { AppMode } from '../app/shared/shared';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// PRODUCTION BUILD STEPS FOR DEV:
// Map T:\ to \\mlbmblwebd1.cs.myharris.net\e$\netroot\mi-dev\wwwroot
// Run the following ...
// ng build --prod --output-path=T:\TimecardClient --base-href=/TimecardClient/

export const environment = {
  production: false,
  // apiServiceURL: 'https://mi-dev.harris.com/timecard/api/v1/',
  apiServiceURL: 'http://localhost:9572/api/v1/',
  AppMode: AppMode.Dev
};
