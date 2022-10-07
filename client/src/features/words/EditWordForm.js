import React from 'react'
import {Box} from "@mui/material";
import {useParams} from "react-router-dom";

export const EditWordForm = () => {
  let {wordId} = useParams();
  console.log(wordId)
  return (
    <Box>
      EDIT WORD FORM
    </Box>
  )
}