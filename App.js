import React, {useState} from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {Calculator} from 'react-native-calculator'
import {StatusBar} from 'expo-status-bar'

const App = () => {

  const [preview, setPreview] = useState('0')
  const [previewTerbilang, setPreviewTerbilang] = useState('')

  const kata = [
    '',
    'Satu',
    'Dua',
    'Tiga',
    'Empat',
    'Lima',
    'Enam',
    'Tujuh',
    'Delapan',
    'Sembilan',
  ]

  const generateTerbilang = (bil) => {
    let hasil = ''
    let panjangBil = bil.replace(/\./g, '').length;     //pemisah dihilangkan dan dihitung panjang bilanganny
    if (panjangBil <= 9) {      
      let bilArray = bil.split('.')  //String bilangan diubah menjadi array 
      for (let i = 0; i < bilArray.length; i++) {
          let item = bilArray[i]
          let subHasil = ''
          let bilSubArray = item.split('')
          console.log(bilSubArray)

          if (bilSubArray.length === 1) {
            subHasil = kata[parseInt(bilSubArray[0])]
            console.log(1, subHasil)
          }
          if (bilSubArray.length === 2) {
            subHasil = kata[parseInt(bilSubArray[0])] + ' Puluh ' + kata[parseInt(bilSubArray[1])]
            console.log(2, subHasil)
          }
          if (bilSubArray.length === 3) {
            subHasil = kata[parseInt(bilSubArray[0])] + ' Ratus ' + 
              (kata[parseInt(bilSubArray[1])] === '0' ? '' : kata[parseInt(bilSubArray[1])] + ' Puluh ') + 
              (kata[parseInt(bilSubArray[2])] === '0' ? '' : kata[parseInt(bilSubArray[2])]) 
          }

          if (bilArray.length === 3) {
            if (i === 0) {
              hasil += subHasil + ' Juta ';      
            } else if (i === 1){
              hasil += subHasil + ' Ribu ';      
            }
          } else 
          if (bilArray.length === 2) {
            if (i === 0) {
              hasil += subHasil + ' Ribu ';      
            }
          } else hasil += subHasil
        }

    }

    console.log('hasil', hasil)

       
    return hasil
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <View style={styles.containerCalc}>
        <Text style={styles.text}>{preview}</Text>
        <Text style={styles.textTerbilang}>{previewTerbilang}</Text>
        <Calculator 
          style={styles.calculator}
          hideDisplay
          decimalSeparator=','
          thousandSeparator='.'
          onCalc={(value, text) => {
            setPreviewTerbilang(generateTerbilang(text))
          }}
          onTextChange={(text) => {
            setPreview(text)
          }}
        />
      </View>
     
    </View>
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCalc: {
    marginTop: 200,
    alignItems: 'flex-end',
  },
  text: {
    width: '100%',
    alignSelf: 'flex-end',
    fontSize: 24,
    padding: 10,
  },

  text: {
    width: '100%',
    alignSelf: 'flex-end',
    fontSize: 18,
    padding: 10,
  },
  calculator: {
    height: '80%',
    width: '100%',
  }
});
