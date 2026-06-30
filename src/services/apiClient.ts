/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import axios from 'axios';

// Create a shared Axios instance
const apiClient = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configure Axios Interceptors to inject Enterprise Tenant, Company, and User headers
apiClient.interceptors.request.use(
  (config) => {
    // In a real production deployment, these headers are retrieved from session context or auth state.
    // The shared client attaches them automatically for all requests, avoiding leakage into forms or client pages.
    config.headers['X-Tenant-Id'] = 'tenant-ethio-1092';
    config.headers['X-Company-Id'] = 'company-hisab-882';
    config.headers['X-User-Id'] = 'user-accountant-001';
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
