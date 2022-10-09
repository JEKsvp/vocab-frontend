import React, {useState} from "react";
import {Box, Button, Grid, IconButton, Paper, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {HomeButton} from "../../utils/components/HomeButton";
import PropTypes from "prop-types";
import {extractPart, extractTranscription, splitExamples} from "./WordParser";

const CustomTextField = ({label, id, value, onChange}) => {
  return (
    <Grid container>
      <Grid item xs={1}/>
      <Grid item xs={10}>
        <TextField variant="outlined"
                   margin="dense"
                   label={label}
                   id={id}
                   fullWidth
                   value={value}
                   onChange={onChange}
                   size="medium"
        />
      </Grid>
    </Grid>
  )
}

const DefinitionTextField = ({value, onChange, onAddDefinition, onRemoveDefinition, defMeta}) => {
  const removeButton = defMeta.i === 0 ? null : (
    <IconButton onClick={onRemoveDefinition}>
      <RemoveIcon/>
    </IconButton>
  )
  const buttons = defMeta.i === defMeta.length - 1 ? (
    <React.Fragment>
      {removeButton}
      <IconButton onClick={onAddDefinition}>
        <AddIcon/>
      </IconButton>
    </React.Fragment>
  ) : null
  return (
    <Grid container>
      <Grid item xs={1}/>
      <Grid item xs={9}>
        <TextField variant="outlined"
                   margin="dense"
                   label="Definition"
                   multiline
                   rows={2}
                   fullWidth
                   value={value}
                   onChange={onChange}
                   size="medium"
        />
      </Grid>
      <Grid item>
        <Grid container direction="column">
          {buttons}
        </Grid>
      </Grid>
    </Grid>
  )
}

const ExampleTextField = ({
                            value,
                            onChangeExample,
                            exMeta,
                            onAddExample,
                            onRemoveExample
                          }) => {
  const removeButton = exMeta.i === 0 ? null : (
    <IconButton onClick={onRemoveExample}>
      <RemoveIcon/>
    </IconButton>
  )
  const buttons = exMeta.i === exMeta.length - 1 ? (
    <React.Fragment>
      {removeButton}
      <IconButton onClick={onAddExample}>
        <AddIcon/>
      </IconButton>
    </React.Fragment>
  ) : null
  return (
    <Grid container>
      <Grid item xs={1}/>
      <Grid item xs={8}>
        <TextField variant="outlined"
                   margin="dense"
                   label="Example"
                   multiline
                   rows={2}
                   value={value}
                   onChange={onChangeExample}
                   fullWidth
                   size="medium"
        />
      </Grid>
      <Grid item>
        <Grid container direction="column">
          {buttons}
        </Grid>
      </Grid>
    </Grid>
  )
}

const DefinitionGroup = ({
                           definition,
                           onChangeDefinitions,
                           onChangeExample,
                           onAddDefinition,
                           onRemoveDefinition,
                           defMeta,
                           onAddExample,
                           onRemoveExample
                         }) => {
  const examples = definition.examples;
  const examplesRendered = examples.map((example, i) => (
    <ExampleTextField key={`w_ex${i}`}
                      value={example}
                      onChangeExample={(e) => onChangeExample(e, i)}
                      onAddExample={onAddExample}
                      onRemoveExample={onRemoveExample}
                      exMeta={{i: i, length: examples.length}}
    />
  ))
  return (
    <Paper>
      <DefinitionTextField value={definition.definition}
                           onChange={onChangeDefinitions}
                           onAddDefinition={onAddDefinition}
                           onRemoveDefinition={onRemoveDefinition}
                           defMeta={defMeta}
      />
      {examplesRendered}
    </Paper>
  )
}

export const WordForm = ({initWord, initDefinitions, onSave, isSaving}) => {
  const [word, setWord] = useState(initWord)
  const [definitions, setDefinitions] = useState(initDefinitions)

  function onChangeWord(e) {
    const id = e.target.id;
    let value = e.target.value;
    const newWord = {...word}
    if (id === 'Title') {
      if (word.title.length === 0 && value.length > 3) {
        const transcription = extractTranscription(value);
        if (transcription) {
          value = value.replace(transcription, '');
          newWord.transcription = transcription;
        }
        const part = extractPart(value);
        if (part) {
          value = value.replace(part, '');
          newWord.part = part;
        }
        value = value.trim();
      }
      newWord.title = value;
      setWord(newWord);
    } else if (id === 'Transcription') {
      newWord.transcription = value;
      setWord(newWord);
    } else if (id === 'Part') {
      newWord.part = value;
      setWord(newWord);
    }
  }

  function onChangeDefinitions(e, idx) {
    let newValue = e.target.value;
    const newDefinitions = [...definitions];
    newDefinitions[idx].definition = newValue;
    setDefinitions(newDefinitions);
  }

  function onAddDefinition() {
    const newDefinitions = definitions.concat({definition: '', examples: ['']})
    setDefinitions(newDefinitions);
  }

  function onRemoveDefinition() {
    const newDefinitions = definitions.slice(0, definitions.length - 1);
    setDefinitions(newDefinitions);
  }

  function onChangeExample(e, defI, exI) {
    let newValue = e.target.value;
    const newDefinitions = [...definitions];
    if (newDefinitions[defI].examples[exI].length === 0 && newValue.length > 3) {
      const examples = splitExamples(newValue);
      if (examples.length === 1) {
        newDefinitions[defI].examples[exI] = newValue;
      } else {
        newDefinitions[defI].examples = newDefinitions[defI].examples.slice(0, newDefinitions[defI].examples.length - 1);
        examples.forEach(example => {
          newDefinitions[defI].examples = newDefinitions[defI].examples.concat(example);
        })
      }
    } else {
      newDefinitions[defI].examples[exI] = newValue;
    }
    setDefinitions(newDefinitions);
  }

  function onAddExample(e, defI) {
    const newDefinitions = [...definitions];
    let examples = newDefinitions[defI].examples;
    newDefinitions[defI].examples = examples.concat('');
    setDefinitions(newDefinitions);
  }

  function onRemoveExample(e, defI) {
    const newDefinitions = [...definitions];
    let examples = newDefinitions[defI].examples;
    newDefinitions[defI].examples = examples.slice(0, examples.length - 1);
    setDefinitions(newDefinitions);
  }

  const definitionsRendered = definitions.map((definition, defI) =>
    <DefinitionGroup key={defI}
                     defMeta={{i: defI, length: definitions.length}}
                     definition={definition}
                     onChangeDefinitions={e => onChangeDefinitions(e, defI)}
                     onChangeExample={(e, exI) => onChangeExample(e, defI, exI)}
                     onAddDefinition={e => onAddDefinition()}
                     onRemoveDefinition={e => onRemoveDefinition()}
                     onAddExample={e => onAddExample(e, defI)}
                     onRemoveExample={e => onRemoveExample(e, defI)}
    />
  )

  return (
    <Box>
      <CustomTextField label="Title" value={word.title} id="Title" onChange={(e) => onChangeWord(e)}/>
      <CustomTextField label="Transcription" value={word.transcription} id="Transcription"
                       onChange={(e) => onChangeWord(e)}/>
      <CustomTextField label="Part" value={word.part} id="Part" onChange={(e) => onChangeWord(e)}/>
      {definitionsRendered}
      <Grid container justifyContent="center">
        <Grid item>
          <Box mt="10px"/>
          <Button
            size="large"
            onClick={() => onSave(word, definitions)}
            variant="contained"
            disabled={isSaving}
          >
            Save
          </Button>
        </Grid>
      </Grid>
      <HomeButton/>
    </Box>
  )
}

WordForm.propTypes = {
  initWord: PropTypes.object,
  initDefinitions: PropTypes.array,
  onSave: PropTypes.func,
  isSaving: PropTypes.bool
}