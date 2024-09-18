import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'react-bootstrap';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

export default class ListComponent extends Component {
  handleFavoriteClick = () => {
    const { id, favorite, handleFavorite } = this.props;
    handleFavorite(id, !favorite);
  };

  getCategoryColor = () => {
    const { category } = this.props;
    const colors = {
      family: 'danger',
      friends: 'primary',
      relatives: 'info',
      other: 'success',
    };
    return colors[category] || 'secondary';
  };

  render() {
    const { name, lastName, phone, category, id, favorite, editTodo, deleteTodo } = this.props;

    if (!name || !lastName || !phone || !category) {
      return <Alert variant="warning">Missing required information</Alert>;
    }

    const categoryColor = this.getCategoryColor();
    const FavoriteIcon = favorite ? FaHeart : FaRegHeart;

    return (
      <Alert
        variant="primary"
        className="d-flex align-items-center justify-content-between py-3 flex-wrap"
      >
        <div>
          <Alert.Heading className="m-0">
            {name} {lastName}{' '}
            <span className={`text-${categoryColor}`}>
              {category}
            </span>
          </Alert.Heading>
          <p className="m-0">{phone}</p>
        </div>

        <div className="icons d-flex align-items-center gap-3">
          <FavoriteIcon onClick={this.handleFavoriteClick} size={24} />
          <Button onClick={() => editTodo(id)} variant="primary">Edit</Button>
          <Button onClick={() => deleteTodo(id)} variant="danger">Delete</Button>
        </div>
      </Alert>
    );
  }
}

ListComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
