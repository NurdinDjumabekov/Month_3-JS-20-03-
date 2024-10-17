import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

////// style
import "./style.scss";

const ConfirmModal = ({ state, yesFN, noFN, title }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className="confirmModal">
      <Dialog
        fullScreen={fullScreen}
        open={state}
        onClose={noFN}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="confirmModal__inner">
          <div className="confirmModal__block">
            <DialogTitle
              id="responsive-dialog-title"
              sx={{ textAlign: "center" }}
            >
              {title}
            </DialogTitle>
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px 60px",
              }}
            >
              <button
                onClick={() => yesFN()}
                className="send"
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "5px 7px",
                  borderRadius: 3,
                  width: 80,
                  height: 35,
                }}
              >
                Да
              </button>
              <button
                onClick={() => noFN()}
                className="end"
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "5px 7px",
                  borderRadius: 3,
                  width: 80,
                  height: 35,
                }}
              >
                Нет
              </button>
            </DialogActions>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
