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
import PropTypes from "prop-types";

/**
 * Posts toolbar allowing users to add, search or sort Posts
 */
const PostListToolbar = ({ sortEnabled = false, searchEnabled = false, ...props }) => (
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
        Posts
      </Typography>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Tooltip title={searchEnabled ? "" : "Unavailable"}>
                <TextField
                  disabled={!searchEnabled}
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
                  placeholder="Search posts"
                  variant="outlined"
                />
              </Tooltip>
            </Grid>
            <Grid item md={6} xs={12}>
              <Tooltip title={sortEnabled ? "" : "Unavailable"}>
                <FormControl fullWidth disabled={!sortEnabled}>
                  <InputLabel id="sortby-select-label">Sort by</InputLabel>
                  <Select labelId="sortby-select-label" label="Sort by" fullWidth />
                </FormControl>
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

PostListToolbar.propTypes = {
  /**
   * Whether sort is enabled.
   */
  sortEnabled: PropTypes.bool,
  /**
   * Whether search is enabled.
   */
  searchEnabled: PropTypes.bool,
};

export default PostListToolbar;
