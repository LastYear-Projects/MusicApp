import { styled } from "@mui/material/styles";

import { Autocomplete } from "@mui/material";
export const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiAutocomplete-inputRoot": {
    color: "inherit",
    backgroundColor: "#2A2A2A",
    borderRadius: "0.7rem",
    width: "20rem",
    border: "1px solid white", // Set the border color to white

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent !important", // Set the border color when focused
    },
  },
  "& .MuiAutocomplete-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "white", // Set the placeholder text color to white
  },
  "& .MuiInputLabel-root": {
    color: "white", // Set the label color to white
  },
  "& .MuiAutocomplete-clearIndicator, .MuiSvgIcon-root": {
    color: "white !important", // Set the arrow color to white
  },
}));
