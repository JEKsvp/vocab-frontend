import axios from 'axios'

export const getAllWords = async (status, page, size) => {
  return new Promise(async (resolve, reject) => {
    axios.get(`/v1/words`, {params: {status: status, page: page, size: size}}).then(
      response => resolve(response.data),
      err => reject(err)
    )
  })
}

export const getWordById = async (wordId) => {
  return new Promise(async (resolve, reject) => {
    axios.get(`/v1/words/${wordId}`).then(
      response => resolve(response.data),
      err => reject(err)
    )
  })
}

export const saveWord = (word) => {
  return new Promise(async (resolve, reject) => {
      axios.post('/v1/words', word).then(
        response => resolve(response.data),
        err => reject(err)
      )
    }
  )
}

export const updateWord = (word) => {
  return new Promise(async (resolve, reject) => {
      axios.put('/v1/words', word).then(
        response => resolve(response.data),
        err => reject(err)
      )
    }
  )
}

export const removeWord = (wordId) => {
  return new Promise(async (resolve, reject) => {
    axios.delete(`/v1/words/${wordId}`).then(
      () => resolve(),
      err => reject(err)
    )
  })
}

export const changeStatus = async (wordId, status) => {
  const requestBody = {
    id: wordId,
    status: status
  }
  return new Promise(async (resolve, reject) => {
    axios.patch("/v1/words/status", requestBody).then(
      response => resolve(response.data),
      err => reject(err)
    )
  })
}