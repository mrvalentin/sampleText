import React, { Component } from 'react';
import './App.css';
import {Carousel, Slide}  from './Carousel' ;
import * as Style  from './style/main';

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			// value: '',
			slideValue: '',
			slideCount: 0,
			slides: [],
	};
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setRestStates = this.setRestStates.bind(this);
	}
	
	fetchData(){
		const text = this.refs.inputField.value;
		var url = new URL("http://localhost:8080/getText"),
		params = {text: text}
		Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
		fetch(url)
		.then(results =>{
			if (!results.ok) { throw results }
			return results.json();
		}).then(data => {
			this.setState({
				slideValue: data.text,
			}, this.setRestStates);
		})
		.catch( err => {
			err.text().then( errorMessage => {
			  alert(errorMessage);
			})
		})
	}

	setRestStates(){
		const listOfSlides = this.state.slides;
		this.setState({
			slides: listOfSlides.concat(<Slide data={this.state.slideValue}/>), 
			slideCount: this.state.slideCount + 1
		});
	}
	
	handleSubmit(event) {
		this.fetchData();
		this.refs.inputField.value = "";
		event.preventDefault();
	}
	
  render() {
		const slides = this.state.slides;
		return (
		<div className="App">
						<form
						style={Style.Main.form}
						onSubmit={this.handleSubmit}>
							<input style={Style.Main.input} ref="inputField" type="text"  placeholder="Enter a text" />
							<input type="submit" value="Add New Slide" />
						</form>

						<Carousel data={slides} slideCount={this.state.slideCount}/>

		</div>
		);
	}
}

export default App;
