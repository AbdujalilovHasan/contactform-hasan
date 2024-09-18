import React, { Component } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

export default class FilterComponent extends Component {
  render() {
    const {
      search,
      handleSearch,
      filterCategory,
      handleCategoryFilter, 
      sort,
      handleSort, 
    } = this.props;

    return (
      <div className='my-4'>
        <InputGroup>
          <Form.Control
            value={search}
            onChange={handleSearch}
            placeholder='Search...'
            className="w-75 me-2" 
          />
          <Form.Select
            value={filterCategory}
            onChange={handleCategoryFilter} 
            aria-label="Filter by category"
            className="w-auto me-2" 
          >
            <option value='all'>All</option>
            <option value='family'>Family</option>
            <option value='friends'>Friends</option>
            <option value='relatives'>Relatives</option>
            <option value='other'>Other</option>
          </Form.Select>
          <Form.Select
            value={sort}
            onChange={handleSort} 
            aria-label="Sort by"
            className="w-auto"
          >
            <option value=''>Sort by</option>
            <option value='A-Z'>A-Z</option>
            <option value='Z-A'>Z-A</option>
          </Form.Select>
        </InputGroup>
      </div>
    );
  }
}
