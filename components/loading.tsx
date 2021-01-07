import React, {Fragment} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import style from './loading.module.css';

type LoadingParams = {
    showLoading : boolean,
}

export const Loading = ({showLoading}: LoadingParams): JSX.Element => {
    return showLoading ? (
        <div className={style.loadingDiv}>
            <CircularProgress />
        </div>
    ) : (
        <Fragment/>
    )
};
