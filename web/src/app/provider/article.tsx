import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/article';
import ViewModel from '../view-model/article';

@inject()
export default class Article extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}