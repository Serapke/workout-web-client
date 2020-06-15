import * as React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

interface OwnProps {
  onDelete: (event: React.MouseEvent<HTMLLIElement>) => void;
}

const TaskItemMenu: React.FC<OwnProps> = ({ onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: any) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton edge="end" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={onDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default TaskItemMenu;
