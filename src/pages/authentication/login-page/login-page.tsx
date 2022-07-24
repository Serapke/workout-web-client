import * as React from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useAuth } from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === 'email') {
      setEmail(inputValue);
    } else if (inputName === 'password') {
      setPassword(inputValue);
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(email, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box marginTop={2}>
        <TextField
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={onTextFieldChange}
          color="secondary"
          autoComplete={"username"}
          required
          fullWidth
        />
      </Box>
      <Box marginTop={2}>
        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={onTextFieldChange}
          value={password}
          color="secondary"
          autoComplete="current-password"
          required
          fullWidth
        />
      </Box>
      <Box marginTop={4}>
        <Button type="submit" variant="contained" color="secondary" fullWidth>Login</Button>
      </Box>
    </form>
  );
}

type AllProps = {};

const LoginPage: React.FunctionComponent<AllProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const state = location.state as { from: Location };
  const from = state ? state.from.pathname : '/';

  console.log(from);

  const onFormSubmit = (email, password) => {
    auth.signIn(email, password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch(error => {
        console.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
      })
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h2">Login to Sportuok</Typography>
      <Box width={600}>
        <LoginForm onSubmit={onFormSubmit}/>
      </Box>
    </Box>
  );
};

export default LoginPage;