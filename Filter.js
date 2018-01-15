import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const listItemInsideStyle = {
    display: 'block'
};

const listItemStyle = {
    float: 'left',
    marginBottom: '10px',
    padding: '11px'
}
const listItemStyle2 = {
    float: 'left',
    marginBottom: '10px',
    padding: '0px'
}

const listItemStyle3 = {
    float: 'left',
    marginBottom: '10px',
    padding: '11px 11px 11px 0px',
}

export default class Filter extends React.Component {
    constructor (props) {
        super(props);
        this.searchFilter = this.searchFilter.bind(this);
        this.favouriteClicked = this.favouriteClicked.bind(this);
        this.dateAfterChanged = this.dateAfterChanged.bind(this);
        this.dateBeforeChanged = this.dateBeforeChanged.bind(this);
    }

    favouriteClicked() {
        console.log(this.props);
        this.props.favouriteClicked();
    }

    searchFilter() {
        var checkDateAfter = document.getElementById('checkDateAfter');
        var dateAfter = document.getElementById('dateAfter').value.replace('/','-').replace('/','-');
        var checkDateBefore = document.getElementById('checkDateBefore');
        var dateBefore = document.getElementById('dateBefore').value.replace('/','-').replace('/','-');
        console.log(Number(dateAfter.split('-')[0]) < Number(dateBefore.split('_')[0]));
        console.log("Antes de: ",dateBefore,"Después de: ", dateAfter);
        if (checkDateAfter.checked && checkDateBefore.checked){
            if (Number(dateAfter.split('-')[0]) < Number(dateBefore.split('_')[0])) {
                alert('Las fechas introducidas son incorrectas');
                return;
            } else if (Number(dateAfter.split('-')[1]) < Number(dateBefore.split('_')[1])) {
                alert('Las fechas introducidas son incorrectas');
                return;
            } else if (Number(dateAfter.split('-')[2]) < Number(dateBefore.split('_')[2])) {
                alert('Las fechas introducidas son incorrectas');
                return;
            }
        }
        var checkFavourite = document.getElementById('checkFavourite');
        var fav = document.getElementById('fav').alt === 'fav' ? '1' : '0';
        var params = '';
        params += checkDateAfter.checked ? '&dateafter='+dateAfter : '';
        params += checkDateBefore.checked ? '&datebefore='+dateBefore : ''; 
        params += checkFavourite.checked ? '&favourites='+fav : '';
        console.log(params);
        this.props.search(params);
    }
    dateAfterChanged(date) {
        console.log(date);
        this.props.dateAfterChanged(date);
    }

    dateBeforeChanged(date) {
        this.props.dateBeforeChanged(date);
    }

    render() {
        return (
            <div>
                <ul style={{listStyle: 'none', listStyleType: 'none', paddingLeft: '10px'}}>
                    <li style={listItemStyle}><b style={listItemInsideStyle}>Desde:</b></li>
                    <li style={listItemStyle3}><DatePicker dateFormat='YYYY/MM/DD' id="dateAfter" style={listItemInsideStyle} selected={this.props.dateAfter} onChange={this.dateAfterChanged}/> </li>
                    <li style={listItemStyle3}> <input type='checkbox' id='checkDateAfter'/> </li>
                    <li style={listItemStyle}><b style={listItemInsideStyle}>Hasta:</b></li>
                    <li style={listItemStyle3}><DatePicker dateFormat='YYYY/MM/DD' id="dateBefore" style={listItemInsideStyle} selected={this.props.dateBefore} onChange={this.dateBeforeChanged}/> </li>
                    <li style={listItemStyle3}> <input type='checkbox' id='checkDateBefore'/> </li>
                    <li style={listItemStyle}><b style={listItemInsideStyle}>Favorito:</b></li>
                    <li style={listItemStyle2}><button style={{display: "inline", border: "none", float: "right", paddingTop: '0px'}} onClick={this.favouriteClicked}>
                        <img id='fav' style={{height: "40px", width: "40px"}} src={this.props.favourite ? "./../assets/images/fav.png" : "./../assets/images/notFav.png"} alt={this.props.favourite ? 'fav' : 'notFav'}></img>
                    </button></li>
                    <li style={listItemStyle3}> <input type='checkbox' id='checkFavourite'/> </li>
                    <li style={listItemStyle}> <button onClick={this.searchFilter}> Buscar </button> </li>
                </ul>
            </div>
        );
    }
}