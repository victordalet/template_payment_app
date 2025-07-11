
import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/movies';
import ViewModel from '../view-model/movies';

@inject()
export default class Movies extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}