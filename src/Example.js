import React from "react";
//class componenet
class Example extends React.Component {
  render() {
    return (
      <div>
        <p> My Class component for {this.props.name} ! </p>
      </div>
    );
  }
}
export default Example;
