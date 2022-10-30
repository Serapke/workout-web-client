import React from "react";
import { Autocomplete as MuiAutocomplete, createFilterOptions } from '@material-ui/lab';
import { TextField } from "@material-ui/core";

const Autocomplete = ({ label, value, options, loading, onChange }: OwnProps) => {

  const filterOptions = createFilterOptions({ limit: 10 })

  return (
    <MuiAutocomplete
      renderInput={(params => <TextField {...params} label={label} variant="outlined"/>)}
      options={options}
      filterOptions={filterOptions}
      inputValue={value}
      onInputChange={(_, value) => onChange(value)}
      loading={loading}
      freeSolo
    />
  )
};

interface OwnProps {
  label: string;
  value: string;
  options: any[];
  loading?: boolean;
  onChange: (value: any) => void;
}

export default Autocomplete;