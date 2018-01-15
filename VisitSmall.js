import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';

export default class VisitSmall extends React.Component {
    constructor(props) {
        super(props);
        this.visitSmallClick = this.visitSmallClick.bind(this);
        this._saveVisit = this._saveVisit.bind(this);
        this._deleteVisit = this._deleteVisit.bind(this);
    }
    visitSmallClick() {
        this.props.visitListClick(this.props.visit);
    }
    async _saveVisit() {
        this.props.saveVisit(this.props.visit);
    }
    async _deleteVisit() {
        this.props.deleteVisit(this.props.visit);
    }
    render() {
        if (this.props.visit.favourite) {
            imagen = <Image style={{height: 100, width: 100}} source={require("./assets/images/fav.png")}></Image>;
        } else {
            imagen = <Image style={{height: 100, width: 100}} source={require("./assets/images/notFav.png")}></Image>;
        }
        return(
            <View style={styles.visitSmallStyle} >
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 2}}>
                        <Text></Text>
                        <View><Text style={{fontSize: 12}}><Text style={{fontWeight: 'bold'}}>  Visita número: </Text>{this.props.visit.id}</Text></View>
                        <View><Text style={{fontSize: 12}}><Text style={{fontWeight: 'bold'}}>  Planificada para el: </Text>{this.props.visit.plannedFor.slice(0,10)}</Text></View>
                        <View><Text style={{fontSize: 12}}><Text style={{fontWeight: 'bold'}}>  Realizada el: </Text>{this.props.visit.fulfilledAt === null ? "Pendiente" : this.props.visit.fulfilledAt.slice(0,10)}</Text></View>            
                        <View><Text style={{fontSize: 12}}><Text style={{fontWeight: 'bold'}}>  Cliente: </Text>{((this.props.visit.Customer.name === null) || (this.props.visit.Customer.name === "")) ? "No especificado" : this.props.visit.Customer.name}</Text></View>
                        <View><Text style={{fontSize: 12}}><Text style={{fontWeight: 'bold'}}>  Vendedor: </Text>{this.props.visit.Salesman.fullname}</Text></View>
                    </View>
                    <View style={{flex: 1}}>
                        {imagen}
                    </View>
                </View>
                <View>    
                    <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                        <Button style={{flex: 1}} title={'Más info'} onPress={this.visitSmallClick}></Button>
                        <Button style={{flex: 1}} title={'Guardar'} onPress={this._saveVisit}></Button>
                        <Button style={{flex: 1}} title={'Eliminar'} onPress={this._deleteVisit}></Button>
                    </View>
                    <Text></Text>
                </View>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    visitSmallStyle: {
        flexDirection: 'column',
        width: "100%",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#D3D3D3"
    },
    imageStyle: {
        flex: 3,
        flexDirection: 'row'
    }
});