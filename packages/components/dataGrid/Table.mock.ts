import { stringify } from 'qs';
import axios from 'axios';

import { DataGridRequestParams } from './types';
export type ExampleType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

const apiUrl = 'http://localhost:1337/api/example/users';

export const getDataMock = async (params: DataGridRequestParams) => {
  const queryParams = stringify(params, { addQueryPrefix: true });
  const { data: response } = await axios.get(`${apiUrl}${queryParams}`);
  return response;
};
