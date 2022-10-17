import axios from "axios";

export const generateBatch = async () => {
  return new Promise(async (resolve, reject) => {
    axios.post(`/v1/words-batch/generate`).then(
      () => resolve(null),
      err => reject(err)
    )
  })
}

export const getBatch = async () => {
  return new Promise(async (resolve, reject) => {
    axios.get(`/v1/words-batch`).then(
      response => resolve(response.data),
      err => reject(err)
    )
  })
}