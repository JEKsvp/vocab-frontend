import axios from 'axios'

export const getAll = async (status) => {
  return new Promise(async (resolve, reject) => {
    axios.get(`/v1/words`, {params: {status: status}}).then(
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

export const removeWord = (wordId) => {
  return new Promise(async (resolve, reject) => {
    axios.delete(`/v1/words/${wordId}`).then(
      () => resolve(),
      err => reject(err)
    )
  })
}

export const moveToLearned = async (wordId) => {
  const requestBody = {
    id: wordId,
    status: "LEARNED"
  }
  return new Promise(async (resolve, reject) => {
    axios.patch("/v1/words/status", requestBody).then(
      response => resolve(response.data),
      err => reject(err)
    )
  })
}

export const moveToToLearn = async (wordId) => {
  const requestBody = {
    id: wordId,
    status: "TO_LEARN"
  }
  return new Promise(async (resolve, reject) => {
    axios.patch("/v1/words/status", requestBody).then(
      response => resolve(response.data),
      err => reject(err)
    )
  })
}