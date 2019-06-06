// This file is created by egg-ts-helper@1.25.3
// Do not modify this file!!!!!!!!!

import 'beidou';
import ExportHome from '../../../app/controller/home';

declare module 'beidou' {
  interface IController {
    home: ExportHome;
  }
}
