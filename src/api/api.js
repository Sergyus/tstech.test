import axios from 'axios'

export default {
  /**
   * Get Data
   * @param cb
   */
  getData (cb) {
    axios.get('../../static/mock.json')
      .then(response => cb(response.data))
      .catch(e => cb(e))
  },
  /**
   * Send Param
   * @param data
   */
  sendData (cb, data) {
    axios.post('some/url', data)
      .then(response => cb(response.data))
      .catch(e => cb(e))
  }
}
