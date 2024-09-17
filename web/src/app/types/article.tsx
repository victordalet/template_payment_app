import ViewModel from '../view-model/article';

export interface ViewProps {
    data: string[];
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    data: string[];
}
