import React, {Fragment} from "react";

export class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {checked, onChange, label} = this.props;
    return (
      <Fragment>
        <div className={`radio ${checked ? "isChecked" : ""}`}
             onClick={() => !checked && onChange()}
        >
          {checked && (
            <i className="fas fa-check"/>
          )}
          {
            label && (
              <span className="radio-label"
                    onClick={() => !checked && onChange()}
              >
              {label}
            </span>
            )
          }
        </div>

      </Fragment>

    );
  }
}
