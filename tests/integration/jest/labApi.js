/**
* First pass at integrations tests that run against the lab container api through an external context
*
*/

import { get } from './util/apiHelper';

export const fetchDatasets = () => get('api/userdatasets');