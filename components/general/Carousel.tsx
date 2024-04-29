import React, { Component } from 'react';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';

interface CarouselProps {
    visibleItems: number;
    children: React.JSX.Element[] | null;
    currentIndex: number;
    updateCurrentIndex: (index: number) => void;
}

interface CarouselState {
    currentIndex: number;
}

class Carousel extends Component<CarouselProps, CarouselState> {
    constructor(props: CarouselProps) {
        super(props);
    }

    nextSlide = () => {
        const { currentIndex, visibleItems, children } = this.props;
        const totalItems = children ? children.length:0;
        if (currentIndex + visibleItems <= totalItems) {
            // Only update currentIndex when going to the next slide
            this.props.updateCurrentIndex(currentIndex + visibleItems);
        }
    };

    prevSlide = () => {
        const { currentIndex, visibleItems } = this.props;
        if (currentIndex !== 0) {
            // Only update currentIndex when going to the previous slide
            this.props.updateCurrentIndex(Math.max(currentIndex - visibleItems, 0));
        }
    };

    render() {
        const { currentIndex, children, visibleItems } = this.props;
        const totalItems = children ? children.length:0;

        return (
            <div className="relative">
                <div className="overflow-hidden">
                    <div className="flex flex-col px-10">
                        { children && children.map((child, index) => {
                            const isVisible = index >= currentIndex && index < currentIndex + visibleItems;
                            return (
                                <div
                                    key={index}
                                    className={`w-full flex-shrink-0 hover:bg-gray-700 ${
                                        isVisible ? 'flex' : 'hidden'
                                    }`}
                                >
                                    {child}
                                </div>
                            );
                        })}
                    </div>
                </div>
                {totalItems > visibleItems && (
                    <div className="absolute inset-y-0 left-0 flex items-center">
                        <button
                            onClick={this.prevSlide}
                            className="bg-transparent hover:bg-gray-700 h-full text-gray-700 hover:text-white font-bold py-2 px-4 mr-2"
                        >
                            <RiArrowDropLeftLine className="text-2xl" />
                        </button>
                    </div>
                )}
                {totalItems > visibleItems && (
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <button
                            onClick={this.nextSlide}
                            className="bg-transparent hover:bg-gray-700 h-full text-gray-700 hover:text-white font-bold py-2 px-4 ml-2"
                        >
                            <RiArrowDropRightLine className="text-2xl" />
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default Carousel;