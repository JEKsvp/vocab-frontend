import React from "react";
import {Box, Grid} from "@mui/material";
import {WordAccordion} from "../../utils/components/WordAccordion";

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

export const ToLearn = () => {
  const wordsRendered = words.map(word =>
    <WordAccordion key={word.id} word={word}/>
  )


  return (
    <Box>
      <Grid container>
        {wordsRendered}
      </Grid>
    </Box>
  )
}