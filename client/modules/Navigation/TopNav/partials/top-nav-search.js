import React, { Component } from 'react';

/**
 * The default text to use for the placeholder.
 * @const {string}
 */
export const DEFAULT_SEARCH_PLACEHOLDER = 'Search';

class TopNavSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ''
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchChange({ target }) {
    const { value } = target;
    this.setState({ searchValue: value });
  }

  handleSearchSubmit(event) {
    const { searchHandler } = this.props;
    const { searchValue } = this.state;

    event.preventDefault();
    searchHandler(searchValue);
  }

  render() {
    const {
      classes,
      searchPlaceholder = DEFAULT_SEARCH_PLACEHOLDER
    } = this.props;

    const { searchValue } = this.state;

    return (
      <form
        onSubmit={this.handleSearchSubmit}
        autoComplete="off"
      >
        <input
          id="name"
          label="Name"
          className={classes.searchBox}
          value={searchValue}
          placeholder={searchPlaceholder}
          onChange={this.handleSearchChange}
        />
      </form>
    );
  }
}

export default TopNavSearch;
