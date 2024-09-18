import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

export default class FormComponent extends Component {
	render() {
		const {
			isValidated,
			name,
			lastName,
			phone,
			category,
			handleValueChange,
			handleSubmit,
			selected,
		} = this.props;

		return (
			<Form
				noValidate
				validated={isValidated}
				onSubmit={handleSubmit}
				className="w-50 mx-auto"
			>
				<Form.Group className="mb-3 mt-3" controlId="name">
					<Form.Label>First Name</Form.Label>
					<Form.Control
						required
						value={name}
						onChange={handleValueChange}
						type="text"
						id="name"
						placeholder="First Name"
					/>
					<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					<Form.Control.Feedback type="invalid">
						Please enter a first name!
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="mb-3" controlId="lastName">
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						required
						value={lastName}
						onChange={handleValueChange}
						type="text"
						id="lastName"
						placeholder="Last Name"
					/>
					<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					<Form.Control.Feedback type="invalid">
						Please enter a last name!
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="mb-3" controlId="phone">
					<Form.Label>Phone Number</Form.Label>
					<Form.Control
						required
						value={phone}
						onChange={handleValueChange}
						type="text"
						id="phone"
						placeholder="Phone Number"
					/>
					<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					<Form.Control.Feedback type="invalid">
						Please enter a phone number!
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="mb-3" controlId="category">
					<Form.Label>Choose Relationship</Form.Label>
					<Form.Select required value={category} onChange={handleValueChange} id="category">
						<option value="family">Family</option>
						<option value="friends">Friends</option>
						<option value="relatives">Relatives</option>
						<option value="other">Other</option>
					</Form.Select>
					<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					<Form.Control.Feedback type="invalid">
						Please choose a category!
					</Form.Control.Feedback>
				</Form.Group>

				<Button className="w-100" type="submit">
					{selected === null ? 'Add Contact' : 'Update Contact'}
				</Button>
			</Form>
		);
	}
}
