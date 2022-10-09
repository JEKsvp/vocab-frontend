import React, {useState} from 'react'
import {saveWord} from "../../api/wordsAPI";
import {useNavigate} from "react-router-dom";
import {WordForm} from "./WordForm";

function getBlankWord() {
  return {
    id: '',
    title: '',
    transcription: '',
    part: '',
    status: 'TO_LEARN'
  }
}

function getBlankDefinitions() {
  return [
    {
      definition: '',
      examples: ['']
    }
  ]
}

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
      initWord={getBlankWord()}
      initDefinitions={getBlankDefinitions()}
      isSaving={isSaving}
      onSave={onSave}
    />
  )
}