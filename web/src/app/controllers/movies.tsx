import React, {Component} from "react";
import {ControllerProps, ControllerState} from "../types/movies";
import {observer} from "mobx-react";
import {MoviesView} from "../view/movies";
import {MoviesModel} from "../model/movies";

@observer
export default class MoviesController extends Component<
    ControllerProps,
    ControllerState
> {


    model: MoviesModel = new MoviesModel();


    render() {
        return <MoviesView/>;
    }
}