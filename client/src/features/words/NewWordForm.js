import React, {useState} from 'react'
import {saveWord} from "../../api/wordsAPI";
import {useNavigate} from "react-router-dom";
import {WordForm} from "./WordForm";

const blankWord = {
  id: '',
  title: '',
  transcription: '',
  part: '',
  status: 'TO_LEARN'
}

const blankDefinitions = [
  {
    definition: '',
    examples: ['']
  }
]

export const NewWordForm = () => {
  const [isSaving, setIsSaving] = useState(false);
  let navigate = useNavigate();

  function onSave(word, definitions) {
    setIsSaving(true)
    const newWord = {
      ...word,
      definitions: [...definitions]
    }
    saveWord(newWord)
      .then(() => {
        navigate('/to-learn')
      })
  }

  return (
    <WordForm
      initWord={blankWord}
      initDefinitions={blankDefinitions}
      isSaving={isSaving}
      onSave={onSave}
    />
  )
}