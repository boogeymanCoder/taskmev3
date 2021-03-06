import Head from "next/head";
import NextLink from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import CheckNonAuth from "/src/components/auth/CheckNonAuth";
import SnackbarMessage from "/src/components/SnackbarMessage";
import SnackbarErrorMessage from "/src/components/SnackbarErrorMessage";

const Register = () => {
  return (
    <CheckNonAuth>
      <RegisterPage />
    </CheckNonAuth>
  );
};

/**
 * In this page the user can create a new account whenever they choose to use
 * email and password to authenticate.
 */
export const RegisterPage = () => {
  const [showError, setShowError] = useState(false);

  const auth = getAuth();
  const [createUserWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  useEffect(() => {
    if (emailError) setShowError(true);
  }, [emailError]);

  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      policy: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string()
        .max(255)
        .required("Password is required")
        .matches(/.{8,}/, "Password must have at eight characters")
        .matches(/[0-9]+/, "Password must have at least one [0-9] numerical character")
        .matches(/[a-z]+/, "Password must have at least one [a-z] lower case alphabet")
        .matches(/[A-Z]+/, "Password must have at least one [A-Z] upper case alphabet")
        .matches(/[^a-zA-Z0-9]+/, "Password must have at least one [!$*...] special character"),
      confirmationPassword: Yup.string()
        .required("Confirmation Password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: (values) => {
      return createUserWithEmailAndPassword(values.email, values.password);
    },
  });

  return (
    <>
      <Head>
        <title>Register | TaskME</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit} noValidate>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create a new account
              </Typography>
            </Box>

            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              type="email"
              variant="outlined"
              required
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={(e) => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
            <TextField
              error={Boolean(
                formik.touched.confirmationPassword && formik.errors.confirmationPassword
              )}
              fullWidth
              helperText={formik.touched.confirmationPassword && formik.errors.confirmationPassword}
              label="Confirmation Password"
              margin="normal"
              name="confirmationPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={showPassword ? "text" : "password"}
              value={formik.values.confirmationPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={(e) => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />

            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography color="textSecondary" variant="body2">
                I have read the{" "}
                <NextLink href="#" passHref>
                  <Link color="primary" underline="always" variant="subtitle2">
                    Terms and Conditions
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting || emailLoading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
      {emailUser && (
        <SnackbarMessage
          message={
            <>
              Account successfully created! - <Link href="/login">Sign in</Link>
            </>
          }
        />
      )}
      <SnackbarErrorMessage error={emailError} />
    </>
  );
};

export default Register;
