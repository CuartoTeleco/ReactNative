import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class VisitsList extends React.Component {
    constructor(props) {
        super(props);
        this.loadFromCRM = this.loadFromCRM.bind(this);
        this.loadStored = this.loadStored.bind(this);
        this.deleteStored = this.deleteStored.bind(this);
    }
    loadFromCRM() {
        this.props.loadFromCRM();
    }
    loadStored() {
        this.props.loadStored();
    }
    deleteStored() {
        this.props.deleteStored()
    }
    render() {
        return (
            <View>
                <Button style={{flex: 1}} title={'Cargar visitas de CRM'} onPress={this.loadFromCRM}></Button>
                <Button style={{flex: 1}} title={'Cargar visitas guardadas'} onPress={this.loadStored}></Button>
                <Button style={{flex: 1}} title={'Eliminar todas las visitas guardadas'} onPress={this.deleteStored}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    styleVisitsList: {
        width: "90%"
    }
});