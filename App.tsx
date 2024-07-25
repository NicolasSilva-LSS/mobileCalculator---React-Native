/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";

const Button = ({
  w = 0, h = null, 
  txt = '', 
  backgroundColor = '#333333', 
  textColor='white',
  onPress=() => {},
}) => {
  const height = h ?? w;
  const width = w;
  
  return(
    <View style = {[style.buttonContainer, {width: width, height: height}]}>
      <TouchableOpacity 
          style = {[style.button, {backgroundColor:backgroundColor}]}
          onPress={()=>onPress(txt)}>
        <Text style = {[style.buttonText, {color: textColor}]}>{txt}</Text>
      </TouchableOpacity>
    </View>
  )
}

const App = () => {
  const {width} = useWindowDimensions();
  const buttonContaierWidth = (width / 4) - 5;
  const [firstValue, setFirstValue] = useState('');
  const [mathOperator, setMathOperator] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [clearLabel, setClearLabel] = useState('AC');

  const onKeyPress = key =>
  {
    switch (key) {
      case 'AC':
        setFirstValue('');
        setMathOperator('');
        setSecondValue('');
        break;
      case 'C':
        if(secondValue !== '')
        {
          setSecondValue('');
        }else
        {
          setFirstValue('');
        }

        setClearLabel('AC');
        break;
      case '+/-':
        if(firstValue !== '' || secondValue !== 0)
        {
          if(firstValue !== '' && secondValue === '')
          {
            setFirstValue(parseFloat((firstValue * -1)).toString());
          }else
          {
            setSecondValue(parseFloat((secondValue * -1)).toString());
          }
        }
        break;
      case '%':
        mathCalculator(firstValue, key, secondValue);
        break;
      case '/':
      case 'x':
      case '-':
      case '+':
        if(secondValue !== '')
        {
          mathCalculator(firstValue, mathOperator, secondValue)
        }else
        {
          setMathOperator(key);
        }
        break;
      case '=':
        mathCalculator(firstValue, mathOperator, secondValue);
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
      case ',':
        setClearLabel('C');
        if(mathOperator === '')
        {
          setFirstValue(e => `${e}${key}`);
        }else
        {
          setSecondValue(e => `${e}${key}`)
        }
        break;
    }
  }

  const getDisplayTxt = () =>
  {
    if(secondValue !== '') return secondValue;
    if(firstValue === '') return '0';
    
    return firstValue;
  }

  const mathCalculator = (a = '', o = '', b = '') => {
    let result = 0;

    a = a.replace(',','.');
    b = b.replace(',', '.');

    switch(o){
      case '%':
        result = parseFloat(a) / 100;
        break;
      case '/':
        result = parseFloat(a) / parseFloat(b);
        break;
      case 'x':
        result = parseFloat(a) * parseFloat(b);
        break;
      case  '-':
        result = parseFloat(a) - parseFloat(b);
        break;
      case '+':
        result = parseFloat(a) + parseFloat(b);
        break;
    }

    if(result % 1 !== 0)
    {
      const digitsValue = result.toString().split('.')[1];
      if(digitsValue.length > 6)
      {
        result = result.toFixed(6);
      }
    }

    result=result.toString().replace('.', ',');

    setFirstValue(result);
    setMathOperator('');
    setSecondValue('');
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={style.displayContainer}>
        <Text style={style.displayTxt}>{getDisplayTxt()}</Text>
      </View>
      <View style={style.buttonsContaier}>
        <View style={style.buttonsRow}>
          <Button
            w={buttonContaierWidth}
            txt={clearLabel}
            backgroundColor={'#A5A5A5'}
            textColor={'#000'}
            onPress={(key)=>onKeyPress(key)}
          />
          <Button
            w={buttonContaierWidth}
            txt={'+/-'}
            backgroundColor={'#A5A5A5'}
            textColor={'#000'}
            onPress={(key)=>onKeyPress(key)}
          />
          <Button
            w={buttonContaierWidth}
            txt={'%'}
            backgroundColor={'#A5A5A5'}
            textColor={'#000'}
            onPress={(key)=>onKeyPress(key)}
          />
          <Button
            w={buttonContaierWidth}
            txt={'/'}
            //backgroundColor={'#ff8c00'}
            backgroundColor={'#696969'}
            onPress={(key)=>onKeyPress(key)}
          />
        </View>
        <View style={style.buttonsRow}>
          <Button
            w={buttonContaierWidth}
            txt={'7'}
            onPress={(key)=>onKeyPress(key)}
          />
          <Button
            w={buttonContaierWidth}
            txt={'8'}
            onPress={(key)=>onKeyPress(key)}
          />
          <Button
            w={buttonContaierWidth}
            txt={'9'}
            onPress={(key)=>onKeyPress(key)}
          />
          <Button
            w={buttonContaierWidth}
            txt={'x'}
            //backgroundColor={'#ff8c00'}
            backgroundColor={'#696969'}
            onPress={(key)=>onKeyPress(key)}
          />
        </View>
        <View style={style.buttonsRow}>
          <Button
            w={buttonContaierWidth}
            txt={'4'}
            onPress={(key)=>onKeyPress(key)}
          />
          <Button
            w={buttonContaierWidth}
            txt={'5'}
            onPress={(key)=>onKeyPress(key)}
          />
          <Button
            w={buttonContaierWidth}
            txt={'6'}
            onPress={(key)=>onKeyPress(key)}
          />
          <Button
            w={buttonContaierWidth}
            txt={'-'}
            //backgroundColor={'#ff8c00'}
            backgroundColor={'#696969'}
            onPress={(key)=>onKeyPress(key)}
          />
        </View>
        <View style={style.buttonsRow}>
          <Button
            w={buttonContaierWidth}
            txt={'1'}
            onPress={(key)=>onKeyPress(key)}
          />
          <Button
            w={buttonContaierWidth}
            txt={'2'}
            onPress={(key)=>onKeyPress(key)}
          />
          <Button
            w={buttonContaierWidth}
            txt={'3'}
            onPress={(key)=>onKeyPress(key)}
          />
          <Button
            w={buttonContaierWidth}
            txt={'+'}
            //backgroundColor={'#ff8c00'}
            backgroundColor={'#696969'}
            onPress={(key)=>onKeyPress(key)}
          />
        </View>
        <View style={style.buttonsRow}>
          <Button
            w={(width/2)-10}
            h={buttonContaierWidth}
            txt={'0'}
            onPress={(key)=>onKeyPress(key)}
          />
          <Button
            w={buttonContaierWidth}
            txt={','}
            onPress={(key)=>onKeyPress(key)}
          />
          <Button
            w={buttonContaierWidth}
            txt={'='}
            //backgroundColor={'#ff8c00'}
            backgroundColor={'#696969'}
            onPress={(key)=>onKeyPress(key)}
          />
        </View>
      </View>
      <StatusBar translucent backgroundColor="transparent"/>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container:{
    //backgroundColor: '#000',
    flex: 1
  },
  displayContainer:{
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
  },
  displayTxt:{
    fontSize: 60,
    //color: 'white',
    color: '#000'
  },
  buttonsContaier:{
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 30,
  },
  buttonsRow:{
    flexDirection: 'row'
  },
  buttonContainer:{
    padding: 5
  },
  button:{
    width: '100%',
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText:{
    color: 'white',
    fontSize: 20,
  },
})

export default App;