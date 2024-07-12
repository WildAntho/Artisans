import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

const ITEM_HEIGHT = 48;

function CardMenu({ handleOpen, anchorEl, setAnchorEl, handleOpenValidation }) {
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const managingOpen = () => {
    handleOpen();
    setAnchorEl(false);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertOutlinedIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={managingOpen}>éditer</MenuItem>
        <MenuItem onClick={handleOpenValidation}>supprimer</MenuItem>
      </Menu>
    </div>
  );
}
export default CardMenu;

CardMenu.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleOpenValidation: PropTypes.func.isRequired,
  anchorEl: PropTypes.instanceOf(Element),
  setAnchorEl: PropTypes.func,
  handleOpen: PropTypes.func.isRequired
};

CardMenu.defaultProps = {
  anchorEl: null,
  setAnchorEl: undefined,
};
