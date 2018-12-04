import { css } from "glamor";

const COLORS = {
  blueGreen: "#7EDAD4",
  mintCream: "#F9FFF9",
  salmonPink: "#FF9393",
  teal: "#588188",
  yellow: "#FFEC94",
};

export const theme = {
  main: {
    borderRadius: "4px",
    boxShadow: (color = COLORS.salmonPink) => `1px 1px 1px 1px ${color}`,
    colors: COLORS,
  },
};

export const endPointStyles = css({
  "&.right": {
    left: "190px",
  },
  borderRadius: "100%",
  height: "25px",
  left: "-12px",
  position: "absolute",
  top: "25px",
  width: "25px",
  zIndex: 200001,
});
export const nodeWrapperStyles = css({
  alignItems: "center",
  display: "flex",
  height: "100%",
  justifyContent: "center",
  position: "relative",
  width: "100%",
});
export const nodeStyles = css({
  background: "#eeeeee",
  border: `2px solid #000000`,
  cursor: "pointer",
  display: "inline-block",
  height: "100px",
  position: "absolute",
  width: "200px",
  zIndex: 20000,
});

css.global(".jtk-endpoint.jtk-endpoint-anchor", {
  zIndex: 20001,
});

css.global("body > #app-dag", {
  height: "100%",
  overflow: "auto",
  width: "100%",
});

css.global("a", {
  ":hover": {
    textDecoration: "none",
  },
});
css.global("p", {
  marginBottom: "2rem",
});
css.global("ul", {
  "> li": {
    "> p": {
      margin: "0",
    },
    margin: "10px 0",
  },
  "> p": {
    margin: "0",
  },
});
css.global("h3, h4, h5", {
  borderBottom: "1px solid",
  fontWeight: "bold",
  paddingBottom: "10px",
});

export function setGlobal() {
  css.global("html, body", {
    backgroundColor: "#eeeeee",
    fontFamily: `Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
    fontSize: "1rem",
    height: "100vh",
    margin: 0,
    overflow: "auto",
    width: "100vw",
  });

  css.global(".jtk-endpoint.jtk-endpoint-anchor", {
    zIndex: 20001,
  });

  css.global("body > #app-dag", {
    height: "100%",
    overflow: "auto",
    width: "100%",
  });

  css.global("a", {
    ":hover": {
      textDecoration: "none",
    },
  });
  css.global("p", {
    marginBottom: "2rem",
  });
  css.global("ul", {
    "> li": {
      "> p": {
        margin: "0",
      },
      margin: "10px 0",
    },
    "> p": {
      margin: "0",
    },
  });
  css.global("h3, h4, h5", {
    borderBottom: "1px solid",
    fontWeight: "bold",
    paddingBottom: "10px",
  });

  
}

