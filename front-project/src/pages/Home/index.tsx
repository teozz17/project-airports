import React from 'react';
import HomeImage from '../../assets/images/airportHome.jpg';
import HomeImage2 from '../../assets/images/airportHome2.jpg';
import HomeImage3 from '../../assets/images/airportHome3.jpg';
import Carousel from 'react-bootstrap/Carousel';
import './index.scss';

const Home: React.FC = () => {
    return (
      <>
        <section className='text-white bg-dark'>
                <span>Your journey, your airports, your story... </span>
        </section>
        <Carousel>
        <Carousel.Item interval={5000}>
        <img
            className="d-block w-100"
            src={HomeImage}
            alt="First slide"
          />
          <Carousel.Caption>
            <p>The journey begins with a single flight.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src={HomeImage2}
            alt="First slide"
          />
          <Carousel.Caption>
            <p>Chart your skies, one runway at a time.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src={HomeImage3}
            alt="First slide"
          />
          <Carousel.Caption>
            <p>Every airport holds a story; what's yours ?.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </>
    );
};

export default Home;