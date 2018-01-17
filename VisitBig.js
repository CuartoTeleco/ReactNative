import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, ScrollView, Vibration, Button } from 'react-native';

export default class VisitBig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visit: "",
            visits: this.props.navigation.state.params.visits,
            texto: "Visita seleccionada: "
        }
    }

    render() {
        if (this.props.navigation.state.params.visit.favourite) {
            imagen = <Image style={{height: 60, width: 60}} source={require("./assets/images/fav.png")}></Image>;
        } else {
            imagen = <Image style={{height: 60, width: 60}} source={require("./assets/images/notFav.png")}></Image>;
        }
        if (this.props.navigation.state.params.visit === "") {
            return (
                <View>
                    <Text> Seleccione una visita. </Text>
                </View>
            );
        } else {
            let targets = this.props.navigation.state.params.visit.Targets.map((target) => {
                return (
                    <View key={"id"+target.id}>
                            <View><Text><Text style={{fontWeight: 'bold'}}> {target.TargetType.name} </Text>{target.success === true ? "Realizado" : "No realizado"} </Text></View>
                            <View><Text><Text style={{fontWeight: 'bold'}}> Comentarios: </Text>{target.notes === "" ? "No especificado" : target.notes} </Text></View>
                            <View><Text><Text style={{fontWeight: 'bold'}}> Compañía: </Text>{target.Company.name === "" ? "No especificado" : target.Company.name} </Text></View>
                            <View><Text><Text style={{fontWeight: 'bold'}}> Web: </Text>{((target.Company.web1 === null) || (target.Company.web1 === "")) ? "No especificado" : target.Company.web1} </Text></View>
                            <Text></Text>
                    </View>
                )
            })
            if (targets.length === 0) {
                targets = <Text> No especificado </Text>
            }
            return (
                <ScrollView>
                    <View style={styles.styleGeneral}>
                        <Text></Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 2, alignSelf: 'flex-start' }}>
                                <View><Text><Text style={{fontWeight: 'bold'}}> Planificada para el: </Text>{this.props.navigation.state.params.visit.plannedFor.slice(0,10)} </Text></View>
                                <View><Text><Text style={{fontWeight: 'bold'}}> Realizada el: </Text>{((this.props.navigation.state.params.visit.fulfilledAt === null) || (this.props.navigation.state.params.visit.fulfilledAt === "")) ? "Pendiente" : this.props.navigation.state.params.visit.fulfilledAt.slice(0,10)} </Text></View>
                                <Text></Text>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'flex-end', justifyContent: 'flex-end', marginRight: -30, marginTop: -10 }}>
                                {imagen}
                            </View>
                        </View>
                        <View>
                            <Text style={styles.styleTitle}> Cliente </Text>
                            <View><Text><Text style={{fontWeight: 'bold'}}> Nombre: </Text>{this.props.navigation.state.params.visit.Customer.name} </Text></View>
                            <View><Text><Text style={{fontWeight: 'bold'}}> Teléfono: </Text> {this.props.navigation.state.params.visit.Customer.phone1} </Text></View>
                            <View><Text><Text style={{fontWeight: 'bold'}}> Dirección: </Text> {this.props.navigation.state.params.visit.Customer.address1} </Text></View>
                            <View><Text><Text style={{fontWeight: 'bold'}}> Ciudad: </Text> {this.props.navigation.state.params.visit.Customer.city} </Text></View>
                        <Text></Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <View style={{flex: 2}}>
                                <Text style={styles.styleTitle}> Vendedor </Text>                    
                                <View>
                                    <View><Text><Text style={{fontWeight: 'bold'}}> Nombre: </Text>{this.props.navigation.state.params.visit.Salesman.fullname} </Text></View>
                                    <View><Text><Text style={{fontWeight: 'bold'}}> Teléfono: </Text>{((this.props.navigation.state.params.visit.Salesman.phone1 === null) || (this.props.navigation.state.params.visit.Salesman.phone1 === "")) ? "No especificado" :  this.props.navigation.state.params.visit.Salesman.phone1} </Text></View>
                                    <View><Text><Text style={{fontWeight: 'bold'}}> Email: </Text>{((this.props.navigation.state.params.visit.Salesman.email1 === null) || (this.props.navigation.state.params.visit.Salesman.email1 === "")) ? "No especificado" : this.props.navigation.state.params.visit.Salesman.email1}</Text></View>
                                </View>
                                <Text></Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Image style = {{height: 80, width: 80}} source={{uri: this.props.navigation.state.params.visit.Salesman.Photo.url}}></Image>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.styleTitle}> Objetivos </Text>
                            <View>
                                {targets}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            );
        }
    }
    static navigationOptions = {
        title: 'Detalles de la visita'
    }
}

const styles = StyleSheet.create({
    styleColIzda: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: 'flex-start',
        width: "30%"
    },
    styleColDcha: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: 'flex-end',
        width: "60%"
    },
    styleGeneral: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: 'flex-start',
        width: "94%",
        height: "100%",
        marginLeft: "3%",
        marginTop: 10,
        backgroundColor: "white"
    },
    styleTitle: {
        fontWeight: "bold",
        fontSize: 15
    }
  });