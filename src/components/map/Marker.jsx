import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "antd";
import "../../assets/styles/css/maps.css";
/* const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: red;
  border: 2px solid red;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${props => (props.onClick ? "pointer" : "default")};
  &:hover {
    z-index: 0;
  }
  font-size: 10px !important;
  color: red;
`; */
const style_low = {
  color: "grey",
  fontSize: "15px",
  cursor: "pointer"
};
const style_middle = {
  color: "orange",
  fontSize: "25px",
  cursor: "pointer"
};
const style_high = {
  color: "red",
  fontSize: "30px",
  cursor: "pointer"
};
const style_skull = {
  color: "#860c0c",
  fontSize: "30px",
  cursor: "pointer"
};

const Marker = ({ acc, text, onClick }) => {
  let style;
  const num_morti = Number(acc.NUM_MORTI);
  const num_feriti = Number(acc.NUM_FERITI);

  if (num_morti >= 1 || num_feriti >= 4) {
    style = style_high;
  } else if (num_feriti >= 2) {
    style = style_middle;
  } else if (num_feriti >= 0) {
    style = style_low;
  }

  return (
    <>
      {num_morti >= 1 ? (
        <FontAwesomeIcon
          icon="skull-crossbones"
          style={style_skull}
          {...(onClick ? { onClick: onClick } : {})}
        />
      ) : (
        <Icon
          style={style}
          type="heat-map"
          alt={text}
          {...(onClick ? { onClick: onClick } : {})}
        />
      )}
    </>
  );
};

Marker.defaultProps = {
  onClick: null
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired
};

export default Marker;
