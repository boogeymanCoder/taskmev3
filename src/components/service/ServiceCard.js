import { CardHeader, Chip, Grid } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import {
  Alert,
  Avatar,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { equalTo, getDatabase, orderByChild, query, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useListVals, useObjectVal } from "react-firebase-hooks/database";
import { useEffect } from "react";
import moment from "moment";
import { Edit, MoreVert, Handshake, Campaign } from "@mui/icons-material";
import ServiceForm from "./ServiceForm";
import ConfirmMessage from "../ConfirmMessage";
import { OfferCard } from "../offer/OfferCard";
import OfferForm from "../offer/OfferForm";
import { deleteOffer, updateOffer } from "/src/services/offer";

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

export function ServiceCard({ serviceData, onEdit, onDelete, onOffer }) {
  const database = getDatabase();
  const auth = getAuth();
  const [offerList, setOfferList] = useState([]);
  const [openEditOffer, setOpenEditOffer] = useState(false);
  const [editOfferInitialValues, setEditOfferInitialValues] = useState();

  const [user, userLoading, userError] = useAuthState(auth);
  // const offers = [<p key="1">Offer1</p>, <p key="2">Offer2</p>];

  console.log({ serviceData });
  console.log(`accounts/${serviceData.owner}`);
  const [owner, ownerLoading, ownerError] = useObjectVal(
    ref(database, `accounts/${serviceData.owner}`),
    { keyField: "uid" }
  );

  const [offers, offersLoading, offersError] = useListVals(
    query(ref(database, "offers"), orderByChild("service"), equalTo(serviceData.uid)),
    {
      keyField: "uid",
    }
  );

  function editOfferHandler(offerUid, values) {
    console.log({ offerUid, values });
    return updateOffer(offerUid, values)
      .then((res) => setOpenEditOffer(false))
      .catch((err) => console.log({ err }));
  }

  async function deleteOfferHandler(uid) {
    return deleteOffer(uid).catch((err) => console.log({ err }));
  }

  useEffect(() => console.log({ openEditOffer }), [openEditOffer]);
  useEffect(() => console.log({ editOfferInitialValues }), [editOfferInitialValues]);

  useEffect(() => {
    if (offers.length < 1) {
      setOfferList(null);
      return;
    }

    setOfferList(
      offers.map((offer) => (
        <>
          <OfferCard
            key={offer.uid}
            offerData={offer}
            isOwned={offer.owner === user.uid}
            onEdit={() => {
              setEditOfferInitialValues(offer);
              setOpenEditOffer(true);
            }}
            onDelete={() => deleteOfferHandler(offer.uid)}
          />
        </>
      ))
    );
  }, [offers]);

  useEffect(
    () => console.log({ owner, ownerLoading, ownerError }),
    [owner, ownerLoading, ownerError]
  );

  useEffect(
    () => console.log({ offers, offersLoading, offersError }),
    [offers, offersLoading, offersError]
  );

  if (
    !user ||
    userLoading ||
    userError ||
    !owner ||
    ownerLoading ||
    ownerError ||
    offersLoading ||
    offersError
  ) {
    return <LinearProgress />;
  }

  return (
    <>
      {editOfferInitialValues && (
        <OfferForm
          title="Edit Offer"
          open={openEditOffer}
          onClose={() => {
            setEditOfferInitialValues(null);
            setOpenEditOffer(false);
          }}
          onCancel={() => {
            setEditOfferInitialValues(null);
            setOpenEditOffer(false);
          }}
          onSubmit={(values) => {
            setEditOfferInitialValues(null);
            return editOfferHandler(editOfferInitialValues.uid, values);
          }}
          initialValues={editOfferInitialValues}
        />
      )}
      <ServiceCardView
        avatar={owner.image}
        owner={owner.fullname}
        lastUpdated={moment(JSON.parse(serviceData.updatedAt)).fromNow()}
        title={serviceData.title}
        details={serviceData.details}
        tags={serviceData.tags ?? []}
        currency={serviceData.currency}
        price={serviceData.price}
        isOwned={user.uid === owner.uid}
        onEdit={user.uid === owner.uid ? onEdit : undefined}
        onDelete={user.uid === owner.uid ? onDelete : undefined}
        onOffer={onOffer}
        offers={offerList}
      />
    </>
  );
}

export function ServiceMenu({ onEdit, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            onEdit();
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenConfirmation(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      <ConfirmMessage
        title="Delete Service?"
        message="After deletion, this service can no longer be seen and and sent with offers from others."
        onAgree={(e) => {
          onDelete()
            .then((res) => {
              setOpenConfirmation(false);
              handleClose();
            })
            .catch((err) => console.log({ err }));
        }}
        onDisagree={(e) => {
          setOpenConfirmation(false);
          handleClose();
        }}
        open={openConfirmation}
        handleClose={(e) => setOpenConfirmation(false)}
      />
    </>
  );
}

/**
 * Displays Service information posted by user.
 */
export default function ServiceCardView({
  avatar,
  owner,
  lastUpdated,
  title,
  details,
  tags,
  currency,
  price,
  isOwned = false,
  onEdit,
  onDelete,
  onOffer,
  offers,
}) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        title={owner}
        avatar={<Avatar src={avatar} />}
        subheader={lastUpdated}
        action={<>{isOwned && <ServiceMenu onEdit={onEdit} onDelete={onDelete} />}</>}
      />

      <CardContent>
        <Typography variant="h4" align="center">
          {title}
        </Typography>
        <Grid container spacing={1}>
          {tags.map((tag) => (
            <Grid item key={tag}>
              <Chip color="primary" size="small" label={tag} />
            </Grid>
          ))}
        </Grid>
        <Typography>{details}</Typography>
        <Typography align="right" variant="h5" color="primary">
          {currency} {price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={onOffer}>
          <Campaign />
        </IconButton>
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {!offers && (
          <CardContent style={{ border: "none", boxShadow: "none" }}>
            <Alert severity="info">No Offers yet</Alert>
          </CardContent>
        )}
        {offers && (
          <CardContent style={{ border: "none", boxShadow: "none" }}>{offers}</CardContent>
        )}
      </Collapse>
    </Card>
  );
}

ServiceCardView.propTypes = {
  /**
   * The service owners image link.
   */
  avatar: PropTypes.string.isRequired,
  /**
   * The owner's name.
   */
  owner: PropTypes.string.isRequired,
  /**
   * When the service was last updated.
   */
  lastUpdated: PropTypes.string.isRequired,
  /**
   * The service title.
   */
  title: PropTypes.string.isRequired,
  /**
   * Extra information about the service.
   */
  details: PropTypes.string,
  /**
   * Array of tags that identify the service as a category.
   */
  tags: PropTypes.array,
  /**
   * The proposed price currency of the service owner.
   */
  currency: PropTypes.string.isRequired,
  /**
   * The proposed price of the service owner.
   */
  price: PropTypes.number.isRequired,
  /**
   * Whether the service is owned or not, shows edit button if owned else not.
   */
  isOwned: PropTypes.bool,
  /**
   * Function to call on edit, requires isOwned to be true.
   */
  onEdit: PropTypes.func,
  /**
   * Function to call on delete, requires isOwned to be true.
   */
  onDelete: PropTypes.func,
  /**
   * Function to call when adding an offer.
   */
  onOffer: PropTypes.func,
  /**
   * Array of offers for this service, must have a key property.
   */
  offers: PropTypes.arrayOf(PropTypes.node),
};

ServiceCardView.default = { isOwned: false };
