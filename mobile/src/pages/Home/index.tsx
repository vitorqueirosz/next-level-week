import React, {useState, useEffect, ChangeEvent} from 'react';
import { Feather as Icon }  from '@expo/vector-icons'
import { View, ImageBackground, Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect  from 'react-native-picker-select'
import axios from 'axios';

interface IBGEUFResponse {
  sigla: string;
};

interface IBGECityResponse {
  nome: string;
}

const Home = () => {
    const [uf, setUf] = useState<string[]>([]);
    const [city, setCity] = useState<string[]>([]);
    const navigation = useNavigation();

    const [selectedUf, setSelectedUf] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    function handleNavigateToPoints(){
        navigation.navigate('Points', {
            uf: selectedUf,
            city: selectedCity,
        });
    };



    useEffect(() => {
      axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
          const ufInitials = response.data.map(uf => uf.sigla);

          setUf(ufInitials);
      });
  }, []);

  useEffect(() => {
    if(selectedUf === '') {
        return;
    };

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {

    const cityName = response.data.map(city => city.nome);

        setCity(cityName);
    });
}, [selectedUf]);

    return (
        <KeyboardAvoidingView  style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground  source={require('../../assets/home-background.png')} 
                imageStyle={{ width: 274, height: 368}}
                style={styles.container}
            >

                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')}/>
                    <View >

                   
                        <Text style={styles.title}>Seu marketplace de coleta de residuos.</Text>
                        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coletas de forma eficiente.</Text>
                    </View>
                </View>

            <View style={styles.footer}> 

            <RNPickerSelect 
                    
                    onValueChange={(value) => setSelectedUf(value)}
            items={
                uf.map(item => ({
                  label: item, value: item}))
            }
           >
              <TextInput 
                style={styles.input} 
                maxLength={2} autoCorrect={false} 
                autoCapitalize="characters" 
                value={selectedUf}
                // onChangeText={handleSelectUf}
                placeholder="Digite a UF"
                />
          </RNPickerSelect>
          
        <View>
        <RNPickerSelect
         onValueChange={(value) => setSelectedCity(value)}
          items={
            city.map(item => ({
              label: item, value: item,
            }))
          }
        >
          <TextInput 
          placeholder="Digite a cidade" 
          style={styles.input} 
          value={selectedCity}
          // onChangeText={handleSelectCity}
          />

          
        </RNPickerSelect>
        </View>
          
        
        {/* <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={
            city.map(item => ({
              label: item, value: `${item}`
            }))
        }
        >
          
        </RNPickerSelect> */}


                <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                    <View style={styles.buttonIcon}>
                        <Text> 
                            <Icon name="arrow-right" color="#FFF" size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>Entrar</Text>
                </RectButton>
            </View>

            </ImageBackground>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
     
      
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 30,
    },
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      marginBottom: 15,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},

    input: {
      height: 55,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 0,
      marginBottom: 0,
      
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home;