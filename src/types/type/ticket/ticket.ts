import { ISeat } from '../seat/seat';
import { ITicketCatalog } from '../ticket-catalog/ticket-catalog';
import { ITrip } from '../trip/trip';

export interface ITicket {
  _id: string;
  ticket_catalog_id: ITicketCatalog;
  seat_id: ISeat;
  trip_id: ITrip;
  price: number;
  createAt?: string;
  updateAt?: string;
}

export interface Ticket {
  _id: string;
  ticket_catalog_id: {
    _id: string;
    name: string;
  };
  seat_id: {
    _id: string;
    name: string;
    price: number;
    status: string;
  };
  trip_id: {
    _id: string;
    departure_point: {
      _id: string;
      name: string;
    };
    destination_point: {
      _id: string;
      name: string;
    };
    price: number;
    departure_date: Date;
    departure_time: string;
    return_date: Date;
    return_time: string;
  };
  price: number;
  createAt?: string;
  updateAt?: string;
}
export interface SearchFormData {
  ticket_catalog_name: string;
  seat_name: string;
  departure_point_name: string; //Điểm Khởi Hành
  destination_point_name: string; // Điểm Đến
  departure_date: Date;
  return_date: Date;
}
