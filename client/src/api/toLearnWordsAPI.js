const words = [{
  id: "gsdgsdfg",
  title: 'glow',
  transcription: 'ɡləʊ',
  part: 'verb',
  definitions: [
    {
      definition: '(especially of something hot or warm) to produce a steady light that is not very bright',
      examples: [
        'The embers still glowed in the hearth.',
        'The lighted candles glowed in the darkness.',
        'The strap has a fluorescent coating that glows in the dark.',
        'A cigarette end glowed red in the darkness.'
      ]
    },
    {
      definition: '(especially of something hot or warm) to produce a steady light that is not very bright',
      examples: [
        'The embers still glowed in the hearth.',
        'The lighted candles glowed in the darkness.',
        'The strap has a fluorescent coating that glows in the dark.',
        'A cigarette end glowed red in the darkness.'
      ]
    },
    {
      definition: '(especially of something hot or warm) to produce a steady light that is not very bright',
      examples: [
        'The embers still glowed in the hearth.',
        'The lighted candles glowed in the darkness.',
        'The strap has a fluorescent coating that glows in the dark.',
        'A cigarette end glowed red in the darkness.'
      ]
    }
  ]
},
  {
    id: "sgfdsgdsg",
    title: 'genuflect',
    transcription: 'ˈdʒɛnjʊflɛkt',
    part: 'verb',
    definitions: [
      {
        definition: 'to move your body into a lower position by bending one or both knees, as a sign of respect in a church',
        examples: [
          'You must genuflect before my power.',
          'Her  party still genuflects to her, and a core within it reflexively venerates her.',
        ]
      }
    ]
  }
]

export const getAll = async () => {
  console.log('getAll executed')
  return new Promise(
    resolve => setTimeout(() => resolve(words), 1000)
  );
}

export const moveToLearned = async (wordId) => {
  return new Promise(
    resolve => setTimeout(() => {
      console.log(`move word to LEARNED ${wordId}`)
      resolve()
    }, 1000)
  )
}

export const saveWord = (word) =>{
  return new Promise(
    resolve => setTimeout(() => {
      console.log(`saved new word`)
      console.log(word)
      resolve()
    }, 1000)
  )
}