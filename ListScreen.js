import React from 'react';
import VisitsList from './VisitsList';
import Load from './Load';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

export default class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visit: "",
      visits: [],
      texto: "Visita seleccionada: ",
      showCrm: false,
      showSaved: false,
    }
    this.visitClick = this.visitClick.bind(this);
    this.didReceiveData = this.didReceiveData.bind(this);
    this.loadFromCRM = this.loadFromCRM.bind(this);
    this.loadStored = this.loadStored.bind(this);
    this.deleteStored = this.deleteStored.bind(this);
    this._saveVisit = this._saveVisit.bind(this);
    this._deleteVisit = this._deleteVisit.bind(this);
  }

  didReceiveData(visits, source) {
    if (source === "crm") {
      this.setState({
        visit: "",
        visits: visits,
        texto: "Visita seleccionada: ",
        showCrm: true,
        showSaved: false,
      });
    } else if (source === "saved") {
      this.setState({
        visit: "",
        visits: visits,
        texto: "Visita seleccionada: ",
        showCrm: false,
        showSaved: true,
      });
    } else {
      this.setState({
        visit: "",
        visits: visits,
        texto: "Visita seleccionada: ",
        showCrm: false,
        showSaved: false,
      });
    }
  }

  loadFromCRM() {
    if (this.state.showCrm) {
      alert("Ya se están mostrando las visitas del crm");
      return;
    }
    let req = new XMLHttpRequest();
    var url = "https://dcrmt.herokuapp.com/api/visits/flattened?token=ea014460d8c1df1805b7";
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if (req.status === 200) {
          visitsReal = JSON.parse(req.response);
          this.didReceiveData(JSON.parse(req.response), "crm");
        } else {
          console.log("Error: "+req.status);
        }
      }
    }
    req.open('GET', url);
    req.send(null);
  }

  loadStored() {
    if (this.state.showSaved) {
      alert("Ya se están mostrando las visitas guardadas");
      return;
    }
    let visits = [];
    AsyncStorage.getAllKeys((err, keys) => {
      if (keys.length === 0) {
        alert("No hay visitas guardadas");
      } else {
        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            let valueAux = result.value;
            let value = store[i][1];
            if (value) {
              visits.push(JSON.parse(value));
            }
          });
        }).then(() => this.didReceiveData(visits, "saved"));
      }
    });
  }

  deleteStored() {
    AsyncStorage.getAllKeys((err, keys) => {
      if (keys.length === 0) {
        alert("No hay visitas guardadas");
      } else {
        AsyncStorage.multiRemove(keys, (err) => {
          if (err) {
            alert("Ha habido un error borrando las visitas");
          } else {
            alert("Visitas borradas");
          }
        }).then(() => this.didReceiveData(""));
      }
    });
  }

  async _saveVisit(visit) {
    let key = '@P7_2017_IWEB:visits/'+visit.id;
    let savingVisit = visit;
    try {
        let visit = await AsyncStorage.getItem(key);
        if (visit !== null) {
            alert("La visita ya estaba guardada");
            return;
        } else {
            try {
                await AsyncStorage.setItem(key, JSON.stringify(savingVisit)).then(() => alert("Visita guardada"));
            } catch(error) {
                alert("Ha habido un error al guardar la visita");
                console.log("Guardando: ", error);
            }
        }
    } catch (error) {
        alert("Ha habido un error obteniendo la visita");
        console.log("Sacando: ", error);
    }
  }

  async _deleteVisit(visit) {
    let key = '@P7_2017_IWEB:visits/'+visit.id;
    try {
        let visit = await AsyncStorage.getItem(key);
        if (visit === null) {
            alert("Esa visita no se había guardado");
        } else {
            try {
                await AsyncStorage.removeItem(key).then(() => {
                  alert("Visita eliminada")
                  if (this.state.showSaved) {
                    this.setState({
                      showSaved: false
                    });
                    this.loadStored();
                  }
                });
            } catch(error) {
                alert("Ha habido un error eliminando la visita");
                console.log("Eliminando: ", error);
            }
        }
    } catch(error) {
        alert("Ha habido un error obteniendo la visita");
        console.log("Sacando: ", error);
    }
  }

  visitClick(visita) {
    this.setState({
      visit: visita,
      visits: this.state.visits,
      texto: "Visita seleccionada: "+visita.id
    });
    this.props.navigation.navigate('Visit', { visit: visita, visits: this.state.visits });
  }

  render() {
    return (
      <View style={{width: "100%", height: "100%"}}>
        <View style={styles.styleVisitList}>
          <Load loadFromCRM={this.loadFromCRM} loadStored={this.loadStored} deleteStored={this.deleteStored}/>
          <VisitsList visits={this.state.visits} visitClick={this.visitClick} saveVisit={this._saveVisit} deleteVisit={this._deleteVisit}/>
        </View>
      </View>
    );
  }
  static navigationOptions = {
      title: 'Seleccione una visita'
  }
}

const styles = StyleSheet.create({
  styleVisitList: {
    flex: 1,
    flexDirection: "column",
    width: "94%",
    height: "90%",
    marginTop: 10,
    marginLeft: "3%",
    backgroundColor: "white"
  },
  styleVisitBig: {
    flex: 2,
    flexDirection: "column",
    alignItems: "flex-end",
    width: "59%",
    height: "82%",
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#D3D3D3",
    padding: 10
  }
});