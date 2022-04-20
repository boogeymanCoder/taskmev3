import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ForumIcon from "@mui/icons-material/Forum";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import moment from "moment";
import PostForm from "./PostForm";
import { updatePost } from "src/services/post";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function PostCard({ postData }) {
  const [edit, setEdit] = useState(false);
  const auth = getAuth();
  const database = getDatabase();
  const [user, userLoading, userError] = useAuthState(auth);
  const [account, accountLoading, accountError] = useObjectVal(
    ref(database, `accounts/${user?.uid}`)
  );

  useEffect(() => console.log({ user, userLoading, userError }), [user, userLoading, userError]);
  useEffect(
    () => console.log({ account, accountLoading, accountError }),
    [account, accountLoading, accountError]
  );

  function handleEdit(values) {
    console.log({ values });
    return updatePost(postData.uid, {
      ...values,
      createdAt: new Date(JSON.parse(postData.createdAt)),
    }).then((res) => {
      setEdit(false);
      return res;
    });
  }

  if (!user || userLoading || userError || !account || accountLoading || accountError) {
    return <LinearProgress />;
  }

  if (!edit) {
    return (
      <Post
        avatar={account.image}
        name={account.fullname}
        lastUpdate={moment(JSON.parse(postData.updatedAt)).fromNow()}
        details={postData.details}
        onEdit={() => setEdit(true)}
      />
    );
  } else {
    return (
      <PostForm
        avatar={account.image}
        name={account.fullname}
        lastUpdate={moment(JSON.parse(postData.updatedAt)).fromNow()}
        detailsInitialValue={postData.details}
        onSubmit={handleEdit}
      />
    );
  }
}

PostCard.propTypes = {
  /**
   * Post data from database.
   */
  postData: PropTypes.object.isRequired,
};

PostCard.default = {
  edit: false,
};

/**
 * Displays forum post.
 */
export default function Post({ avatar, name, lastUpdate, details, onEdit, onLike, onComment }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={avatar} />}
        action={
          <IconButton onClick={onEdit}>
            <EditIcon />
          </IconButton>
        }
        title={name}
        subheader={lastUpdate}
      />
      <CardContent>
        <Typography>{details}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={onLike}>
          <ThumbUpIcon />
        </IconButton>
        <IconButton onClick={onComment}>
          <ForumIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Comments</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

Post.propTypes = {
  /**
   * The users avatar URL.
   */
  avatar: PropTypes.string.isRequired,
  /**
   * The users name.
   */
  name: PropTypes.string.isRequired,
  /**
   * When the post was last updated.
   */
  lastUpdate: PropTypes.string.isRequired,
  /**
   * The post body.
   */
  details: PropTypes.string.isRequired,
  /**
   * Function to call on edit.
   */
  onEdit: PropTypes.func.isRequired,
  /**
   * Function to call on like.
   */
  onLike: PropTypes.func.isRequired,
  /**
   * Function to call on comment.
   */
  onComment: PropTypes.func.isRequired,
};
