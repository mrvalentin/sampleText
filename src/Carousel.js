import React from 'react';
import Arrow from 'react-arrow';
import * as Style  from './style/main';

export class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leftSlideindex: 0,
            // arrowActive: false,
        }

        this.handleLeftClick = this.handleLeftClick.bind(this);
		this.handleRightClick = this.handleRightClick.bind(this);
    }

    handleLeftClick(){
        const slideCount = this.props.slideCount;
        if(slideCount>3){
            const leftSlideindex = this.state.leftSlideindex;
            if(leftSlideindex!=0){
                this.setState({leftSlideindex:leftSlideindex - 1});
            }
        }
    }

    handleRightClick(){
        const slideCount = this.props.slideCount;
        if(slideCount>3){
            const leftSlideindex = this.state.leftSlideindex;
            if(leftSlideindex + 3 < slideCount){
                console.log("Hit where shouldn't");
                this.setState({leftSlideindex:leftSlideindex + 1});
            }
        }
    }

    render() {
        
        var currentSlides = [];

        var index = this.state.leftSlideindex;

        const slideCount = this.props.slideCount;

        for(var i=index; i < slideCount; i++ ){

            currentSlides.push(this.props.data[i]);
            
            if(i == index + 2){
                break;
            }

        }

        var isRightArrowEnabled = (slideCount <= 3) || (index + 3 >= slideCount);
        var isLeftArrowEnabled = (slideCount <= 3) || (index === 0);

        const arrowLeft = (
            <Arrow
                style={{
                    marginTop: '1.7%',
                    float: 'left',
                    cursor: isLeftArrowEnabled ? 'not-allowed' : 'pointer',
                }}
                direction="left"
                shaftWidth={10}
                shaftLength={10}
                headWidth={30}
                headLength={15}
                fill= "black"
                stroke= "black"
                strokeWidth={2}
                onClick={this.handleLeftClick}
            />
          )

          const arrowRight = (
            <Arrow
                style={{
                    marginTop: '1.7%',
                    float: 'right',
                    cursor: isRightArrowEnabled ? 'not-allowed' : 'pointer',
                }}
                direction="right"
                shaftWidth={10}
                shaftLength={10}
                headWidth={30}
                headLength={15}
                fill="black"
                stroke="black"
                strokeWidth={2}
                onClick={this.handleRightClick}
            />
          )

        return (
          <div style={Style.Main.carouselStyle}>
            {arrowLeft}
            {currentSlides}
            {arrowRight}
          </div>
        );
      }
}
export class Slide extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

       return (
          <div style={Style.Main.slideStyle} >
            <p>{this.props.data}</p>
          </div>
       );
    }
 }
