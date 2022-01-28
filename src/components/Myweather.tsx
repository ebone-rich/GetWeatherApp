import React from "react";

interface Locate {
    latitude: number | null;
    longitude: number | null;
}

interface Weather {
    temp: number | null;
    description: string;
    icon: string;
}

export class MyWeather extends React.Component< {},
{location: Locate; weather: Weather}
> {
    constructor(props: {}) {
    super(props);
    this.state = {
      location: {
        latitude: null,
        longitude: null,
      },
      weather: {
        temp: null,
        description: "",
        icon: "",
      },
    };
  }

  shouldComponentUpdate(nextProps: {}, nextState: {}) {
    return this.state !== nextState;
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
      console.log(this.state.location.latitude);
      console.log(this.state.location.longitude);
    });
  }

  getWeather() {
    if (this.state.location.latitude && this.state.location.longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.location.latitude}&lon=${this.state.location.longitude}&appid=4a9339867b7a0458ce8675757cd8ba3e&units=imperial`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.setState({
            weather: {
              temp: +((data.main.temp).toFixed( 
                
              )),
              description: data.weather[0].description,
              icon: data.weather[0].icon,
            },
          });
        });
    } else {
      return "No location found. Please grab your location before trying to get the weather.";
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.getLocation()}>Find Your Location</button>
        <>
          {this.state.location.latitude && this.state.location.longitude ? (
            <button onClick={() => this.getWeather()}>See the Weather</button>
          ) : null}
        </>

        <p>Latitude: {this.state.location.latitude}</p>
        <p>Longitude: {this.state.location.longitude}</p>
        <img
          src={`http://openweathermap.org/img/wn/${this.state.weather.icon}.png`}
          alt={this.state.weather.description}
        />
        <p className="temp">Temperature: {this.state.weather.temp} °</p>
        <p className="description">
          Description: {this.state.weather.description}
        </p>
      </div>
    );
  }
}