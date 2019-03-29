import axios from 'axios';

export function httpPOST(url, data) {
  return axios
  .post(url, data, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });
}

export function httpGET(url) {
  return axios
  .get(url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });
}

export function httpUPDATE(url, data) {
  return axios
  .put(url, data, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });
}

export function httpDELETE(url) {
  return axios
  .delete(url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      //'Authorization': 'Bearer' + ' ' + TOKEN
    }
  });
}
