// @flow

import { Observable } from 'rxjs';
import mock from './mock';

// Return mock data at the moment
export default Observable.of(mock).delay(1000);
