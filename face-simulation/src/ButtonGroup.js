import React, { Component } from "react";
import _ from "lodash";
import styled from "styled-components";
class ButtonGroup extends Component {
  render() {
    return <div className={this.props.className}>Button Group</div>;
  }
}
export default styled(ButtonGroup)`
  background-color: red;
`;
