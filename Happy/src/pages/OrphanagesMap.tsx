import React, {useState} from 'react'
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps'
import mapMarker from '../images/map.png'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {Feather} from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import {RectButton} from 'react-native-gesture-handler'
import api from '../services/api';

interface Orphanage{
  id: number,
  name: string,
  latitude: number, 
  longitude: number, 
}


export default function OrphanagesMap(){
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(()=> {
      api.get('/orphanages').then(response => {
          setOrphanages(response.data)
      })
    })

    const navigation = useNavigation();

    function handleNavigateToOrphanageDetails(id: number){
        navigation.navigate('OrphanageDetails', {id})
    }

    function handleNavigateToCreateOrphanage(){
      navigation.navigate('SelectMapPosition')
  }

    return(
        <View style={styles.container}>
      <MapView 
        provider = {PROVIDER_GOOGLE}
        style={styles.map}
         initialRegion={{
           latitude: -22.1108192,
           longitude: -51.4150745,
           latitudeDelta: 0.025,
           longitudeDelta: 0.025, 
         }}
        > 

        {
          orphanages.map(orphanages => {
            return (
              <Marker
              key={orphanages.id}
                icon={mapMarker}
                calloutAnchor ={{
                  x: 2.7, 
                  y: 0.8,
                }}
                coordinate={{
                  latitude:  orphanages.latitude,
                  longitude: orphanages.longitude
                }}
              >
                <Callout tooltip={true} onPress={() => handleNavigateToOrphanageDetails(orphanages.id)}> 
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{orphanages.name}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          })
        }

      </MapView>
          
      <View style={styles.footer}>
        <Text style={styles.footerText}> {orphanages.length} Orfanatos encontrados</Text>
        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}> 
          <Feather name="plus" size={20} color="#FFF"/>
        </RectButton>
        
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height:Dimensions.get('window').height
    },
    
    calloutContainer:{
      width:160, 
      height: 46, 
      paddingHorizontal: 16, 
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 16, 
      justifyContent: 'center', 
    },
  
    calloutText:{
      color: '#0089a5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold'
  
    },
  
    //Footer
  
    footer:{
      position: 'absolute',
      left: 24, 
      right: 24, 
      bottom: 32, 
  
      backgroundColor: '#FFF',
      borderRadius: 20, 
      height: 56, 
      paddingLeft: 24, 
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', 
      marginBottom: 10, 
  
      elevation: 10,
    },
  
    footerText: {
      color: '#8fa7b3', 
      fontFamily: 'Nunito_700Bold'
    },
  
    createOrphanageButton: {
      height: 56,
      width:56, 
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
    }
  
  });
  