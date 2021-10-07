import { createSlice } from '@reduxjs/toolkit';

import api from '../api';
import desc from '../api/descriptors';
import { actSetLoading, actUnsetLoading } from './ui';

const namespace = 'invoice';

export const key = {
  getInvoiceDetail: ({ invoiceId }) => `getInvoiceDetail${invoiceId}`,
  getInvoices: 'getInvoices',
};

const initialState = {
  filter: [],
  invoices: [],
  invoiceDetail: {},
  invoiceItems: [],
};

export const invoiceSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    actDeleteInvoice: (state, { payload }) => {
      const { invoiceId } = payload;
      state.invoices = state.invoices.filter((i) => i.invoiceId !== invoiceId);
    },
    actSetFilter: (state, { payload }) => {
      if (!state.filter.includes(payload)) {
        state.filter = [...state.filter, payload];
      }
    },
    actSetInvoiceDetail: (state, { payload }) => {
      const { invoiceId } = payload;
      state.invoiceDetail[invoiceId] = payload;
    },
    actSetInvoiceItems: (state, { payload }) => { state.invoiceItems = payload; },
    actSetInvoices: (state, { payload }) => {
      const data = Array.isArray(payload) ? payload : [payload, ...state.invoices];
      state.invoices = data;
    },
    actUnsetFilter: (state, { payload }) => {
      state.filter = state.filter.filter((i) => i !== payload);
    },
    actUpdateInvoice: (state, { payload }) => {
      const { invoiceId, data } = payload;
      state.invoiceDetail[invoiceId] = data;
      state.invoices = state.invoices.map((invoice) => (
        invoice.invoiceId === invoiceId ? data : invoice));
    },
    actUpdateStatus: (state, { payload }) => {
      const { invoiceId, status } = payload;
      state.invoiceDetail[invoiceId] = { ...state.invoiceDetail[invoiceId], status };
      state.invoices = state.invoices.map((invoice) => (
        invoice.invoiceId === invoiceId ? { ...invoice, status } : invoice));
    },
  },
});

export const {
  actDeleteInvoice,
  actSetFilter,
  actSetInvoiceDetail,
  actSetInvoiceItems,
  actSetInvoices,
  actUnsetFilter,
  actUpdateInvoice,
  actUpdateStatus,
} = invoiceSlice.actions;

//
// Selectors
//
export const selectFilter = (state) => state.invoice.filter;

export const selectInvoiceDetail = (state, invoiceId) => (
  state.invoice.invoiceDetail[invoiceId]);

export const selectInvoiceItems = (state) => state.invoice.invoiceItems;

export const selectInvoices = (state) => state.invoice.invoices;

//
// Side effects
//
export const deleteInvoice = ({ invoiceId }) => async (dispatch) => {
  try {
    await api(desc.invoicesDeleteInvoice({ invoiceId }));
    dispatch(actDeleteInvoice({ invoiceId }));
  } catch (error) {
    console.error(error);
  }
};

export const getInvoiceDetail = ({ invoiceId }) => async (dispatch) => {
  try {
    dispatch(actSetLoading({
      key: key.getInvoiceDetail({ invoiceId }),
      namespace,
    }));
    const data = await api(desc.invoicesGetInvoiceDetail({ invoiceId }));
    dispatch(actSetInvoiceDetail(data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(actUnsetLoading({
      key: key.getInvoiceDetail({ invoiceId }),
      namespace,
    }));
  }
};

export const getInvoices = (args = {}) => async (dispatch) => {
  const { params } = args;
  try {
    dispatch(actSetLoading({ key: key.getInvoices, namespace }));
    const data = await api(desc.invoicesGetInvoices({ params }));
    dispatch(actSetInvoices(data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(actUnsetLoading({ key: key.getInvoices, namespace }));
  }
};

export const patchInvoice = ({ invoiceId, data }) => async (dispatch) => {
  const response = await api(desc.invoicesPatchInvoice({ invoiceId, data }));
  dispatch(actUpdateInvoice({ invoiceId, data: response }));
};

export const patchStatus = ({ invoiceId, status }) => async (dispatch) => {
  try {
    await api(desc.invoicesPatchStatus({ invoiceId, data: { status } }));
    dispatch(actUpdateStatus({ invoiceId, status }));
  } catch (error) {
    console.error(error);
  }
};

export const postCreateDraft = ({ data }) => async (dispatch) => {
  const response = await api(desc.invoicesPostCreateDraft({ data }));
  dispatch(actSetInvoices(response));
};

export const postCreateInvoice = ({ data }) => async (dispatch) => {
  const response = await api(desc.invoicesPostCreateInvoice({ data }));
  dispatch(actSetInvoices(response));
};

export default invoiceSlice.reducer;
