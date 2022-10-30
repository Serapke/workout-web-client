import React from "react";
import {
  Checkbox,
  createStyles,
  FormControl,
  InputLabel,
  ListItemText,
  makeStyles,
  MenuItem,
  Select
} from "@material-ui/core";
import { capitalizeWord } from "../../utils/text-utils";

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 120,
      maxWidth: 300,
    }
  }),
);

const FilterSelect = ({ options, value, label, loading, onChange }: OwnProps) => {
  const classes = useStyles();
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    setSelectedKeys(event.target.value as string[]);
    onChange(event.target.value as string[]);
  }

  function renderValue(selected: string[]) {
    if (selected.length > 1) {
      return `${capitalizeWord(selected[0])} & ${selected.length - 1} more...`
    }
    return capitalizeWord(selected[0]);
  }

  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <InputLabel id="demo-mutiple-checkbox-label">{label}</InputLabel>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        value={value}
        onChange={handleChange}
        renderValue={renderValue}
        label={label}
      >
        {loading ?
          <MenuItem key={"loading"} value={"loading"}>
            <ListItemText primary={"Loading..."}/>
          </MenuItem>
          :
          options.map(option => (
            <MenuItem key={option.key} value={option.key}>
              <Checkbox checked={selectedKeys.indexOf(option.key) > -1}/>
              <ListItemText primary={option.value}/>
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

interface OwnProps {
  label: string
  options: FilterSelectOption[]
  value: string[]
  loading?: boolean;
  onChange: (value: string[]) => void;
}

export interface FilterSelectOption {
  key: string;
  value: string;
}

export default FilterSelect;