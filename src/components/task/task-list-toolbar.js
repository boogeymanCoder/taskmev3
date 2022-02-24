import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Select,
  Grid,
  FormControl,
  InputLabel,
  Fab,
  Tooltip,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";

export const TaskListToolbar = ({ handleAddTask, ...props }) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Tasks
      </Typography>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Tooltip title="Unavailable">
                <TextField
                  disabled
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search product"
                  variant="outlined"
                />
              </Tooltip>
            </Grid>
            <Grid item md={6} xs={12}>
              <Tooltip title="Unavailable">
                <FormControl fullWidth disabled>
                  <InputLabel id="sortby-select-label">Sort by</InputLabel>
                  <Select labelId="sortby-select-label" label="Sort by" fullWidth />
                </FormControl>
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
    <Fab
      onClick={handleAddTask}
      size="large"
      sx={{
        position: "fixed",
        bottom: "5%",
        right: "5%",
        boxShadow: 3,
        zIndex: "modal",
      }}
      color="primary"
      aria-label="add"
    >
      <Add />
    </Fab>
  </Box>
);
