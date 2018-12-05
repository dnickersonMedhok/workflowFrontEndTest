//TODO: move all css to a central location

import { css } from "glamor";
import { theme } from "../styles";

const HEIGHT_OF_HEADER = 90;
const HEIGHT_OF_BUTTON_PANEL = 50;
export const buttonPanelStyles = css({
    alignItems: "center",
    background: "white",
    display: "flex",
    height: `${HEIGHT_OF_BUTTON_PANEL}px`,
    justifyContent: "center",
  });
  
  export const buttonStyles = css({
    border: `1px solid ${theme.main.colors.salmonPink}`,
    boxShadow: `${theme.main.boxShadow()}`,
    fontSize: "inherit",
    margin: "0 5px",
    padding: "5px",
  });

  export const nodeType1Styles = css({
    backgroundColor: theme.main.colors.blueGreen,
    height: "60px",
    width: "100px"
  });
  
  export const nodeType2Styles = css({
    backgroundColor: theme.main.colors.teal,
    height: "60px",
    width: "100px"
  });
  
  export const nodeType3Styles = css({
    backgroundColor: theme.main.colors.yellow,
  });

  export const dagWrapperStyles = css({
    background: "white",
    height: `calc(100vh - ${HEIGHT_OF_HEADER}px - ${HEIGHT_OF_BUTTON_PANEL +
      1}px)`,
    width: "100vw",
  });

  export const headerStyles = css({
    alignItems: "center",
    display: "flex",
    height: `${HEIGHT_OF_HEADER}px`,
    justifyContent: "center",
    margin: 0,
  });
  