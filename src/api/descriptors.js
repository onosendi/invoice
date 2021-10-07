import buildUrl from '../utils/buildUrl';

export default {
  demoPostDemo: () => ({
    method: 'post',
    url: '/api/demo',
  }),
  invoicesDeleteInvoice: ({ invoiceId }) => ({
    method: 'delete',
    url: `/api/invoices/${invoiceId}`,
  }),
  invoicesGetInvoiceDetail: ({ invoiceId }) => ({
    method: 'get',
    url: `/api/invoices/${invoiceId}`,
  }),
  invoicesGetInvoices: ({ params }) => ({
    method: 'get',
    url: buildUrl({ url: '/api/invoices', params }),
  }),
  invoicesPatchInvoice: ({ invoiceId, data }) => ({
    data,
    method: 'patch',
    url: `/api/invoices/${invoiceId}`,
  }),
  invoicesPatchStatus: ({ invoiceId, data }) => ({
    data,
    method: 'patch',
    url: `/api/invoices/${invoiceId}/status`,
  }),
  invoicesPostCreateDraft: ({ data }) => ({
    data,
    method: 'post',
    url: '/api/invoices/draft',
  }),
  invoicesPostCreateInvoice: ({ data }) => ({
    data,
    method: 'post',
    url: '/api/invoices',
  }),
  usersGetUser: () => ({
    method: 'get',
    url: '/api/users/user',
  }),
  usersPostLogin: ({ username, password }) => ({
    method: 'post',
    url: '/api/users/login',
    data: { username, password },
  }),
  usersPostLogout: () => ({
    method: 'post',
    url: '/api/users/logout',
  }),
  usersPostRegister: ({ username, password, passwordConfirm }) => ({
    data: { username, password, passwordConfirm },
    method: 'post',
    url: '/api/users/register',
  }),
  usersPatchTheme: ({ theme }) => ({
    method: 'patch',
    url: '/api/users/settings/theme',
    data: { theme },
  }),
};
