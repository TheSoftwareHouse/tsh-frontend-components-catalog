import { rest } from 'msw';
import { parse, stringify } from 'qs';
import axios from 'axios';
export type ExampleType = {
  date: string;
  id: string;
  email: string;
  amount: string;
  status: 'success' | 'error';
};
export const exampleData: ExampleType[] = [
  {
    date: '2023-08-25',
    id: '1001',
    email: 'user1@example.com',
    amount: '50.00',
    status: 'success',
  },
  {
    date: '2023-08-24',
    id: '1002',
    email: 'user2@example.com',
    amount: '75.00',
    status: 'error',
  },
  {
    date: '2023-08-23',
    id: '1003',
    email: 'user3@example.com',
    amount: '100.00',
    status: 'success',
  },
  {
    date: '2023-08-22',
    id: '1004',
    email: 'user4@example.com',
    amount: '30.00',
    status: 'error',
  },
  {
    date: '2023-08-21',
    id: '1005',
    email: 'user5@example.com',
    amount: '60.00',
    status: 'success',
  },
  {
    date: '2023-08-20',
    id: '1006',
    email: 'user6@example.com',
    amount: '90.00',
    status: 'success',
  },
  {
    date: '2023-08-19',
    id: '1007',
    email: 'user7@example.com',
    amount: '120.00',
    status: 'error',
  },
  {
    date: '2023-08-18',
    id: '1008',
    email: 'user8@example.com',
    amount: '25.00',
    status: 'success',
  },
  {
    date: '2023-08-17',
    id: '1009',
    email: 'user9@example.com',
    amount: '70.00',
    status: 'error',
  },
  {
    date: '2023-08-16',
    id: '1010',
    email: 'user10@example.com',
    amount: '110.00',
    status: 'success',
  },
  {
    date: '2023-08-15',
    id: '1011',
    email: 'user11@example.com',
    amount: '40.00',
    status: 'success',
  },
  {
    date: '2023-08-14',
    id: '1012',
    email: 'user12@example.com',
    amount: '80.00',
    status: 'error',
  },
  {
    date: '2023-08-13',
    id: '1013',
    email: 'user13@example.com',
    amount: '95.00',
    status: 'success',
  },
  {
    date: '2023-08-12',
    id: '1014',
    email: 'user14@example.com',
    amount: '55.00',
    status: 'error',
  },
  {
    date: '2023-08-11',
    id: '1015',
    email: 'user15@example.com',
    amount: '65.00',
    status: 'success',
  },
];
const mockedApiBaseUrl = 'https://table-api.com/api';
export const getDataMockHandler = rest.get(`${mockedApiBaseUrl}`, (req, res, ctx) => {
  const params = parse(req.url.searchParams.toString());
  const { page, size } = params;
  const total = exampleData.length;
  const sizeNumber = Number(size);
  const pageNumber = Number(page);
  const totalPages = Math.ceil(total / sizeNumber);
  const pages = exampleData.reduce<ExampleType[][]>((accumulator, value, index) => {
    const entryIndex = Math.floor(index / sizeNumber);
    const page = accumulator[entryIndex] || (accumulator[entryIndex] = []);
    page.push(value);
    return accumulator;
  }, []);
  return res(
    ctx.json({
      page: pages[pageNumber],
      meta: {
        page: pageNumber,
        size: sizeNumber,
        total,
        totalPages,
      },
    }),
  );
});
interface GetDataMockArguments {
  page: number;
  size: number;
}
export const getDataMock = async ({ page, size }: GetDataMockArguments) => {
  const queryParams = stringify({ page, size }, { addQueryPrefix: true });
  const { data: response } = await axios.get(`${mockedApiBaseUrl}${queryParams}`);
  return response;
};
