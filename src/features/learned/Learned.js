import React, {useEffect, useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
import {WordAccordion} from "../../utils/components/WordAccordion";
import {getAll, moveToToLearn} from "../../api/learnedWordsAPI";
import {WordsLoader} from "../../utils/components/WordsLoader";

export const Learned = () => {
  const [words, setWords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getAll()
      .then(result => {
        setWords(result)
        setIsLoading(false)
      })
      .catch(e => console.error(e))
  })

  let wordsRendered
  if (isLoading) {
    console.log("skeleton")
    wordsRendered = <WordsLoader/>
  } else {
    wordsRendered = words.map(word =>
      <WordAccordion key={word.id}
                     word={word}
                     onMoveWordClick={() => moveToToLearn(word.id)}
      />
    )
  }

  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item>
          <Typography variant="h4">Learned</Typography>
        </Grid>
      </Grid>
      <Grid container>
        {wordsRendered}
      </Grid>
    </Box>
  )
}