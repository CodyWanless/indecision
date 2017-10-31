import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';
import React from 'react';

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };

    handleDeleteOption = option => {
        this.setState(prevState => ({
            options: prevState.options.filter(o => o !== option)
        }));
    };

    handleDeleteOptions = () => {
        this.setState(() => {
            return {
                options: []
            };
        });
    };

    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];

        this.setState(() => ({
            selectedOption: option
        }));
    };

    handleAddOption = option => {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState(prevState => {
            return {
                options: prevState.options.concat(option)
            }
        });
    };

    handleClearSelectedOption = () => {
        this.setState(() => ({
            selectedOption: undefined
        }));
    };

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (e) {
            // Do nothing at all
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            localStorage.setItem('options', JSON.stringify(this.state.options));
        }
    }

    render() {
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header subTitle={subtitle} />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick} />
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption} />
                        <AddOption
                            handleAddOption={this.handleAddOption} />
                    </div>
                </div>
                <OptionModal selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption} />
            </div>
        );
    }
}