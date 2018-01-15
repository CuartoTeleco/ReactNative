import React from 'react';
import VisitSmall from './VisitSmall';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';

export default class VisitsList extends React.Component {
    constructor(props) {
        super(props);
        this.visitListClick = this.visitListClick.bind(this);
        this._saveVisit = this._saveVisit.bind(this);
        this._deleteVisit = this._deleteVisit.bind(this);
    }
    visitListClick(visita) {
        this.props.visitClick(visita);
    }
    async _saveVisit(visit) {
        this.props.saveVisit(visit)
    }
    async _deleteVisit(visit) {
        this.props.deleteVisit(visit);
    }
    render() {
        return (
            <ScrollView>
                <FlatList data={this.props.visits} renderItem={({item}) => <VisitSmall style={styles.styleVisitsList} visit={item} visitListClick={this.visitListClick} saveVisit={this._saveVisit} deleteVisit={this._deleteVisit}/>} keyExtractor={item => item.id}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    styleVisitsList: {
        width: "90%"
    }
});