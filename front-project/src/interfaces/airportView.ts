import { AirportProps } from "./airport";

export interface AirportViewProps {
    airportView: {
      airport: AirportProps;
      view: boolean;
    };
  }