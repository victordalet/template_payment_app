// @ts-ignore
import ReactDOM from 'react-dom/client';
import {Provider} from 'mobx-react';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import './sass/index.scss';


import {Article, Movies} from './app/provider';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <React.StrictMode>
        <Provider>
            <BrowserRouter>
                <Routes>
                    <Route path={"*"} element={<Article/>}></Route>
                    <Route path={"/map"} element={<Movies/>}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);