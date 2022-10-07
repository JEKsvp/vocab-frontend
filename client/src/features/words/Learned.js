import React, {useEffect, useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
import {WordAccordion} from "../../utils/components/WordAccordion";
import {WordsLoader} from "../../utils/components/WordsLoader";
import {removeWord, getAll, moveToToLearn} from "../../api/wordsAPI";
import {HomeButton} from "../../utils/components/HomeButton";
import {NewWordButton} from "../../utils/components/NewWordButton";

export const Learned = () => {
  const [words, setWords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    (async () => {
      await fetchWords();
    })();
  }, [])

  async function fetchWords() {
    try {
      const result = await getAll("LEARNED");
      setWords(result.data)
      setIsLoading(false)
    } catch (ex) {
      console.error(ex)
    }
  }

  function onMoveToLearned(wordId) {
    moveToToLearn(wordId)
      .then(async () => await fetchWords())
      .catch(ex => console.error(ex));
  }

  function onRemoveWord(wordId) {
    removeWord(wordId)
      .then(async () => await fetchWords())
      .catch(ex => console.error(ex));
  }

  let wordsRendered
  if (isLoading) {
    wordsRendered = <WordsLoader/>
  } else {
    wordsRendered = words.map(word =>
      <Grid container key={word.id}>
        <Grid item xs={12}>
          <WordAccordion word={word}
                         onMoveWordClick={() => onMoveToLearned(word.id)}
                         onRemoveClick={() => onRemoveWord(word.id)}
          />
        </Grid>
      </Grid>
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
      <HomeButton/>
      <NewWordButton/>
    </Box>
  )
}