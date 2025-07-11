import React, {Component} from "react";
import {ControllerProps, ControllerState} from "../types/article";
import {observer} from "mobx-react";
import {ArticleView} from "../view/article";
import {ArticleModel} from "../model/article";

@observer
export default class ArticleController extends Component<
    ControllerProps,
    ControllerState
> {


    model: ArticleModel = new ArticleModel();

    state: ControllerState = {
        data: []
    };


    constructor(props: ControllerProps) {
        super(props);
    }


    render() {
        return <ArticleView
            data={this.state.data}/>;
    }
}