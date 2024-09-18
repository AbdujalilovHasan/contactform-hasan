import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import FilterComponent from '../components/FilterComponents';
import FormComponent from '../components/FormComponent';
import TabsComponent from '../components/TabsComponetn';
import 'bootstrap/dist/css/bootstrap.css';

export class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: this.getInitialTodos(),
            name: '',
            lastName: '',
            phone: '',
            category: 'family',
            isValidated: false,
            selected: null,
            search: '',
            filterCategory: 'all',
            sort: '',
        };
    }

    getInitialTodos = () => {
        try {
            const todos = localStorage.getItem('todos');
            return todos ? JSON.parse(todos) : [];
        } catch (error) {
            console.error("Failed to parse 'todos' from localStorage:", error);
            return [];
        }
    };

    updateState = (updates) => {
        this.setState((prevState) => ({ ...prevState, ...updates }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, lastName, phone, category, selected, todos } = this.state;

        this.setState({ isValidated: true });

        if (e.currentTarget.checkValidity()) {
            const todo = {
                name,
                lastName,
                phone,
                category,
                favorite: false,
                id: selected ? selected : uuidv4(),
            };

            let newTodos;

            if (selected === null) {
                newTodos = [...todos, todo];
            } else {
                newTodos = todos.map((item) => (item.id === selected ? todo : item));
            }

            this.resetForm();
            localStorage.setItem('todos', JSON.stringify(newTodos));
            this.setState({ todos: newTodos });
        }
    };

    resetForm = () => {
        this.updateState({
            name: '',
            lastName: '',
            phone: '',
            category: 'family',
            isValidated: false,
            selected: null,
        });
    };

    handleValueChange = (e) => {
        this.updateState({ [e.target.id]: e.target.value });
    };

    handleFavorite = (id, favorite) => {
        const updatedTodos = this.state.todos.map((todo) =>
            todo.id === id ? { ...todo, favorite } : todo
        );
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        this.setState({ todos: updatedTodos });
    };

    deleteTodo = (id) => {
        const updatedTodos = this.state.todos.filter((todo) => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        this.setState({ todos: updatedTodos });
    };

    editTodo = (id) => {
        const selectedTodo = this.state.todos.find((todo) => todo.id === id);
        this.updateState({ ...selectedTodo, selected: id });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleSearch = (e) => {
        this.updateState({ search: e.target.value });
    };

    handleCategoryFilter = (e) => {
        this.updateState({ filterCategory: e.target.value });
    };

    handleSort = (e) => {
        this.updateState({ sort: e.target.value });
    };

    getFilteredTodos = () => {
        const { todos, search, filterCategory, sort } = this.state;

        let filteredTodos = todos.filter((todo) =>
            todo.name.toLowerCase().includes(search.toLowerCase().trim())
        );

        if (filterCategory !== 'all') {
            filteredTodos = filteredTodos.filter((todo) => todo.category === filterCategory);
        }

        if (sort === 'A-Z') {
            return filteredTodos.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'Z-A') {
            return filteredTodos.sort((a, b) => b.name.localeCompare(a.name));
        }

        return filteredTodos;
    };

    render() {
        const {
            name,
            lastName,
            phone,
            category,
            isValidated,
            search,
            filterCategory,
            sort,
            selected,
        } = this.state;

        const formProps = {
            name,
            lastName,
            phone,
            category,
            isValidated,
            selected,
            handleValueChange: this.handleValueChange,
            handleSubmit: this.handleSubmit,
        };

        const filterProps = {
            search,
            filterCategory,
            sort,
            handleSearch: this.handleSearch,
            handleCategoryFilter: this.handleCategoryFilter,
            handleSort: this.handleSort,
        };

        const tabsData = {
            todos: this.getFilteredTodos(),
            handleFavorite: this.handleFavorite,
            deleteTodo: this.deleteTodo,
            editTodo: this.editTodo,
        };

        return (
            <Container>
                <FormComponent {...formProps} />
                <FilterComponent {...filterProps} />
                <TabsComponent {...tabsData} />
            </Container>
        );
    }
}

export default HomePage;