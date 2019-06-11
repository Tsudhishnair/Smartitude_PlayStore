import React, { Component } from "react";
import PropTypes from "prop-types";

class Latex extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  componentDidMount() {
    this.renderMath();
  }

  componentDidUpdate() {
    this.renderMath();
  }

  renderMath() {
    window.MathJax.Hub.Queue([
      "Typeset",
      window.MathJax.Hub,
      this.node.current
    ]);
  }

  render() {
    const text = this.props.text;
    return (
      <span ref={this.node}>
        {text}
      </span>
    );
  }
}

Latex.propTypes = {
  text: PropTypes.string.isRequired
};

export default Latex;