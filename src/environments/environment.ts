// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  title: 'List of Custom ROMs for Alioth',
  projectURL: 'https://github.com/desperateCoder/alioth',
  contributionURL: 'https://github.com/desperateCoder/alioth',
  issueUrl: 'https://github.com/desperateCoder/alioth/issues/new?assignees=&labels=proposal&template=proposal.md',
  note: 'Please note that hentaiOS is not compatible with any of the listed kernels.',
  additionalLinks: [
    {
      name: 'POCO F3/K40/Mi 11x | OFFICIAL on Telegram',
      url: 'https://t.me/PocoF3GlobalOfficial'
    },
    {
      name: 'Poco F3/Mi 11X/K40 Updates™ on Telegram',
      url: 'https://t.me/pocoF3GlobalUpdates'
    }
  ],
  maintainer: [
    {
      name: '@krakeen06',
      url: 'https://t.me/PocoF3GlobalOfficial'
    },
    {
      name: '@desperateCoder',
      url: 'https://github.com/desperateCoder'
    }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
