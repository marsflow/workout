import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';


const Timer = () => {

    const [count, setCount] = React.useState(120 * 1000)

    React.useEffect(() => {

      
    }, [])

    const counting = () => {
        
    }

    return (
        <Text>1</Text>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Timer;