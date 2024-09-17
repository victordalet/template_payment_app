import ViewModel from '../view-model/movies';

export interface ViewProps {
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {}


export interface registerResponse {
    token: string;
}