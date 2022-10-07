import React, {useState} from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";


export const WordAccordion = ({word, onMoveWordClick, onRemoveClick}) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const definitionsRendered = word.definitions.map((definition, idx) => {
    const examplesRendered = definition.examples.map((example, idx) => (
      <React.Fragment key={idx}>
        <Grid item xs={1}></Grid>
        <Grid item xs={11}>
          <Typography sx={{display: 'list-item'}} variant="body1">
            {example}
          </Typography>
        </Grid>
      </React.Fragment>
    ));
    return (
      <React.Fragment key={word.id + idx}>
        <Typography variant="body2" color="text.secondary">{definition.definition}
        </Typography>
        {examplesRendered}
      </React.Fragment>
    )
  })

  function onEditClick(wordId){
    navigate(`/words/${wordId}/edit`)
  }

  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary
        expandIcon={<ExpandMore/>}
        aria-controls="panel1bh-content"
        id="panel1bh-header">
        <Stack>
          <Typography variant="h5" component="div">
            {word.title}&nbsp;
            <Typography variant="h5" color="text.secondary" component="a">
              /{word.transcription}/
            </Typography>
          </Typography>

          <Typography color="text.secondary" component="div">
            {word.part}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Divider/>
        <Grid container>
          <Grid item xs={2}>
            <IconButton onClick={onRemoveClick}>
              <RemoveIcon/>
            </IconButton>
          </Grid>
          <Grid item xs={3}/>
          <Grid item xs={2}>
            <Grid container direction={'row'} justifyContent={'center'}>
              <IconButton onClick={() => onEditClick(word.id)}>
                <EditIcon/>
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={3}/>
          <Grid item xs={2}>
            <Grid container direction={'row'} justifyContent={'flex-end'}>
              <IconButton onClick={onMoveWordClick}>
                <TrendingFlatIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          {definitionsRendered}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

WordAccordion.propTypes = {
  word: PropTypes.object,
  onMoveWordClick: PropTypes.func,
  onRemoveClick: PropTypes.func
}