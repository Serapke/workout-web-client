import React from "react";
import {
  Checkbox,
  createStyles,
  FormControl,
  InputLabel,
  ListItemText,
  makeStyles,
  MenuItem,
  Select, Theme
} from "@material-ui/core";

interface OwnProps {
  options: string[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    }
  }),
);

const FilterSelect = ({ options } : OwnProps) => {
  const classes = useStyles();
  const [values, setValues] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValues(event.target.value as string[]);
  };

  const renderValue = (selected: string[]) => {
    if (selected.length > 1) {
      return `Selected (${selected.length})`
    }
    return selected;
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-mutiple-checkbox-label">Type</InputLabel>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        value={values}
        onChange={handleChange}
        renderValue={renderValue}
        label="Type"
      >
        <MenuItem key="all" value="All">
          <Checkbox checked={true} />
          <ListItemText primary="All" />
        </MenuItem>

        {options.map(option => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={values.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default FilterSelect;