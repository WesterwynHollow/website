import React, { Component } from 'react';
import SelectIcon from 'images/select-icon.svg'

class VariantSelector extends Component {
  render() {
    return (
      <div className="col-12 padding">
        <label htmlFor={this.props.option.name}>{this.props.option.name}</label>
        <div className="select-wrapper">
          <select
            id={this.props.option.name}
            className="Product__option"
            name={this.props.option.name}
            key={this.props.option.name}
            onChange={this.props.handleOptionChange}
          >
            {this.props.option.values.map((value) => {
              return (
                <option value={value} key={`${this.props.option.name}-${value}`}>{`${value}`}</option>
              )
            })}
          </select>
          <svg className="select-icon" data-element="option.selectIcon" viewBox="0 0 24 24"><path d="M21 5.176l-9.086 9.353L3 5.176.686 7.647 12 19.382 23.314 7.647 21 5.176z"></path></svg>
        </div>
      </div>
    );
  }
}

export default VariantSelector;