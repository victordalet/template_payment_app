import React from "react";
import {ViewProps} from "../types/article";
import {MapComponents} from "../../component/map";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export class ArticleView extends React.Component <ViewProps> {
    render() {

        const {data} = this.props;


        return (
            <div className={"map"}>
            </div>
        );
    }
}